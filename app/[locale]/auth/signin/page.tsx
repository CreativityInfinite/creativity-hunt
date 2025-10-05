import { LoginForm } from '@/components/LoginForm';
import { GradientBackground } from '@/components/shared/GradientBackground';
import { Logo, LogoImage, LogoText } from '@/components/Logo';
import { defaultLogo } from '@/src/constant/base.constant';
import { LangSwitcher } from '@/components/LangSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-background p-6 md:p-10">
      {/* 全局背景，与首页一致 */}
      <GradientBackground />

      {/* 顶部栏：左侧 Logo + 右侧语言切换 */}
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

      {/* 居中登录卡片 */}
      <div className="relative z-10 w-full max-w-sm">
        <LoginForm locale={locale} />
      </div>
    </div>
  );
}
