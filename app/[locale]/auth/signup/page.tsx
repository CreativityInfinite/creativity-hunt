'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@component/ui/card';
import { Label } from '@component/ui/label';
import { Input } from '@component/ui/input';
import { Button } from '@component/ui/button';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Logo, LogoImage, LogoText } from '@component/Logo';
import { defaultLogo } from '@constant/base.constant';
import { LangSwitcher } from '@component/LangSwitcher';
import { ThemeToggle } from '@component/ThemeToggle';
import { useParams } from 'next/navigation';

export default function SignUpPage() {
  const { locale } = useParams() as { locale: string };
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (data?.Code === 0) {
        setMessage('Account created, redirecting to sign in...');
        // 简单延迟后跳转到登录页
        // setTimeout(() => {
        //   window.location.href = `/${locale}/auth/signin`;
        // }, 800);
      } else {
        setMessage(data?.message || 'Sign up failed');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-background p-6 md:p-10">
      {/* 全局背景，与登录页一致 */}
      <GradientBackground />

      {/* 顶部栏：左侧 Logo + 右侧语言切换/主题切换 */}
      <div className="absolute inset-x-0 top-0 z-20 px-4 md:px-8 py-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Logo url={defaultLogo.url}>
              <LogoImage size={32} src={defaultLogo.src} alt={defaultLogo.alt} title={defaultLogo.title} className="h-10" />
              <LogoText className="text-md">{defaultLogo.title}</LogoText>
            </Logo>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LangSwitcher locale={locale} />
          </div>
        </div>
      </div>

      {/* 居中注册卡片 */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="w-full max-w-md border-border/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Create account</CardTitle>
            <CardDescription>Join Creativity Hunt and explore top AI tools.</CardDescription>
          </CardHeader>

          <CardContent>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create account'}
              </Button>
            </form>
          </CardContent>

          {message && (
            <div className="px-6 pb-2 text-sm">
              <span className="text-muted-foreground">{message}</span>
            </div>
          )}

          <CardFooter className="text-sm text-muted-foreground">
            <span className="mr-1">Already have an account?</span>
            <Link href={`/${locale}/auth/signin`} className="text-primary hover:underline">
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
