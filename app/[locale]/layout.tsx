import type { Metadata } from 'next';
import '@/app/globals.css';
import { ThemeProvider } from '@component/ThemeProvider';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import ClientSessionProvider from '@component/ClientSessionProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Creativity Hunt',
  description: 'AI 工具导航'
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ClientSessionProvider>
          <ThemeProvider>
            <main>{children}</main>
          </ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
