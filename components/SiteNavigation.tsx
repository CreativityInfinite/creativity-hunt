'use client';

import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from './ui/navigation-menu';
import { ThemeToggle } from './ThemeToggle';
import { LangSwitcher } from './LangSwitcher';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Folder, TrendingUp, Star, FileText, BookOpen, Bell, BarChart, Rocket, Calendar, MessageCircle, Wrench, Book, Image, Megaphone, LayoutDashboard, User, Settings } from 'lucide-react';
import { Logo, LogoImage, LogoText } from './Logo';
import { defaultLogo, getNavSections } from '@constant/base.constant';
import UserMenu from './UserMenu';

const iconMap = {
  folder: Folder,
  'trending-up': TrendingUp,
  star: Star,
  'file-text': FileText,
  'book-open': BookOpen,
  bell: Bell,
  'bar-chart': BarChart,
  rocket: Rocket,
  calendar: Calendar,
  'message-circle': MessageCircle,
  tool: Wrench,
  book: Book,
  image: Image,
  megaphone: Megaphone,
  'layout-dashboard': LayoutDashboard,
  user: User,
  settings: Settings
};

type IconKey = keyof typeof iconMap;
interface MenuItem {
  href: string;
  title: string;
  description: string;
  icon: IconKey;
}
interface MenuGroup {
  title: string;
  items?: MenuItem[];
}
interface NavSection {
  trigger: string;
  minW: string;
  href?: string;
  groups?: MenuGroup[];
}

