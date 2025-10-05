import en from '../i18n/locales/en.json';
import zhCN from '../i18n/locales/zh-CN.json';
import zhTW from '../i18n/locales/zh-TW.json';

const defaultLogo = { src: '/logo.svg', alt: 'Creativity Hunt', title: 'Creativity Hunt', url: '/' };

type LocaleKey = 'en' | 'zh-CN' | 'zh-TW';
const localeMap: Record<LocaleKey, any> = { en, 'zh-CN': zhCN, 'zh-TW': zhTW };

function getFooterContent(locale: string = 'zh-CN') {
  const messages = localeMap[locale as LocaleKey] || zhCN;
  const year = new Date().getFullYear();
  const tagline: string = messages.footerTagline || '';
  const copyrightTemplate: string = messages.footerCopyright || '';
  const copyright = (copyrightTemplate || '').replace(/YEAR/g, String(year));
  const menuItems: Array<{ title: string; links: Array<{ text: string; url: string }> }> = messages.footerMenuGroups || [];
  const bottomLinks: Array<{ text: string; url: string }> = messages.footerBottomLinks || [];

  return { tagline, copyright, logo: defaultLogo, menuItems, bottomLinks };
}

type IconKey =
  | 'layout-dashboard'
  | 'calendar'
  | 'user'
  | 'settings'
  | 'bell'
  | 'message-circle'
  | 'image'
  | 'book'
  | 'tool'
  | 'megaphone'
  | 'bar-chart'
  | 'trending-up'
  | 'star'
  | 'rocket'
  | 'book-open'
  | 'folder'
  | 'file-text';

type NavItem = { href?: string; title: string; description: string; icon?: IconKey };
type NavGroup = { title: string; items?: NavItem[] };
type NavSection = { trigger: string; minW?: string; groups?: NavGroup[]; href?: string };

function getNavSections(locale: string = 'zh-CN'): NavSection[] {
  const messages = localeMap[locale as LocaleKey] || zhCN;
  const translated = Array.isArray(messages.navSections) ? messages.navSections : [];

  return translated.map((section: any) => ({
    trigger: section.trigger,
    minW: section.minW,
    groups: (section.groups || []).map((g: any) => ({
      title: g.title,
      items: (g.items || []).map((it: any) => ({
        title: it.title,
        description: it.description
      }))
    }))
  }));
}

export { defaultLogo, getFooterContent, getNavSections };
