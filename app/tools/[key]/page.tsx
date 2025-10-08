'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { SiteNavigation } from '@component/SiteNavigation';
import { Footer } from '@component/Footer';
import { GradientBackground } from '@component/shared/GradientBackground';
import { Badge } from '@component/ui/badge';
import { Button } from '@component/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@component/ui/card';
import { Markdown } from '@/components/Markdown';
import { ExternalLink, Star, ArrowLeft, Heart, Users, GitFork, Calendar, Download, ShieldCheck, MessageSquare, Folder, Globe, Copy } from 'lucide-react';
import { getMessages } from '@/src/i18n/index';
import { Tool } from '@/types/tool';
import { CATEGORY_ICONS, getCategoryDisplayName, getSubcategoryDisplayName, type PrimaryCategoryKey } from '@/src/constants/category.constant';

// 导入所有工具数据
import imageGenerationData from '@/src/data/tools/image-generation.json';
import textWritingData from '@/src/data/tools/text-writing.json';
import chatToolsData from '@/src/data/tools/chat-tools.json';
import codeAssistantData from '@/src/data/tools/code-assistant.json';
import voiceVideoData from '@/src/data/tools/voice-video.json';
import dataInsightsData from '@/src/data/tools/data-insights.json';
import automationData from '@/src/data/tools/automation.json';
import othersData from '@/src/data/tools/others.json';

// 汇总所有工具数据
const ALL_TOOLS: Tool[] = [
  ...(imageGenerationData as Tool[]),
  ...(textWritingData as Tool[]),
  ...(chatToolsData as Tool[]),
  ...(codeAssistantData as Tool[]),
  ...(voiceVideoData as Tool[]),
  ...(dataInsightsData as Tool[]),
  ...(automationData as Tool[]),
  ...(othersData as Tool[])
];