export function SiteNavigation({ locale }: { locale: string }) {
  const base = `/${locale}`;
  // TODO: 使用真实的鉴权状态替换此占位
  const isAuthenticated = false;

  // 从 i18n 读取导航文案（trigger、分组标题、items 文案）
  const translatedNav = getNavSections(locale);

  // 为每个子项提供图标矩阵（按组序填充，长度不足时回退为 'star'）
  // 静态导航映射：非文案字段在此维护（href、icon、minW）
  type StaticMenuItem = { href: string; icon: IconKey };
  type StaticMenuGroup = { title: string; items?: StaticMenuItem[] };
  type StaticNavSection = { trigger: string; minW: string; href?: string; groups?: StaticMenuGroup[] };

  function getStaticNavMap(base: string): StaticNavSection[] {
    const minW = 'min-w-[640px] md:min-w-[720px]';
    return [
      {
        trigger: 'Explore',
        minW,
        groups: [
          {
            title: 'Categories',
            items: [
              { href: `${base}/categories/chat-tools`, icon: 'message-circle' },
              { href: `${base}/categories/image-generation`, icon: 'image' },
              { href: `${base}/categories/writing`, icon: 'book' },
              { href: `${base}/categories/code-assistant`, icon: 'tool' },
              { href: `${base}/categories/audio-voice`, icon: 'megaphone' },
              { href: `${base}/categories/data-insights`, icon: 'bar-chart' },
              { href: `${base}/categories/automation`, icon: 'settings' }
            ]
          },
          {
            title: 'Trending',
            items: [
              { href: `${base}/trending/now`, icon: 'trending-up' },
              { href: `${base}/trending/top-rated`, icon: 'star' },
              { href: `${base}/trending/rising`, icon: 'rocket' },
              { href: `${base}/trending/most-searched`, icon: 'layout-dashboard' }
            ]
          },
          {
            title: 'Featured',
            items: [
              { href: `${base}/featured/editors-picks`, icon: 'book-open' },
              { href: `${base}/featured/new-launches`, icon: 'calendar' },
              { href: `${base}/featured/community-favorites`, icon: 'user' },
              { href: `${base}/featured/weekly-highlights`, icon: 'bell' }
            ]
          }
        ]
      },
      {
        trigger: 'Blog',
        minW,
        groups: [
          {
            title: 'Articles',
            items: [
              { href: `${base}/blog/articles`, icon: 'book' },
              { href: `${base}/blog/guides`, icon: 'book-open' }
            ]
          },
          {
            title: 'Tutorials',
            items: [
              { href: `${base}/blog/tutorials`, icon: 'book-open' },
              { href: `${base}/blog/case-studies`, icon: 'bar-chart' }
            ]
          },
          {
            title: 'Updates',
            items: [
              { href: `${base}/blog/updates`, icon: 'bell' },
              { href: `${base}/blog/changelog`, icon: 'layout-dashboard' }
            ]
          }
        ]
      },
      {
        trigger: 'News',
        minW,
        groups: [
          {
            title: 'AI Trends',
            items: [
              { href: `${base}/news/trends`, icon: 'bar-chart' },
              { href: `${base}/news/opinion`, icon: 'book-open' }
            ]
          },
          {
            title: 'Releases',
            items: [
              { href: `${base}/news/releases`, icon: 'rocket' },
              { href: `${base}/news/changelog`, icon: 'layout-dashboard' }
            ]
          },
          {
            title: 'Events',
            items: [
              { href: `${base}/news/events`, icon: 'calendar' },
              { href: `${base}/news/webinars`, icon: 'calendar' }
            ]
          }
        ]
      },
      {
        trigger: 'Discussion',
        minW,
        groups: [
          {
            title: 'General Discussion',
            items: [
              { href: `${base}/discussion/general`, icon: 'message-circle' },
              { href: `${base}/discussion/feedback`, icon: 'megaphone' }
            ]
          },
          {
            title: 'Tool Recommendations',
            items: [
              { href: `${base}/discussion/tools`, icon: 'tool' },
              { href: `${base}/discussion/showcase`, icon: 'image' }
            ]
          },
          {
            title: 'Tutorials',
            items: [
              { href: `${base}/discussion/tutorials`, icon: 'book' },
              { href: `${base}/discussion/resources`, icon: 'book-open' }
            ]
          }
        ]
      },
      {
        trigger: 'Account',
        minW,
        groups: [
          {
            title: 'Dashboard',
            items: [
              { href: `${base}/account`, icon: 'layout-dashboard' },
              { href: `${base}/account/activity`, icon: 'calendar' }
            ]
          },
          {
            title: 'Profile',
            items: [
              { href: `${base}/profile`, icon: 'user' },
              { href: `${base}/profile/security`, icon: 'settings' }
            ]
          },
          {
            title: 'Settings',
            items: [
              { href: `${base}/settings`, icon: 'settings' },
              { href: `${base}/settings/notifications`, icon: 'bell' }
            ]
          }
        ]
      },
      {
        trigger: 'About',
        minW,
        href: `${base}/about`
      }
    ];
  }

  // 合并：使用静态映射补齐 href、icon、minW，i18n 提供 trigger/title/description
  const staticNav = getStaticNavMap(base);
  const navSections: NavSection[] = translatedNav.map((section, si) => {
    const s = staticNav[si];
    const groups = (section.groups || []).map((g, gi) => {
      const sg = s?.groups?.[gi];
      const items = (g.items || []).map((it, ii) => {
        const siItem = sg?.items?.[ii];
        return {
          href: siItem?.href || base,
          title: it.title,
          description: it.description,
          icon: siItem?.icon || 'star'
        };
      });
      return { title: g.title, items };
    });

    return {
      trigger: section.trigger,
      minW: s?.minW || section.minW || 'min-w-[640px] md:min-w-[720px]',
      href: s?.href || section.href,
      groups
    };
  });

  return (
    <div className="top-0">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* 左侧导航页 */}
        <div className="flex items-center gap-6">
          <Link href={base} className="font-semibold tracking-tight">
            <span className="flex items-center gap-2">
              <Logo url={defaultLogo.url}>
                <LogoImage size={32} src={defaultLogo.src} alt={defaultLogo.alt} title={defaultLogo.title} className="h-10" />
                <LogoText className="text-md">{defaultLogo.title}</LogoText>
              </Logo>
            </span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {navSections.map((section) => (
                <NavigationMenuItem key={section.trigger}>
                  {section.groups && section.groups.length ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent">{section.trigger}</NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={`p-6 ${section.minW} bg-[radial-gradient(120%_120%_at_50%_0%,rgba(34,211,238,0.08),transparent_65%)] backdrop-blur rounded-2xl border border-border/40 shadow-lg`}
                      >
                        <div className="grid gap-4 md:grid-cols-3">
                          {section.groups
                            .filter((group) => group.items && group.items.length)
                            .map((group) => (
                              <div key={group.title}>
                                <h4 className="mb-3 text-sm font-semibold text-muted-foreground">{group.title}</h4>
                                <div className="grid gap-2">
                                  {group.items!.map((item) => (
                                    <EnhancedMenuLink key={item.title} href={item.href} title={item.title} description={item.description} icon={item.icon} />
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link href={section.href || base} className="bg-transparent px-3 py-2 rounded-md">
                        {section.trigger}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* 右侧登录、操作区域 */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LangSwitcher locale={locale} />
          <UserMenu base={base} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  );
}

function EnhancedMenuLink({ href, title, description, icon }: { href: string; title: string; description: string; icon: keyof typeof iconMap }) {
  const IconComponent = iconMap[icon];

  return (
    <Link href={href} className="group block p-1.5 rounded-lg hover:bg-accent/50 transition-all duration-200">
      <div className="flex items-center gap-3.5">
        <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        <div className="flex-1">
          <div className="font-medium text-sm group-hover:text-primary transition-colors duration-200">{title}</div>
          <div className="text-xs text-muted-foreground mt-0.5 group-hover:text-foreground/70 transition-colors duration-200">{description}</div>
        </div>
      </div>
    </Link>
  );
}
