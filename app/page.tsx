import Link from 'next/link';
import tools from '@data/tools.json';
import { SearchBar } from '@component/SearchBar';
import { Badge } from '@component/ui/badge';
import { Button } from '@component/ui/button';
import { ToolCard } from '@component/ToolCard';
import { SiteNavigation } from '@component/SiteNavigation';
import { Footer } from '@component/Footer';
import { getMessages } from '@i18n/index';
import { ScrollTrigger } from '@component/ScrollTrigger';
import { BackToTop } from '@component/BackToTop';
import { Search, Upload, TrendingUp, Image, FileText, Code, Mic, BarChart, Zap, Compass, Bot } from 'lucide-react';
import { Tool } from '@/types/tool';
import { GradientBackground } from '@component/shared/GradientBackground';
import { cookies } from 'next/headers';

export default async function HomePage({ searchParams }: { searchParams?: { lang?: string } }) {
  const cookieStore = await cookies();
  const locale = searchParams?.lang || cookieStore.get('NEXT_LOCALE')?.value || 'zh-CN';
  const messages = getMessages(locale);
  const topTools = tools as Tool[];
  const hotTags = messages?.labels?.hotTagsList ?? [];

  return (
    <ScrollTrigger triggerDistance={100} autoScrollTarget="hot-tools-section" reverseScrollTarget="top" showIndicator={true}>
      <div className="relative">
        {/* 背景渐变网格 - 覆盖整个顶部区域 */}
        <GradientBackground />

        {/* 导航 */}
        <SiteNavigation locale={locale} />

        {/* Hero */}
        <section className="container mx-auto px-4 pb-50 text-center min-h-screen flex flex-col justify-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">{messages.hero.title}</h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">{messages.hero.subtitle}</p>

          <div id="search-section" className="mt-6 flex justify-center">
            <div className="relative group w-full max-w-3xl">
              {/* 柔光氛围：悬停或聚焦时出现的轻微光晕 */}
              <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-primary/5 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
              <SearchBar placeholder={messages.search.placeholder} showButton={false} />
            </div>
          </div>

          {/* 行动按钮 */}
          <div className="mt-4 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button variant="ghost" size="lg" className="px-8 py-3">
              <Compass className="mr-2 h-5 w-5" />
              {messages.cta.explore}
            </Button>
            <Button variant="ghost" size="lg" className="px-8 py-3">
              <Upload className="mr-2 h-5 w-5" />
              {messages.cta.submit}
            </Button>
            <Button variant="ghost" size="lg" className="px-8 py-3">
              <TrendingUp className="mr-2 h-5 w-5" />
              {messages.cta.trends}
            </Button>
          </div>

          {/* 热门标签 */}
          <div className="mt-10 max-w-6xl mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {hotTags.map((tag, index) => {
                const icons = [Image, FileText, Bot, Code, Mic, BarChart, Zap];
                const Icon = icons[index] || Search;
                const colors = ['#1d4ed81a', '#9333ea1a', '#22d3ee1a', '#f59e0b1a', '#ef44441a', '#10b9811a', '#3b82f61a'];
                return (
                  <Link key={tag} href={`/search/${encodeURIComponent(tag)}`}>
                    <div
                      className="group cursor-pointer rounded-2xl border border-border/50 bg-card text-card-foreground shadow-sm transition-all duration-300 px-5 py-4 flex items-center gap-3 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    >
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300 group-hover:animate-none animate-pulse" />
                      <span className="text-sm font-medium transition-colors duration-300">{tag}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 热门工具 */}
        <section id="hot-tools-section" className="container mx-auto px-4 py-20">
          <h2 className="text-2xl font-semibold text-center mb-12">{messages.headings?.hotTools}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {topTools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className="container mx-auto px-4 py-20">
          <Footer locale={locale} />
        </section>
      </div>

      <BackToTop />
    </ScrollTrigger>
  );
}
