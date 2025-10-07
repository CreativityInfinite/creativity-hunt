'use client';

import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from './ui/navigation-menu';
import { ThemeToggle } from './ThemeToggle';
import { LangSwitcher } from './LangSwitcher';

import { Logo, LogoImage, LogoText } from './Logo';
import { defaultLogo, getNavSections } from '@constant/base.constant';
import { iconMap, getIconComponent, desktopStaticNavigation, type IconKey } from '@constant/navigation.constant';
import UserMenu from './UserMenu';
import { MobileNav } from './MobileNav';

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
  const base = '';

  // 从 i18n 读取导航文案（trigger、分组标题、items 文案）
  const translatedNav = getNavSections(locale);

  // 合并：使用静态映射补齐 href、icon、minW，i18n 提供 trigger/title/description
  const staticNav = desktopStaticNavigation;
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
      <div className="container mx-auto flex h-12 sm:h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 左侧导航页 */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* 移动端汉堡菜单 */}
          <MobileNav locale={locale} />

          <Link href={'/'} className="font-semibold tracking-tight">
            <span className="flex items-center gap-2">
              <Logo url={defaultLogo.url}>
                <LogoImage size={32} src={defaultLogo.src} alt={defaultLogo.alt} title={defaultLogo.title} className="h-8 sm:h-10" />
                <LogoText className="text-sm sm:text-md hidden xs:block">{defaultLogo.title}</LogoText>
              </Logo>
            </span>
          </Link>

          <NavigationMenu className="hidden md:block">
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
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <LangSwitcher locale={locale} />
          <UserMenu locale={locale} />
        </div>
      </div>
    </div>
  );
}

function EnhancedMenuLink({ href, title, description, icon }: { href: string; title: string; description: string; icon: keyof typeof iconMap }) {
  const IconComponent = getIconComponent(icon);

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
