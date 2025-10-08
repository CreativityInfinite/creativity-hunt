'use client';

import * as React from 'react';

import { SiteNavigation } from '@component/SiteNavigation';
import { Footer } from '@component/Footer';
import { GradientBackground } from '@component/shared/GradientBackground';
import { ToolCard } from '@component/ToolCard';
import { useSearchParams } from 'next/navigation';
import { getMessages } from '@/src/i18n/index';

import imageGenerationData from '@/src/data/tools/image-generation.json';
import textWritingData from '@/src/data/tools/text-writing.json';
import chatToolsData from '@/src/data/tools/chat-tools.json';
import codeAssistantData from '@/src/data/tools/code-assistant.json';
import voiceVideoData from '@/src/data/tools/voice-video.json';
import dataInsightsData from '@/src/data/tools/data-insights.json';
import automationData from '@/src/data/tools/automation.json';
import othersData from '@/src/data/tools/others.json';

import { PRIMARY_CATEGORIES, CATEGORY_ICONS, CATEGORY_COLORS, getCategoryDisplayName, getSubcategoryDisplayName, type PrimaryCategoryKey } from '@/src/constants/category.constant';
import type { Tool } from '@/types/tool';
import { Search } from 'lucide-react';

// 汇总所有工具数据
const ALL_TOOLS_DATA = {
  ImageGeneration: imageGenerationData as unknown as Tool[],
  TextWriting: textWritingData as unknown as Tool[],
  ChatTools: chatToolsData as unknown as Tool[],
  CodeAssistant: codeAssistantData as unknown as Tool[],
  VoiceVideo: voiceVideoData as unknown as Tool[],
  DataInsights: dataInsightsData as unknown as Tool[],
  Automation: automationData as unknown as Tool[],
  Others: othersData as unknown as Tool[]
};

