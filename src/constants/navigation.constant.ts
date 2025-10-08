import {
  Folder,
  TrendingUp,
  Star,
  FileText,
  BookOpen,
  Bell,
  BarChart,
  Rocket,
  Calendar,
  MessageCircle,
  Wrench,
  Book,
  Image,
  Megaphone,
  LayoutDashboard,
  User,
  Settings,
  LineChart,
  PieChart,
  Trophy,
  Search,
  Bookmark,
  CalendarDays,
  History,
  Activity,
  Zap,
  Clock,
  Newspaper,
  MessageSquare,
  Camera,
  GraduationCap,
  Shield,
  BellRing,
  Images,
  SquarePen,
  Code,
  Mic,
  MessageCircleMore,
  ThumbsUp,
  Gauge,
  Home
} from 'lucide-react';

// 统一的图标映射
export const iconMap = {
  home: Home,
  folder: Folder,
  'trending-up': TrendingUp,
  star: Star,
  'file-text': FileText,
  'book-open': BookOpen,
  bell: Bell,
  'bell-ring': BellRing,
  'bar-chart': BarChart,
  rocket: Rocket,
  calendar: Calendar,
  'calendar-days': CalendarDays,
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  tool: Wrench,
  book: Book,
  image: Image,
  images: Image,
  megaphone: Megaphone,
  'layout-dashboard': LayoutDashboard,
  user: User,
  settings: Settings,
  'line-chart': LineChart,
  'pie-chart': PieChart,
  trophy: Trophy,
  search: Search,
  bookmark: Bookmark,
  history: History,
  activity: Activity,
  zap: Zap,
  clock: Clock,
  newspaper: Newspaper,
  camera: Camera,
  'graduation-cap': GraduationCap,
  shield: Shield,
  'pen-line': SquarePen,
  code: Code,
  mic: Mic,
  bot: MessageCircleMore,
  'thumbs-up': ThumbsUp,
  gauge: Gauge
};

// 图标类型定义
export type IconKey = keyof typeof iconMap;

// 导航项类型定义
export interface NavigationItem {
  title: string;
  href: string;
  icon: IconKey;
}

export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

export interface NavigationSection {
  trigger: string;
  href?: string;
  icon: IconKey;
  groups?: NavigationGroup[];
}

// 桌面端静态导航配置（用于与 i18n 合并）
export const desktopStaticNavigation = [
  {
    trigger: 'Explore',
    minW: 'min-w-[640px] md:min-w-[720px]',
    groups: [
      {
        title: 'Categories',
        items: [
          { href: `/categories/chat-tools`, icon: 'bot' as IconKey },
          { href: `/categories/image-generation`, icon: 'images' as IconKey },
          { href: `/categories/writing`, icon: 'pen-line' as IconKey },
          { href: `/categories/code-assistant`, icon: 'code' as IconKey },
          { href: `/categories/audio-voice`, icon: 'mic' as IconKey },
          { href: `/categories/data-insights`, icon: 'line-chart' as IconKey },
          { href: `/categories/automation`, icon: 'zap' as IconKey }
        ]
      },
      {
        title: 'Trending',
        items: [
          { href: `/trending/now`, icon: 'trending-up' as IconKey },
          { href: `/trending/top-rated`, icon: 'trophy' as IconKey },
          { href: `/trending/rising`, icon: 'rocket' as IconKey },
          { href: `/trending/most-searched`, icon: 'search' as IconKey }
        ]
      },
      {
        title: 'Featured',
        items: [
          { href: `/featured/editors-picks`, icon: 'bookmark' as IconKey },
          { href: `/featured/new-launches`, icon: 'calendar-days' as IconKey },
          { href: `/featured/community-favorites`, icon: 'thumbs-up' as IconKey },
          { href: `/featured/weekly-highlights`, icon: 'bell' as IconKey }
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
          { href: `/blog/articles`, icon: 'file-text' as IconKey },
          { href: `/blog/guides`, icon: 'book-open' as IconKey }
        ]
      },
      {
        title: 'Tutorials',
        items: [
          { href: `/blog/tutorials`, icon: 'book' as IconKey },
          { href: `/blog/case-studies`, icon: 'pie-chart' as IconKey }
        ]
      },
      {
        title: 'Updates',
        items: [
          { href: `/blog/updates`, icon: 'history' as IconKey },
          { href: `/blog/changelog`, icon: 'activity' as IconKey }
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
          { href: `/news/trends`, icon: 'bar-chart' as IconKey },
          { href: `/news/opinion`, icon: 'newspaper' as IconKey }
        ]
      },
      {
        title: 'Releases',
        items: [
          { href: `/news/releases`, icon: 'zap' as IconKey },
          { href: `/news/changelog`, icon: 'calendar' as IconKey }
        ]
      },
      {
        title: 'Events',
        items: [
          { href: `/news/events`, icon: 'clock' as IconKey },
          { href: `/news/webinars`, icon: 'megaphone' as IconKey }
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
          { href: `/discussion/general`, icon: 'message-circle' as IconKey },
          { href: `/discussion/feedback`, icon: 'message-square' as IconKey }
        ]
      },
      {
        title: 'Tool Recommendations',
        items: [
          { href: `/discussion/tools`, icon: 'tool' as IconKey },
          { href: `/discussion/showcase`, icon: 'camera' as IconKey }
        ]
      },
      {
        title: 'Tutorials',
        items: [
          { href: `/discussion/tutorials`, icon: 'graduation-cap' as IconKey },
          { href: `/discussion/resources`, icon: 'folder' as IconKey }
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
          { href: `/account`, icon: 'layout-dashboard' as IconKey },
          { href: `/account/activity`, icon: 'gauge' as IconKey }
        ]
      },
      {
        title: 'Profile',
        items: [
          { href: `/profile`, icon: 'user' as IconKey },
          { href: `/profile/security`, icon: 'shield' as IconKey }
        ]
      },
      {
        title: 'Settings',
        items: [
          { href: `/settings`, icon: 'settings' as IconKey },
          { href: `/settings/notifications`, icon: 'bell-ring' as IconKey }
        ]
      }
    ]
  },
  {
    trigger: 'About',
    minW: 'min-w-[640px] md:min-w-[720px]',
    href: `/about`
  }
];

