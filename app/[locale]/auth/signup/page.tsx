'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GradientBackground } from '@/components/shared/GradientBackground';
import { Logo, LogoImage, LogoText } from '@/components/Logo';
import { defaultLogo } from '@/src/constant/base.constant';
import { LangSwitcher } from '@/components/LangSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useParams } from 'next/navigation';

export default function SignUpPage() {
  const { locale } = useParams() as { locale: string };
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
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
