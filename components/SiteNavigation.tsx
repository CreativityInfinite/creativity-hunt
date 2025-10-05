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
import { defaultLogo } from '@/src/constant/base.constant';
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

  const navSections: NavSection[] = [
    {
      trigger: 'Explore',
      minW: 'min-w-[640px] md:min-w-[720px]',
      groups: [
        {
          title: 'Categories',
          items: [
            { href: `${base}/categories/chat-tools`, title: 'Chat Tools', description: 'Conversational AI and assistants', icon: 'message-circle' },
            { href: `${base}/categories/image-generation`, title: 'Image Generation', description: 'Create images with AI', icon: 'image' },
            { href: `${base}/categories/writing`, title: 'Writing', description: 'AI writing and copy', icon: 'book' },
            { href: `${base}/categories/code-assistant`, title: 'Code Assistant', description: 'Coding support and automation', icon: 'tool' },
            { href: `${base}/categories/audio-voice`, title: 'Audio & Voice', description: 'Speech and media tools', icon: 'megaphone' },
            { href: `${base}/categories/data-insights`, title: 'Data Insights', description: 'Analytics and visualization', icon: 'bar-chart' },
            { href: `${base}/categories/automation`, title: 'Automation', description: 'Automate repetitive tasks', icon: 'settings' }
          ]
        },
        {
          title: 'Trending',
          items: [
            { href: `${base}/trending/now`, title: 'Trending Now', description: 'Most popular this week', icon: 'trending-up' },
            { href: `${base}/trending/top-rated`, title: 'Top Rated', description: 'Highest user ratings', icon: 'star' },
            { href: `${base}/trending/rising`, title: 'Rising Stars', description: 'Fast-growing tools', icon: 'rocket' },
            { href: `${base}/trending/most-searched`, title: 'Most Searched', description: 'Top search queries', icon: 'layout-dashboard' }
          ]
        },
        {
          title: 'Featured',
          items: [
            { href: `${base}/featured/editors-picks`, title: "Editor's Picks", description: 'Curated recommendations', icon: 'book-open' },
            { href: `${base}/featured/new-launches`, title: 'New Launches', description: 'Latest releases', icon: 'calendar' },
            { href: `${base}/featured/community-favorites`, title: 'Community Favorites', description: 'Loved by our users', icon: 'user' },
            { href: `${base}/featured/weekly-highlights`, title: 'Weekly Highlights', description: 'Highlights of the week', icon: 'bell' }
          ]
        }
      ]
    },
    {
      trigger: 'Blog',
      minW: 'min-w-[640px] md:min-w-[720px]',
      groups: [
        {
          title: 'Articles',
          items: [
            { href: `${base}/blog/articles`, title: 'All Articles', description: 'In-depth posts and insights', icon: 'book' },
            { href: `${base}/blog/guides`, title: 'Guides', description: 'Step-by-step guides for beginners', icon: 'book-open' }
          ]
        },
        {
          title: 'Tutorials',
          items: [
            { href: `${base}/blog/tutorials`, title: 'Tutorials', description: 'Practical tutorials and walkthroughs', icon: 'book-open' },
            { href: `${base}/blog/case-studies`, title: 'Case Studies', description: 'Real-world examples and results', icon: 'bar-chart' }
          ]
        },
        {
          title: 'Updates',
          items: [
            { href: `${base}/blog/updates`, title: 'Product Updates', description: 'Latest changes and improvements', icon: 'bell' },
            { href: `${base}/blog/changelog`, title: 'Changelog', description: 'Release notes and version history', icon: 'layout-dashboard' }
          ]
        }
      ]
    },
    {
      trigger: 'News',
      minW: 'min-w-[640px] md:min-w-[720px]',
      groups: [
        {
          title: 'AI Trends',
          items: [
            { href: `${base}/news/trends`, title: 'Market Trends', description: 'Industry analyses and reports', icon: 'bar-chart' },
            { href: `${base}/news/opinion`, title: 'Opinions', description: 'Editorials and commentary', icon: 'book-open' }
          ]
        },
        {
          title: 'Releases',
          items: [
            { href: `${base}/news/releases`, title: 'New Tools', description: 'Announcements and launches', icon: 'rocket' },
            { href: `${base}/news/changelog`, title: 'Changelog', description: 'Release notes and updates', icon: 'layout-dashboard' }
          ]
        },
        {
          title: 'Events',
          items: [
            { href: `${base}/news/events`, title: 'Conferences', description: 'Talks, meetups and conferences', icon: 'calendar' },
            { href: `${base}/news/webinars`, title: 'Webinars', description: 'Online sessions and demos', icon: 'calendar' }
          ]
        }
      ]
    },
    {
      trigger: 'Discussion',
      minW: 'min-w-[640px] md:min-w-[720px]',
      groups: [
        {
          title: 'General Discussion',
          items: [
            { href: `${base}/discussion/general`, title: 'General Topics', description: 'Community-wide conversations', icon: 'message-circle' },
            { href: `${base}/discussion/feedback`, title: 'Feedback', description: 'Suggestions and feature requests', icon: 'megaphone' }
          ]
        },
        {
          title: 'Tool Recommendations',
          items: [
            { href: `${base}/discussion/tools`, title: 'Recommend Tools', description: 'Share handy tools you use', icon: 'tool' },
            { href: `${base}/discussion/showcase`, title: 'Showcase', description: 'Present your creations', icon: 'image' }
          ]
        },
        {
          title: 'Tutorials',
          items: [
            { href: `${base}/discussion/tutorials`, title: 'Tutorials', description: 'Tips and how-tos', icon: 'book' },
            { href: `${base}/discussion/resources`, title: 'Resources', description: 'Useful learning resources', icon: 'book-open' }
          ]
        }
      ]
    },
    {
      trigger: 'Account',
      minW: 'min-w-[640px] md:min-w-[720px]',
      groups: [
        {
          title: 'Dashboard',
          items: [
            { href: `${base}/account`, title: 'Overview', description: 'Personal control panel', icon: 'layout-dashboard' },
            { href: `${base}/account/activity`, title: 'Activity', description: 'Recent actions and logs', icon: 'calendar' }
          ]
        },
        {
          title: 'Profile',
          items: [
            { href: `${base}/profile`, title: 'Profile', description: 'Personal information settings', icon: 'user' },
            { href: `${base}/profile/security`, title: 'Security', description: 'Password & 2FA settings', icon: 'settings' }
          ]
        },
        {
          title: 'Settings',
          items: [
            { href: `${base}/settings`, title: 'Preferences', description: 'Account preferences and options', icon: 'settings' },
            { href: `${base}/settings/notifications`, title: 'Notifications', description: 'Notification settings', icon: 'bell' }
          ]
        }
      ]
    },
    {
      trigger: 'About',
      minW: 'min-w-[640px] md:min-w-[720px]',
      href: `${base}/about`
    }
  ];

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
        <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
        <div className="flex-1">
          <div className="font-medium text-sm group-hover:text-primary transition-colors duration-200">{title}</div>
          <div className="text-xs text-muted-foreground mt-0.5 group-hover:text-foreground/70 transition-colors duration-200">{description}</div>
        </div>
      </div>
    </Link>
  );
}