export default function ToolDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [locale, setLocale] = React.useState('zh-CN');
  const [messages, setMessages] = React.useState(getMessages('zh-CN'));
  const [activeTab, setActiveTab] = React.useState<'overview' | 'files' | 'community'>('overview');
  const [isStarred, setIsStarred] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);

  // 从 URL 参数获取语言
  React.useEffect(() => {
    const langFromUrl = searchParams.get('lang') || 'zh-CN';
    setLocale(langFromUrl);
    setMessages(getMessages(langFromUrl));
  }, [searchParams]);

  // 根据key查找工具
  const tool = ALL_TOOLS.find((t: any) => (t as any).key === (params as any).key) as any;

  if (!tool) {
    return (
      <div className="relative min-h-screen">
        <GradientBackground type="index" />
        <SiteNavigation locale={locale} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">工具未找到</h1>
          <p className="text-muted-foreground mb-8">抱歉，您访问的工具不存在。</p>
          <Link href={`/explore?lang=${locale}`}>
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回探索页面
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = CATEGORY_ICONS[tool.primaryCategory as PrimaryCategoryKey] || Star;
  const categoryDisplayName = getCategoryDisplayName(tool.primaryCategory as PrimaryCategoryKey, messages);
  const subcategoryDisplayName = getSubcategoryDisplayName(tool.primaryCategory as PrimaryCategoryKey, tool.subcategory as any, messages);

  // 新增可选字段读取与默认值
  const likes = tool.likes ?? Math.round((tool.rating ?? 4) * 100);
  const followers = tool.followers ?? Math.round(likes / 4);
  const downloadsLastMonth = tool.downloadsLastMonth ?? Math.round(likes * 10 + 3000);
  const license = tool.license ?? 'proprietary';
  const lastUpdated = tool.lastUpdated ?? '最近';
  const publisher = tool.publisher ?? 'Community';
  const languages: string[] = tool.languages ?? ['English', 'Chinese'];
  const tasks: string[] = tool.tasks ?? tool.tags ?? [];
  const providers: string[] = tool.inferenceProviders ?? tool.providers ?? [];
  const website = tool.link;
  const repo = tool.repo ?? null;
  const demoUrl = tool.demoUrl ?? website;

  const highlights: string[] = tool.highlights ?? [];
  const examples: Array<{ title?: string; prompt: string; output?: string }> = tool.examples ?? [];
  const files: Array<{ name: string; size?: string; format?: string; version?: string }> = tool.files ?? [];
  const changelog: Array<{ version: string; date?: string; notes?: string[] }> = tool.changelog ?? [];

  // 概览 Markdown 与目录
  const overviewMarkdown: string =
    (tool as any).longDescriptionMarkdown ??
    `# Midjourney 简介
Midjourney 是一个基于生成式 AI 的图像创作工具，用户通过自然语言提示（Prompt）即可生成高质量、风格多样的视觉作品。它以“高美感、强风格化”著称，适合品牌海报、概念设计、插画分镜与氛围探索。

## 主要功能
\`toc\`

## 核心能力
- 文本到图像（Text-to-Image）：用一句话描述即可生成图像
- 风格迁移：通过参考图链接或风格关键词控制画面气质
- 迭代与放大：对生成结果进行变体、放大与细化
- 结构控制：结合参考图做构图/主体保持

## 适用场景
1. 市场营销：海报 KV、社媒配图、快速 A/B 试验
2. 影视与游戏：分镜/概念设定、氛围板
3. 电商：主题氛围图、商品背景替换、素材抠图
4. 创意探索：灵感发散与风格实验

## 入门提示词范式
- 内容要素：主体、环境、光影、镜头
- 风格要素：材质、时代/流派、画师参考
- 质量参数：--ar 宽高比、--v 版本、--stylize 风格强度

### 示例 Prompt
\`\`\`text
A cinematic product hero shot of a smartwatch on a marble table, golden hour lighting, shallow depth of field, soft reflections, minimalist style --ar 3:2 --stylize 200
\`\`\`

\`\`\`javascript
const hello = 'world';
console.log(hello);
\`\`\`

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`


## 最佳实践
- 先从“描述清晰的主体 + 简洁风格词”开始，再逐步加细节
- 善用参考图控制构图和主体一致性
- 建立自己的“风格词表”和“复用模板”以提高稳定性

## 注意事项
- 版权合规：在商用场景请遵守平台与地区法规
- 人物与品牌元素：需关注肖像权与商标使用界限
`;

  const slugify = (text: string) =>
    String(text)
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');

  // 提取 ReactNode 文本内容，保证标题 id 与目录一致
  const getNodeText = (node: React.ReactNode): string => {
    if (node === null || node === undefined || typeof node === 'boolean') return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getNodeText).join('');
    if (React.isValidElement(node)) return getNodeText((node as any).props?.children);
    return '';
  };

  const toc = React.useMemo(() => {
    const lines = overviewMarkdown.split('\n').filter((l) => /^#{1,6}\s+/.test(l));
    return lines.map((l) => {
      const level = (l.match(/^#{1,6}/) as RegExpMatchArray)[0].length;
      const text = l.replace(/^#{1,6}\s+/, '').trim();
      const slug = slugify(text);
      return { level, text, slug };
    });
  }, [overviewMarkdown]);

  // Tailwind 缩进映射，避免动态类名被裁剪
  const tocIndentClass = (level: number) => {
    switch (level) {
      case 1:
      default:
        return 'ml-0';
      case 2:
        return 'ml-3';
      case 3:
        return 'ml-6';
      case 4:
        return 'ml-9';
      case 5:
        return 'ml-12';
      case 6:
        return 'ml-12';
    }
  };

  return (
    <div className="relative min-h-screen">
      <GradientBackground type="index" />
      <SiteNavigation locale={locale} />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-6">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link href={`/explore?lang=${locale}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回探索
            </Button>
          </Link>
        </div>

        {/* 头部卡片：Logo/名称/描述/操作/标签 */}
        <Card className=" bg-transparent border-0 shadow-none">
          <div className="">
            <div className="flex items-start gap-4">
              <img src={tool.logo} alt={`${tool.name} logo`} className="h-16 w-16 rounded-xl shrink-0  " />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-2xl sm:text-3xl">{tool.name}</CardTitle>
                    <Badge variant="secondary" className="rounded-full">
                      {publisher}
                    </Badge>
                    <Badge variant="outline" className="rounded-full">
                      {license}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => setIsStarred((v) => !v)} variant={isStarred ? 'default' : 'outline'} aria-label="Start">
                      <Star className={`h-4 w-4 mr-2 ${isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      Start
                    </Button>
                    <Button size="sm" onClick={() => setIsFavorited((v) => !v)} variant={isFavorited ? 'default' : 'outline'} aria-label="收藏">
                      <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                      收藏
                    </Button>
                    <Button asChild size="sm">
                      <a href={website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        访问官网
                      </a>
                    </Button>
                  </div>
                </div>

                <CardDescription className="text-base mt-2">{tool.description}</CardDescription>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{(tool.rating ?? 4).toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>近30天 {downloadsLastMonth.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{likes.toLocaleString()} 喜欢</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{followers.toLocaleString()} 关注</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>更新于 {lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon className="h-4 w-4" />
                    <span>
                      {categoryDisplayName} · {subcategoryDisplayName}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {tool.tags?.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="rounded-full">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {repo && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button asChild size="sm" variant="outline">
                      <a href={repo} target="_blank" rel="noopener noreferrer">
                        <GitFork className="h-4 w-4 mr-2" />
                        仓库
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* 主体两栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：工具卡主体（近似 Hugging Face 的 Model card） */}
          <div className="lg:col-span-2">
            {/* 顶部“标签切换” */}
            <div className="flex items-center gap-2 border-b border-border/30 mb-4">
              {[
                { key: 'overview', label: '概览' },
                { key: 'files', label: '使用指南' },
                { key: 'community', label: '集成与链接' }
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key as any)}
                  className={`px-3 py-2 text-sm border-b-2 -mb-px whitespace-nowrap ${
                    activeTab === t.key ? 'border-foreground font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* 概览 */}
            {activeTab === 'overview' && (
              <Card className="bg-transparent border-0 shadow-none">
                <CardContent className="prose dark:prose-invert max-w-none py-6">
                  {/* 顶部提示/外链 */}
                  {(tool.announcements ?? []).length > 0 && (
                    <div className="mb-6 space-y-2">
                      {(tool.announcements as Array<{ text: string; href?: string }>).map((a, idx) => (
                        <div key={idx} className="text-sm">
                          <span>📣 </span>
                          {a.href ? (
                            <a className="underline" href={a.href} target="_blank" rel="noopener noreferrer">
                              {a.text}
                            </a>
                          ) : (
                            <span>{a.text}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <h2 className="text-xl font-semibold">概览</h2>

                  {/* 内容大纲 */}
                  {toc.length > 0 && (
                    <div className="mt-3 rounded-lg border border-border/40 p-3 not-prose">
                      <div className="text-xs text-muted-foreground mb-2">内容大纲</div>
                      <ul className="space-y-1 text-sm">
                        {toc.map((i) => (
                          <li key={i.slug} className={tocIndentClass(i.level)}>
                            <a className="hover:underline" href={`#${i.slug}`}>
                              {i.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Markdown 正文 */}
                  <div className="mt-4">
                    <Markdown>{overviewMarkdown}</Markdown>
                  </div>

                  {(tool.tags ?? []).length > 0 && (
                    <>
                      <h3 className="mt-6 text-lg font-semibold">适用场景</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(tool.tags ?? []).map((t: string) => (
                          <Badge key={t} variant="outline" className="rounded-full">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}

                  {highlights.length > 0 && (
                    <>
                      <h3 className="mt-6 text-lg font-semibold">功能清单</h3>
                      <ul className="list-disc pl-6 mt-2">
                        {highlights.map((h: string, i: number) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <>
                    <h3 className="mt-6 text-lg font-semibold">对比与替代</h3>
                    <p className="mt-2 text-muted-foreground text-sm">同类替代与搭配建议：可在“集成与链接”标签查看可用提供商与关联任务，结合你的工作栈选择最合适的组合。</p>
                  </>

                  {changelog.length > 0 && (
                    <>
                      <h3 className="mt-6 text-lg font-semibold">更新日志</h3>
                      <div className="mt-3 space-y-4">
                        {changelog.map((c, i) => (
                          <div key={i} className="border-l-2 pl-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Badge variant="outline" className="rounded-full">
                                v{c.version}
                              </Badge>
                              <span className="text-muted-foreground">{c.date}</span>
                            </div>
                            <ul className="list-disc pl-6 mt-2">
                              {(c.notes ?? []).map((n, j) => (
                                <li key={j}>{n}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* 文件与版本 */}
            {activeTab === 'files' && (
              <Card className="bg-transparent border-0 shadow-none">
                <div className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Folder className="h-4 w-4" /> 使用指南
                  </CardTitle>
                  <CardDescription>按照以下步骤快速上手。</CardDescription>
                </div>
                <CardContent className="py-4">
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>打开官网并登录（或注册）。</li>
                    <li>选择一个模板或创建新项目。</li>
                    <li>将下方示例提示复制到工具中运行。</li>
                  </ol>
                  <div className="mt-3 rounded-lg border border-border/40 p-3">
                    <div className="text-xs text-muted-foreground mb-1">示例提示</div>
                    <pre className="text-sm overflow-x-auto">{`用 ${tool.name ?? '该工具'} 自动整理我的工作流，并输出执行清单。`}</pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 社区 */}
            {activeTab === 'community' && (
              <Card className="bg-transparent border-0 shadow-none">
                <div className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> 集成与链接
                  </CardTitle>
                  <CardDescription>连接你的日常工具与资源。</CardDescription>
                </div>
                <CardContent className="py-4 space-y-4">
                  {providers?.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">可用提供商</div>
                      <div className="flex flex-wrap gap-2">
                        {providers.map((p: string) => (
                          <Badge key={p} variant="outline" className="rounded-full">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {languages?.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">支持语言</div>
                      <div className="flex flex-wrap gap-1">
                        {languages.map((l: string) => (
                          <Badge key={l} variant="secondary" className="rounded-full">
                            {l}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {tasks?.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">常见任务</div>
                      <div className="flex flex-wrap gap-1">
                        {tasks.map((t: string) => (
                          <Badge key={t} variant="outline" className="rounded-full">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <a href={website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" /> 官网
                      </a>
                    </Button>
                    {repo && (
                      <Button asChild size="sm" variant="outline">
                        <a href={repo} target="_blank" rel="noopener noreferrer">
                          <GitFork className="h-4 w-4 mr-2" /> 仓库
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 右侧：信息侧边栏 */}
          <div className="lg:col-span-1 space-y-5">
            {/* 工具状态（项目化） */}
            <Card className="bg-transparent border-0 shadow-none">
              <div className="pb-2">
                <CardTitle className="text-base">工具状态</CardTitle>
                <CardDescription>最近活跃度与安全标记</CardDescription>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border/40 p-3">
                  <div className="text-xs text-muted-foreground">上月访问</div>
                  <div className="text-lg font-semibold">{downloadsLastMonth.toLocaleString()}</div>
                </div>
                <div className="rounded-lg border border-border/40 p-3">
                  <div className="text-xs text-muted-foreground">评分</div>
                  <div className="text-lg font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {(tool.rating ?? 4).toFixed(1)}
                  </div>
                </div>
                <div className="rounded-lg border border-border/40 p-3">
                  <div className="text-xs text-muted-foreground">收藏</div>
                  <div className="text-lg font-semibold flex items-center gap-1">
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                    {likes.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-lg border border-border/40 p-3">
                  <div className="text-xs text-muted-foreground">Start</div>
                  <div className="text-lg font-semibold flex items-center gap-1">
                    <Star className={`h-4 w-4 ${isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    {Math.max(1, Math.round(likes / 3)).toLocaleString()}
                  </div>
                </div>
                <div className="rounded-lg border border-border/40 p-3 col-span-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-sm">许可：{license}</span>
                    <span className="text-xs text-muted-foreground ml-auto">更新于 {lastUpdated}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 快速上手 */}
            <Card className="bg-transparent border-0 shadow-none">
              <div className="pb-2">
                <CardTitle className="text-base">快速上手</CardTitle>
                <CardDescription>复制以下片段并前往官网试用</CardDescription>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border border-border/40 p-3">
                  <div className="text-xs text-muted-foreground mb-1">示例命令/提示词</div>
                  <pre className="text-sm overflow-x-auto">{`使用 ${tool.name ?? '该工具'} 完成：请总结本页要点并输出 5 条行动项。`}</pre>
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" variant="outline" onClick={() => navigator.clipboard?.writeText(`使用 ${tool.name ?? '该工具'} 完成：请总结本页要点并输出 5 条行动项。`)}>
                      <Copy className="h-4 w-4 mr-2" /> 复制
                    </Button>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full">
                  <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                    前往官网开始试用
                  </a>
                </Button>
              </div>
            </Card>

            {/* 推荐模板 */}
            <Card className="bg-transparent border-0 shadow-none">
              <div className="pb-2">
                <CardTitle className="text-base">推荐模板</CardTitle>
                <CardDescription>基于社区常见场景</CardDescription>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border border-border/40 p-3">
                  <div className="text-sm font-medium mb-1">会议速记 → 行动项</div>
                  <div className="text-xs text-muted-foreground">自动提取要点，生成待办并分配责任人。</div>
                </div>
                <div className="rounded-lg border border-border/40 p-3">
                  <div className="text-sm font-medium mb-1">邮件分类 → 数据入库</div>
                  <div className="text-xs text-muted-foreground">按主题识别类型，抽取关键字段入库。</div>
                </div>
              </div>
            </Card>

            {/* 更多操作 */}
            <Card className="bg-transparent border-0 shadow-none">
              <div className="pb-2">
                <CardTitle className="text-base">更多操作</CardTitle>
              </div>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <a href={`/discussion/tools?lang=${locale}`}>讨论区发帖</a>
                </Button>
                {repo && (
                  <Button asChild variant="outline" className="w-full">
                    <a href={repo} target="_blank" rel="noopener noreferrer">
                      查看仓库
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Footer locale={locale} />
      </section>
    </div>
  );
}
