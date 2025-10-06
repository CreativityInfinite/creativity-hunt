import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: { params: { prompt: 'select_account consent' } }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      try {
        const email = (profile as any)?.email ?? user?.email;
        // 仅在有邮箱时落库（Google 一般都会返回邮箱）
        if (!email) return true;

        await prisma.user.upsert({
          where: { email },
          update: {
            name: (profile as any)?.name ?? user?.name ?? undefined,
            provider: account?.provider ?? undefined,
            providerAccountId: (account as any)?.providerAccountId ?? undefined,
            avatarUrl: (profile as any)?.picture ?? undefined,
            lastLoginAt: new Date()
          },
          create: {
            email,
            name: (profile as any)?.name ?? user?.name ?? undefined,
            provider: account?.provider ?? undefined,
            providerAccountId: (account as any)?.providerAccountId ?? undefined,
            avatarUrl: (profile as any)?.picture ?? undefined,
            lastLoginAt: new Date()
          }
        });

        return true;
      } catch (err) {
        // 发生错误时允许登录，但你也可以选择返回 false 阻止登录
        console.error('[NextAuth signIn] upsert user failed:', err);
        return true;
      }
    },
    async jwt({ token, account, profile }) {
      // 登录时把 Google 的基本信息合并进 token，方便本地调试
      if (account && profile) {
        token.provider = account.provider;
        token.name = profile.name as string | undefined;
        token.email = profile.email as string | undefined;
        token.picture = (profile as any).picture as string | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      // 将 token 中的信息暴露到 session，前端更易读取
      if (session.user) {
        session.user.name = (token as any).name ?? session.user.name;
        session.user.email = (token as any).email ?? session.user.email;
        (session.user as any).picture = (token as any).picture;
        (session as any).provider = (token as any).provider;
      }
      return session;
    }
  }
  // 你可以按需定制 pages.signIn 指向自定义登录页，这里留默认即可
};