// 移动端静态导航配置
export const mobileStaticNavigation: NavigationSection[] = [
  {
    trigger: 'Explore',
    icon: 'search',
    groups: [
      {
        title: 'Categories',
        items: [
          { title: 'Chat Tools', href: `/categories/chat-tools`, icon: 'bot' },
          { title: 'Image Generation', href: `/categories/image-generation`, icon: 'images' },
          { title: 'Writing', href: `/categories/writing`, icon: 'pen-line' },
          { title: 'Code Assistant', href: `/categories/code-assistant`, icon: 'code' },
          { title: 'Audio Voice', href: `/categories/audio-voice`, icon: 'mic' },
          { title: 'Data Insights', href: `/categories/data-insights`, icon: 'line-chart' },
          { title: 'Automation', href: `/categories/automation`, icon: 'zap' }
        ]
      },
      {
        title: 'Trending',
        items: [
          { title: 'Trending Now', href: `/trending/now`, icon: 'trending-up' },
          { title: 'Top Rated', href: `/trending/top-rated`, icon: 'trophy' },
          { title: 'Rising', href: `/trending/rising`, icon: 'rocket' },
          { title: 'Most Searched', href: `/trending/most-searched`, icon: 'search' }
        ]
      },
      {
        title: 'Featured',
        items: [
          { title: 'Editors Picks', href: `/featured/editors-picks`, icon: 'bookmark' },
          { title: 'New Launches', href: `/featured/new-launches`, icon: 'calendar-days' },
          { title: 'Community Favorites', href: `/featured/community-favorites`, icon: 'thumbs-up' },
          { title: 'Weekly Highlights', href: `/featured/weekly-highlights`, icon: 'bell' }
        ]
      }
    ]
  },
  {
    trigger: 'Blog',
    icon: 'book-open',
    groups: [
      {
        title: 'Articles',
        items: [
          { title: 'Articles', href: `/blog/articles`, icon: 'file-text' },
          { title: 'Guides', href: `/blog/guides`, icon: 'book-open' }
        ]
      },
      {
        title: 'Tutorials',
        items: [
          { title: 'Tutorials', href: `/blog/tutorials`, icon: 'book' },
          { title: 'Case Studies', href: `/blog/case-studies`, icon: 'pie-chart' }
        ]
      },
      {
        title: 'Updates',
        items: [
          { title: 'Updates', href: `/blog/updates`, icon: 'history' },
          { title: 'Changelog', href: `/blog/changelog`, icon: 'activity' }
        ]
      }
    ]
  },
  {
    trigger: 'News',
    icon: 'newspaper',
    groups: [
      {
        title: 'AI Trends',
        items: [
          { title: 'Trends', href: `/news/trends`, icon: 'bar-chart' },
          { title: 'Opinion', href: `/news/opinion`, icon: 'newspaper' }
        ]
      },
      {
        title: 'Releases',
        items: [
          { title: 'Releases', href: `/news/releases`, icon: 'zap' },
          { title: 'Changelog', href: `/news/changelog`, icon: 'calendar' }
        ]
      },
      {
        title: 'Events',
        items: [
          { title: 'Events', href: `/news/events`, icon: 'clock' },
          { title: 'Webinars', href: `/news/webinars`, icon: 'megaphone' }
        ]
      }
    ]
  },
  {
    trigger: 'Discussion',
    icon: 'message-circle',
    groups: [
      {
        title: 'General Discussion',
        items: [
          { title: 'General', href: `/discussion/general`, icon: 'message-circle' },
          { title: 'Feedback', href: `/discussion/feedback`, icon: 'message-square' }
        ]
      },
      {
        title: 'Tool Recommendations',
        items: [
          { title: 'Tools', href: `/discussion/tools`, icon: 'tool' },
          { title: 'Showcase', href: `/discussion/showcase`, icon: 'camera' }
        ]
      },
      {
        title: 'Tutorials',
        items: [
          { title: 'Tutorials', href: `/discussion/tutorials`, icon: 'graduation-cap' },
          { title: 'Resources', href: `/discussion/resources`, icon: 'folder' }
        ]
      }
    ]
  },
  {
    trigger: 'Account',
    icon: 'user',
    groups: [
      {
        title: 'Dashboard',
        items: [
          { title: 'Dashboard', href: `/account`, icon: 'layout-dashboard' },
          { title: 'Activity', href: `/account/activity`, icon: 'gauge' }
        ]
      },
      {
        title: 'Profile',
        items: [
          { title: 'Profile', href: `/profile`, icon: 'user' },
          { title: 'Security', href: `/profile/security`, icon: 'shield' }
        ]
      },
      {
        title: 'Settings',
        items: [
          { title: 'Settings', href: `/settings`, icon: 'settings' },
          { title: 'Notifications', href: `/settings/notifications`, icon: 'bell-ring' }
        ]
      }
    ]
  },
  {
    trigger: 'About',
    icon: 'file-text',
    href: `/about`
  }
];