// 动态聚合二级分类：从数据中读取 subcategory
function getSubcategoriesFor(primary: PrimaryCategoryKey, tools: Tool[]) {
  const set = new Set<string>();
  tools.forEach((t) => {
    if (t.subcategory) set.add(t.subcategory);
  });
  const arr = Array.from(set);
  return arr.length ? arr : ['ALL'];
}

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [messages, setMessages] = React.useState(getMessages('zh-CN'));

  const [activeCategory, setActiveCategory] = React.useState<PrimaryCategoryKey>('ImageGeneration');
  const [activeSub, setActiveSub] = React.useState<string>('全部');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [isClient, setIsClient] = React.useState(false);

  // 从 URL 参数获取语言，middleware 确保它总是存在
  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
    setMessages(getMessages(langFromUrl));
  }, [searchParams]);

  const currentTools = ALL_TOOLS_DATA[activeCategory];
  const subs = getSubcategoriesFor(activeCategory, currentTools);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    setActiveSub('ALL');
  }, [activeCategory]);

  return (
    <div className="relative">
      <GradientBackground type="index" />
      <SiteNavigation locale={locale} />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 min-h-screen">
        {/* 标题区 */}
        <div className="mb-6 sm:mb-8 lg:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">{messages?.explore?.title || messages?.headings?.explore || '探索全部分类'}</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">{messages?.explore?.subtitle || '发现优质 AI 工具与平台，按分类和用途快速定位'}</p>
        </div>

        {/* 左右分栏 */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* 左侧：一级分类列表 - 移动端优化 */}
          <aside className="col-span-12 sm:col-span-3 lg:col-span-3">
            {/* 移动端：横向滚动的分类列表 */}
            <div className="sm:hidden mb-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {PRIMARY_CATEGORIES.map((key) => {
                  const isActive = key === activeCategory;
                  const count = ALL_TOOLS_DATA[key].length;
                  const Icon = CATEGORY_ICONS[key];
                  const displayName = getCategoryDisplayName(key, messages);
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
                        isActive
                          ? 'bg-primary/10 text-primary border-primary/20 shadow-sm'
                          : 'bg-background/30 backdrop-blur-sm text-muted-foreground border-border/30 hover:bg-background/50 hover:text-accent-foreground hover:border-border/50'
                      }`}
                      style={isActive ? { backgroundColor: CATEGORY_COLORS[key] } : undefined}
                    >
                      <Icon className={`h-3 w-3 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="whitespace-nowrap">{displayName}</span>
                      <span className="text-xs bg-muted/50 px-1.5 py-0.5 rounded-full">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 桌面端：垂直分类列表 */}
            <div className="hidden sm:block sticky top-16 rounded-2xl border border-border/30 bg-background/40 backdrop-blur-md p-3 sm:p-4">
              {PRIMARY_CATEGORIES.map((key) => {
                const isActive = key === activeCategory;
                const count = ALL_TOOLS_DATA[key].length;
                const Icon = CATEGORY_ICONS[key];
                const displayName = getCategoryDisplayName(key, messages);
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 mb-2 ${
                      isActive ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'hover:bg-background/30 backdrop-blur-sm border border-transparent hover:border-border/30'
                    }`}
                    style={isActive ? { backgroundColor: CATEGORY_COLORS[key] } : undefined}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm font-medium flex-1">{displayName}</span>
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">{count}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* 右侧：搜索框 + 二级分类标签 + 工具列表 */}
          <main className="col-span-12 sm:col-span-9 lg:col-span-9">
            {/* 搜索框 */}
            <div className="mb-4">
              <div className="relative rounded-2xl border border-border/30 bg-background/40 backdrop-blur-md p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                  <input
                    type="text"
                    placeholder={messages?.explore?.searchPlaceholder || '搜索工具名称、描述或标签...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-border/30 bg-background/30 backdrop-blur-sm pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:bg-background/50 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* 标签式子分类选择器 */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 p-4 rounded-2xl border border-border/30 bg-background/40 backdrop-blur-md">
                {isClient &&
                  (['ALL', ...subs] as string[]).map((label) => {
                    const isActive = activeSub === label;
                    const displayName = label === 'ALL' ? messages?.explore?.all || '全部' : getSubcategoryDisplayName(activeCategory, label as any, messages);
                    const count = label === 'ALL' ? currentTools.length : currentTools.filter((t) => t.subcategory === label).length;
                    return (
                      <button
                        key={label}
                        onClick={() => setActiveSub(label)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                            : 'bg-background/30 backdrop-blur-sm text-muted-foreground border-border/30 hover:bg-background/50 hover:text-accent-foreground hover:border-border/50'
                        }`}
                      >
                        <span>{displayName}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}>{count}</span>
                      </button>
                    );
                  })}

                {!isClient && (
                  <button className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground border border-primary shadow-sm flex items-center gap-1.5">
                    <span>{messages?.explore?.all || '全部'}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary-foreground/30 text-primary-foreground">{currentTools.length}</span>
                  </button>
                )}
              </div>
            </div>

            {/* 内容区域 */}
            <div className="mt-6">
              {/* 当前分类信息 */}
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span>{getCategoryDisplayName(activeCategory, messages)}</span>
                <span>·</span>
                <span>{activeSub === 'ALL' ? messages?.explore?.all || '全部' : isClient ? getSubcategoryDisplayName(activeCategory, activeSub as any, messages) : activeSub}</span>
              </div>

              {/* 工具网格 - 优化卡片间距 */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                {(() => {
                  // 首先按子分类过滤
                  let displayList = currentTools.filter((t) => (activeSub === 'ALL' ? true : t.subcategory === activeSub));

                  // 然后按搜索查询过滤
                  if (searchQuery.trim()) {
                    const query = searchQuery.toLowerCase().trim();
                    displayList = displayList.filter((tool) => {
                      return (
                        tool.name.toLowerCase().includes(query) ||
                        tool.description.toLowerCase().includes(query) ||
                        (tool.primaryCategory && tool.primaryCategory.toLowerCase().includes(query)) ||
                        (tool.subcategory && tool.subcategory.toLowerCase().includes(query)) ||
                        tool.tags.some((tag) => tag.toLowerCase().includes(query))
                      );
                    });
                  }

                  return displayList.map((tool) => <ToolCard key={tool.name} tool={tool} locale={locale} />);
                })()}

                {(() => {
                  // 计算过滤后的结果数量
                  let displayList = currentTools.filter((t) => (activeSub === '全部' ? true : t.subcategory === activeSub));

                  if (searchQuery.trim()) {
                    const query = searchQuery.toLowerCase().trim();
                    displayList = displayList.filter((tool) => {
                      return (
                        tool.name.toLowerCase().includes(query) ||
                        tool.description.toLowerCase().includes(query) ||
                        (tool.primaryCategory && tool.primaryCategory.toLowerCase().includes(query)) ||
                        (tool.subcategory && tool.subcategory.toLowerCase().includes(query)) ||
                        tool.tags.some((tag) => tag.toLowerCase().includes(query))
                      );
                    });
                  }

                  return (
                    displayList.length === 0 && (
                      <div className="col-span-full text-center text-sm text-muted-foreground py-12">
                        <div className="flex flex-col items-center gap-2">
                          <div className="text-4xl">🔍</div>
                          <div>
                            {searchQuery.trim()
                              ? messages?.explore?.noResultsSearch || '未找到匹配的工具，尝试调整搜索关键词'
                              : messages?.explore?.noResultsCategory || '暂无内容，切换其他二级分类试试'}
                          </div>
                        </div>
                      </div>
                    )
                  );
                })()}
              </div>
            </div>
          </main>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Footer locale={locale} />
      </section>
    </div>
  );
}
