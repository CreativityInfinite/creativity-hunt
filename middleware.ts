import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['zh-CN', 'zh-TW', 'en'];
const DEFAULT_LOCALE = 'zh-CN';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const lang = url.searchParams.get('lang');
  const res = NextResponse.next();

  // 如果 URL 上存在 ?lang 并且有效，则写入 NEXT_LOCALE cookie
  if (lang && SUPPORTED_LOCALES.includes(lang)) {
    res.cookies.set('NEXT_LOCALE', lang, { path: '/' });
    return res;
  }

  // 若没有 cookie 或不合法，设置默认语言
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
  if (!cookieLocale || !SUPPORTED_LOCALES.includes(cookieLocale)) {
    res.cookies.set('NEXT_LOCALE', DEFAULT_LOCALE, { path: '/' });
    return res;
  }

  return res;
}

export const config = {
  // 匹配所有应用路径（不再依赖路径前缀），可按需调整排除静态资源
  matcher: ['/:path*']
};