// 获取图标组件的辅助函数
export const getIconComponent = (iconName: IconKey) => {
  return iconMap[iconName] || iconMap.folder;
};

// 获取桌面端导航图标的辅助函数
export const getDesktopNavIcon = (sectionIndex: number, groupIndex?: number, itemIndex?: number): IconKey => {
  const section = desktopStaticNavigation[sectionIndex];
  if (!section) return 'star';

  // 如果是子项
  if (groupIndex !== undefined && itemIndex !== undefined) {
    const group = section.groups?.[groupIndex];
    const item = group?.items?.[itemIndex];
    if (item?.icon) {
      return item.icon;
    }
  }

  return 'star';
};

// 获取移动端导航图标的辅助函数
export const getMobileNavIcon = (sectionIndex?: number, groupIndex?: number, itemIndex?: number): IconKey => {
  if (sectionIndex !== undefined && mobileStaticNavigation[sectionIndex]) {
    const section = mobileStaticNavigation[sectionIndex];

    // 如果是顶级导航项
    if (groupIndex === undefined) {
      return section.icon;
    }

    // 如果是子项
    if (groupIndex !== undefined && itemIndex !== undefined) {
      const group = section.groups?.[groupIndex];
      const item = group?.items?.[itemIndex];
      if (item?.icon) {
        return item.icon;
      }
    }
  }

  return 'star';
};

// 获取桌面端导航链接的辅助函数
export const getDesktopNavHref = (sectionIndex: number, groupIndex?: number, itemIndex?: number): string => {
  const section = desktopStaticNavigation[sectionIndex];
  if (!section) return '/';

  // 如果是直接链接
  if (section.href) {
    return section.href;
  }

  // 如果是子项
  if (groupIndex !== undefined && itemIndex !== undefined) {
    const group = section.groups?.[groupIndex];
    const item = group?.items?.[itemIndex];
    if (item?.href) {
      return item.href;
    }
  }

  return '/';
};
