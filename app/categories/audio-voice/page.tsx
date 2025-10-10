'use client';

import * as React from 'react';
import Link from 'next/link';

import { SiteNavigation } from '@component/SiteNavigation';
import { Footer } from '@component/Footer';
import { GradientBackground } from '@component/shared/GradientBackground';
import { ToolCard } from '@component/ToolCard';
import { getMessages } from '@/src/i18n/index';

import voiceVideoData from '@/src/data/tools/voice-video.json';
import type { Tool } from '@/types/tool';
import { useSearchParams } from 'next/navigation';
import { CATEGORY_ICONS, getCategoryDisplayName, type PrimaryCategoryKey } from '@/src/constants/category.constant';
import { Bell, PlusCircle, Shuffle, Mic, ArrowRight, Home, Search as SearchIcon, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BackToTop } from '@/components/BackToTop';

// 页面主分类
const CURRENT_CATEGORY: PrimaryCategoryKey = 'VoiceVideo';

type SortKey = 'default' | 'rating' | 'name';

export default function AudioVoicePage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [messages, setMessages] = React.useState(getMessages('zh-CN'));

  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
    setMessages(getMessages(langFromUrl));
  }, [searchParams]);

  const tools = (voiceVideoData as unknown as Tool[]) || [];
  const CategoryIcon = CATEGORY_ICONS[CURRENT_CATEGORY] || Mic;
  const categoryDisplayName = getCategoryDisplayName(CURRENT_CATEGORY, messages);

  // Spotlight：评分最高（信息行，非卡片）
  const spotlight = React.useMemo(() => {
    if (!tools.length) return null as unknown as Tool | null;
    const sorted = [...tools].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return sorted[0] ?? tools[0];
  }, [tools]);

  // 子分类分组（全部）
  const groupedBySub = React.useMemo(() => {
    const map = new Map<string, Tool[]>();
    tools.forEach((t) => {
      const key = t.subcategory || '其他';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], 'zh-CN'));
  }, [tools]);

  const allSubs = React.useMemo(() => groupedBySub.map(([sub]) => sub), [groupedBySub]);

  // 搜索 / 筛选 / 排序
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSubs, setSelectedSubs] = React.useState<string[]>([]); // 为空表示全部
  const [sortKey, setSortKey] = React.useState<SortKey>('default');

  const toggleSub = (sub: string) => {
    setSelectedSubs((prev) => {
      if (prev.includes(sub)) return prev.filter((s) => s !== sub);
      return [...prev, sub];
    });
  };

  const resetAll = () => {
    setSearchQuery('');
    setSelectedSubs([]);
    setSortKey('default');
  };

  const filteredGroupedBySub = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filterByQuery = (t: Tool) =>
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      (t.subcategory ? t.subcategory.toLowerCase().includes(query) : false) ||
      (t.tags || []).some((tag) => tag.toLowerCase().includes(query));

    const sortList = (list: Tool[]) => {
      const copy = [...list];
      if (sortKey === 'rating') {
        copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      } else if (sortKey === 'name') {
        copy.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
      } else if (sortKey === 'default' && query) {
        // 简易相关度
        const score = (t: Tool) =>
          (t.name.toLowerCase().includes(query) ? 3 : 0) +
          (t.description.toLowerCase().includes(query) ? 2 : 0) +
          ((t.subcategory || '').toLowerCase().includes(query) ? 1 : 0) +
          (t.tags || []).reduce((acc, tag) => acc + (tag.toLowerCase().includes(query) ? 1 : 0), 0);
        copy.sort((a, b) => score(b) - score(a));
      }
      return copy;
    };

    return groupedBySub
      .filter(([sub]) => selectedSubs.length === 0 || selectedSubs.includes(sub))
      .map(([sub, items]) => {
        const filtered = sortList(items.filter(filterByQuery));
        return [sub, filtered] as [string, Tool[]];
      })
      .filter(([_, items]) => items.length > 0);
  }, [groupedBySub, searchQuery, selectedSubs, sortKey]);

  // 随机跳转一个工具（避免 SSR/CSR 不一致，延后到客户端）
  const [randomToolHref, setRandomToolHref] = React.useState('/explore');
  React.useEffect(() => {
    if (!tools.length) return;
    const idx = Math.floor(Math.random() * tools.length);
    const t = tools[idx] as any;
    const key = t?.key || encodeURIComponent(t?.name || 'tool');
    setRandomToolHref(`/tools/${key}?lang=${locale}`);
  }, [tools, locale]);

  return (
    <div className="relative">
      <GradientBackground type="index" />
      <SiteNavigation locale={locale} />

      {/* 面包屑导航（与详情页风格一致） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb className="mb-3 sm:mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center">
                  <Home className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">{categoryDisplayName || '音频语音'}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Hero：更紧凑、无卡片化 */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-4">
        {/* 标题与简介（收紧间距） */}
        <div className="mt-2 sm:mt-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">探索下一代音频与语音体验</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl">覆盖语音克隆、转写、播客制作、变声与降噪等方向。直接在本页按子分类完整浏览所有工具。</p>
        </div>

        {/* 动作链接（保留图标，极简风格） */}
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <Link href={`/subscribe?channel=voice-video&lang=${locale}`} className="inline-flex items-center gap-1.5 text-foreground/90 hover:text-foreground transition">
            <Bell className="h-4 w-4" />
            <span>订阅更新</span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href={`/submit?category=voice-video&lang=${locale}`} className="inline-flex items-center gap-1.5 text-foreground/90 hover:text-foreground transition">
            <PlusCircle className="h-4 w-4" />
            <span>投稿工具</span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href={randomToolHref} className="inline-flex items-center gap-1.5 text-foreground/90 hover:text-foreground transition">
            <Shuffle className="h-4 w-4" />
            <span>随机探索</span>
          </Link>
        </div>
      </section>

      {/* Spotlight：信息行，简洁紧凑 */}
      {spotlight && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l1.546 4.64L18 8.5l-4.454 1.86L12 15l-1.546-4.64L6 8.5l4.454-1.86L12 2z" />
            </svg>
            <span>焦点推荐</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img src={spotlight.logo} alt={`${spotlight.name} logo`} className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-primary" />
                  <h2 className="text-base sm:text-lg font-semibold truncate">{spotlight.name}</h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 sm:line-clamp-2">{spotlight.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>评分 {(spotlight.rating ?? 4).toFixed(1)}</span>
              <span>·</span>
              <span>{categoryDisplayName}</span>
              <span>·</span>
              <Link href={`/tools/${(spotlight as any).key || encodeURIComponent(spotlight.name)}?lang=${locale}`} className="inline-flex items-center gap-1 text-foreground/90 hover:text-foreground">
                <ArrowRight className="h-3.5 w-3.5" />
                <span>查看详情</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 搜索 + 筛选 + 排序（极简，无卡片容器） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-2">
          {/* 搜索行 */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <input
              type="text"
              placeholder={messages?.explore?.searchPlaceholder || '搜索工具名称、描述或标签...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 focus:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors"
            />
          </div>

          {/* 筛选与排序行 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-0 justify-between">
            {/* 子分类多选（胶囊按钮，无卡片底） */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSubs([])}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border transition ${
                  selectedSubs.length === 0 ? 'border-transparent bg-primary text-primary-foreground shadow-sm' : 'border-primary/30 text-foreground/80 hover:border-primary/60 hover:bg-primary/10'
                }`}
                aria-label="全部子分类"
                title="全部子分类"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                全部
              </button>
              {allSubs.map((sub) => {
                const active = selectedSubs.includes(sub);
                return (
                  <button
                    key={sub}
                    onClick={() => toggleSub(sub)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border transition ${
                      active ? 'border-transparent bg-primary text-primary-foreground shadow-sm' : 'border-muted-foreground/30 text-foreground/80 hover:border-muted-foreground/60 hover:bg-muted/40'
                    }`}
                    aria-pressed={active}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>

            {/* 排序与重置 */}
            <div className="flex mt-4 items-center gap-2">
              <button
                onClick={() => setSortKey((prev) => (prev === 'rating' ? 'name' : prev === 'name' ? 'default' : 'rating'))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-emerald-300 bg-emerald-50/60 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-400 transition-colors"
                aria-label="切换排序"
                title="切换排序（评分 → 名称 → 默认）"
              >
                <ArrowUpDown className="h-3.5 w-3.5" />
                {sortKey === 'rating' ? '评分优先' : sortKey === 'name' ? '名称排序' : '默认'}
              </button>
              <button
                onClick={resetAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-rose-300 bg-rose-50/60 text-rose-900 hover:bg-rose-100 hover:border-rose-400 transition-colors"
                aria-label="重置"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                重置
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 子分类分组：标题 + 网格（全部在本页展示） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {filteredGroupedBySub.length === 0 && <div className="text-sm text-muted-foreground py-10">未找到匹配的工具，试试调整搜索或筛选。</div>}

        <div className="space-y-8 sm:space-y-10">
          {filteredGroupedBySub.map(([sub, items], idx) => (
            <div key={sub} className={`${idx > 0 ? 'pt-5 sm:pt-7' : ''}`}>
              {/* 分组标题：主色竖条 + 数量胶囊，增强可见性 */}
              <div className="mb-1 sm:mb-2 flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-primary" />
                <h3 className="text-base sm:text-lg font-semibold">{sub}</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary-700 dark:text-primary-300">共 {items.length}</span>
              </div>

              {/* 工具网格：完整渲染 */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {items.map((tool) => (
                  <ToolCard key={tool.key || tool.name} tool={tool} locale={locale} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 页脚（紧凑留白） */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12"></section>

      <BackToTop />
    </div>
  );
}
