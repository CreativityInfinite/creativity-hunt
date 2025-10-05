import AppleSvg from '@/src/assets/icons/apple.svg';
import GoogleSvg from '@/src/assets/icons/google.svg';

import { cn } from '@/lib/utils';
import { defaultLogo } from '@/src/constant/base.constant';
import { Logo, LogoImage, LogoText } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getMessages } from '@/src/i18n/index';

export function LoginForm({ className, locale, ...props }: React.ComponentPropsWithoutRef<'div'> & { locale: string }) {
  const messages = getMessages(locale);
  const t = messages.auth?.signin;
  const brand = messages.brand || defaultLogo.title;

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">{t?.title?.replace('{brand}', brand) || `Welcome to ${brand}`}</h1>
            <div className="text-center text-sm">
              {t?.noAccount || "Don't have an account?"}
              <a href="#" className="underline underline-offset-4 ml-2">
                {t?.signup || 'Sign up'}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">{t?.emailLabel || 'Email'}</Label>
              <Input id="email" type="email" placeholder={t?.emailPlaceholder || 'm@example.com'} required />
            </div>
            <Button type="submit" className="w-full">
              {t?.login || 'Login'}
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">{t?.or || 'Or'}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" className="w-full">
              <AppleSvg className="size-4" />
              {t?.apple || 'Continue with Apple'}
            </Button>
            <Button variant="outline" className="w-full">
              <GoogleSvg className="size-4" />
              {t?.google || 'Continue with Google'}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        {t?.terms || 'By clicking continue, you agree to our'} <a href="#">{t?.tos || 'Terms of Service'}</a> {t?.and || 'and'} <a href="#">{t?.privacy || 'Privacy Policy'}</a>.
      </div>
    </div>
  );
}
