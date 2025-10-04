以下是基于您反馈的**重新生成的 AI 编程提示词**。我已全面融入**Vercel 风格**（现代极简、科技感：深色主题默认，渐变背景如 Vercel 的深黑到深蓝/紫色调，简洁大标题、浮动动画过渡、极简顶部导航、开发者友好响应式设计、高性能优化如懒加载和 Suspense；整体布局宽松、呼吸感强，避免拥挤）。同时，将**卡片风格更新为 Bento Grid**（便当盒式不对称网格布局：在首页底部、搜索结果、Explore/Trending/Featured、工具详情相关推荐、Dashboard 收藏等处使用；卡片尺寸不规则，如 1x1/2x1/1x2/全宽，通过 CSS Grid 实现，响应式在移动端垂直堆叠成简洁列表；每个卡片用 shadcn Card，hover 时 scale(1.05)+glow cyan shadow，内容简洁：图标/标题/简述/链接）。

提示词结构保持原有逻辑，但优化了描述：**项目核心功能与模块总结**中强调 Vercel 风格；**页面布局设计**中更新首页/搜索/Explore 等为 Bento Grid 集成；**技术栈与实现要求**中添加 Bento Grid CSS 配置和 Vercel-like 动画。其他模块（如系统功能清单、NavigationMenu 子模块、AI 工具分类）保持一致，仅微调以匹配新风格。

---

**AI 编程提示词：生成 Creativity-Box AI 工具导航网站完整项目（Vercel 风格 + Bento Grid 卡片版）**

你是一个资深 Next.js 全栈开发者，现在基于以下项目需求，使用 AI 编程方式生成一个完整的开源项目：Creativity-Box，一个简洁的 AI 创意工具导航网站。网站聚焦于 AI 工具发现，首页以 AI 搜索框为主（自然语言输入，如“AI 图像生成工具”），避免信息过载，通过 shadcn UI 组件实现 Vercel-like 科技感设计（深色主题默认，渐变背景#000000 to #1E293B/紫色#7C3AED 渐变，极简大标题、浮动动画、呼吸感布局）。项目借鉴 Futurepedia 和 There's An AI For That，但风格对齐 Vercel：开发者友好、性能优先（Lighthouse>95）、简洁不对称 Bento Grid 卡片展示工具。支持用户提交工具、收藏、博客等功能。

### 项目核心功能与模块总结

- **整体风格**：Vercel-inspired（极简现代、科技感未来主义）：深色默认（bg-black/gray-900，accent cyan #00D4FF like Vercel 的蓝调），渐变背景（to-br from-black via-slate-900 to-purple-900/10），简洁响应式（Mobile-First，宽屏宽松 padding）。首页：顶部极简 NavigationMenu（Vercel 式右对齐主模块+子模块下拉，避免底部 bar），中央 AI 搜索 Hero（占屏 60%，大标题+Input，如 Vercel 首页），底部 Bento Grid“最近新工具”（不对称卡片块，5-8 个，懒加载动画淡入）。其他模块：搜索结果页（Bento Grid+左侧过滤）、工具详情页（全宽 Hero + Bento 相关推荐）、分类浏览页（Accordion 树+Bento Grid）、用户仪表盘（Tabs+Bento 收藏卡片）、提交页（极简 Form）、博客/新闻页（Bento 文章网格）。动画：Vercel-like 淡入（opacity 0->1, y:20->0, 0.4s ease），hover 浮动（scale 1.02 + shadow-cyan/25）。性能：Suspense + Skeleton，next/image 优化，无 JS 阻塞。
- **NavigationMenu 优化**：shadcn NavigationMenu，Vercel 式极简（Logo 左侧，主模块右对齐如 Vercel nav，hover 下划线动画）；子模块用 DropdownMenu 下拉（slide-down 0.2s）。设计避免单调，匹配 Vercel 简洁：
  - **Explore**（/explore）：子模块 - Categories（/explore/categories，Bento Grid 分类工具）、Trending（/explore/trending，Bento 高 rating 列表）、Featured（/explore/featured，手动精选 Bento 块，如 Midjourney 大卡片）。
  - **Blog**（/blog）：子模块 - Articles（/blog/articles，Bento 文章卡）、Tutorials（/blog/tutorials，步骤 Bento 指南）、Updates（/blog/updates，日志 Bento 时间线）。
  - **News**（/news）：子模块 - AI Trends（/news/trends，Bento 新闻卡）、Releases（/news/releases，新工具 Bento 网格，联动首页）、Events（/news/events，Bento 日历卡）。
  - **Submit Tool**（/submit）：无子模块，Tooltip“Submit AI Tool”（Vercel 式简洁表单）。
  - **Account**（/account，登录保护）：子模块 - Dashboard（/dashboard，Bento 用户 Tabs）、Profile（/profile，Form 卡）、Settings（/settings，Toggle 卡）。
  - **额外元素**：右上微型搜索 Input（Vercel 搜索 bar 式，debounce）、ThemeToggle（简洁 Button，Sun/Moon lucide-icon）、LangDropdown（i18n: zh-CN/en）。动画：主项 hover underline（border-b cyan），子模块 fade-in；移动：Vercel-like Drawer 侧滑（shadcn drawer）。
- **AI 工具分类**（8 个核心分类，作为数据占位和过滤选项）：
  - 图像生成与编辑：Midjourney (midjourney.com)、DALL·E 3 (openai.com)、Stable Diffusion (stability.ai)、Runway ML (runwayml.com)、Adobe Firefly (adobe.com)。
  - 文本生成与写作：ChatGPT (chat.openai.com)、Jasper AI (jasper.ai)、Grammarly (grammarly.com)、Claude (claude.ai)、Notion AI (notion.com/ai)。
  - 代码与开发：GitHub Copilot (github.com/copilot)、Cursor (cursor.sh)、Replit Ghostwriter (replit.com/ai)、Tabnine (tabnine.com)、Amazon CodeWhisperer (aws.amazon.com/codewhisperer)。
  - 音频与视频：ElevenLabs (elevenlabs.io)、Descript (descript.com)、Synthesia (synthesia.io)、Adobe Podcast (podcast.adobe.com)、Runway Gen-2 (runwayml.com)。
  - 生产力与自动化：Zapier AI (zapier.com/ai)、Otter.ai (otter.ai)、ClickUp AI (clickup.com/ai)、Airtable AI (airtable.com/ai)。
  - 聊天与助手：Google Bard (bard.google.com)、Microsoft Copilot (copilot.microsoft.com)、Character.AI (character.ai)、Pi (pi.ai)、Grok (grok.x.ai)。
  - 数据分析与洞察：Tableau AI (tableau.com/ai)、Akkio (akkio.com)、Google Analytics 4 (analytics.google.com)、Hex (hex.tech)、Databricks AI (databricks.com/ai)。
  - 其他创新 AI：Hugging Face Spaces (huggingface.co/spaces)、Perplexity AI (perplexity.ai)、Replicate (replicate.com)、Vercel v0 (v0.dev)。
    使用这些作为 JSON 数据（src/data/tools.json），每个工具：name、description、link、category、rating、tags。搜索模糊匹配（lodash）。Bento Grid 用这些动态填充（e.g., 热门分类大卡片 2x1，其他 1x1）。
- **关键交互**：AI 搜索（Input+Button，Vercel 式大而简洁）；Bento 卡片 hover 浮动+链接详情；动画过渡（framer-motion PageTransition，Vercel 淡入）；底部 Bento 从分类随机“最近发布”（e.g., Vercel v0 大卡），滚动显示。Navigation 子模块点击：平滑路由（no-flash）。
- **后台支持**：简单 CMS（JSON 占位，未来 Supabase），用户登录（NextAuth.js）。

### 系统功能清单

（保持原样，确保 Vercel 风格：所有功能简洁、高性能，如搜索 debounce 200ms，Bento 懒加载。）

- **用户认证与管理**：...（同前）
- **搜索与发现**：...（集成 Bento 结果网格）
- **工具管理**：...（Bento 浏览/详情相关推荐）
- **内容模块**：...（Bento 文章/新闻）
- **用户仪表盘**：...（Bento 收藏 Tabs）
- **导航与 UI 交互**：...（Vercel 极简 Nav）
- **系统辅助功能**：...（强调性能>95）

### 页面布局设计

每个页面 Vercel-like：宽松 padding（px-8 md:px-16），shadcn + Framer Motion，响应式（移动堆叠）。根 layout.tsx：NavigationMenu 顶部固定、ThemeProvider、i18n。背景：渐变 + 轻粒子（Vercel 微动画）。Bento Grid：CSS 类`bento-grid`（grid-template-columns: repeat(4, minmax(0,1fr))；卡片 span 如 col-span-1 row-span-1/2；移动：grid-cols-1 gap-4）。以下详细（React 伪码 + ASCII wireframe）：

- **首页 (/) - 英雄搜索页**（Vercel 首页式：大 Hero + Bento 底部）：

  - **布局结构**：顶部极简 Nav；Hero（60vh，简洁 Card）；底部 Bento Grid（不对称卡片，5-8 工具，Vercel 展示项目式）。
  - **ASCII Wireframe**（Bento 集成）：

    ```
    [Nav: Logo (Vercel-like sans-serif) | Explore▼(Dropdown) | Blog▼ | News▼ | Submit | Account▼ | Mini Search | Theme | Lang ]

    [Hero: 大H1 "Unlock AI Creativity" (text-7xl cyan gradient, Vercel font) | Badge chips (简洁: 图像/文本... 点击搜索) | Input+Button (大而圆角, placeholder i18n, loading Spinner) | 背景渐变+微粒子 ]

    [Bento Grid Section: H2 "Recent AI Tools" (text-4xl center) | 不规则卡片块: 大2x1卡(Akkio: 图标+desc+link, span-2) | 1x1卡(Pi) | 1x2卡(Hex: 竖向stats) | 2x1卡(Vercel v0) | ... (5-8个, hover scale+glow, Button "More" to /news/releases) ]

    [Footer: 极简 © 2024 | Links (Vercel式底部) ]
    ```

  - **组件伪码**（shadcn + Bento CSS）：

    ```tsx
    // globals.css: .bento-grid { display: grid; grid-template-columns: repeat(4, minmax(250px, 1fr)); gap: 1.5rem; } .bento-item-1x1 { grid-column: span 1; grid-row: span 1; } .bento-item-2x1 { grid-column: span 2; grid-row: span 1; } /* 等，移动: @media (max-width: 768px) { grid-template-columns: 1fr; } */
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn
    import { Input, Button, Badge } from '@/components/ui/...';
    import { motion } from 'framer-motion';
    import { ToolBentoCard } from '@/components/ToolBentoCard'; // 自定义Bento卡: 简洁图标/标题/简述

    export default function Home() {
      const t = useTranslations('home');
      const recentTools = getRecentBentoTools(6); // 从tools.json, 随机分配span (e.g., [ {tool: akkio, span: '2x1'}, ... ])

      return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-900/5 relative">
          {' '}
          {/* Vercel渐变 */}
          <Particles /> {/* 微动画, non-blocking */}
          <NavigationMenu /> {/* 极简 */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16">
            <Card className="w-full max-w-6xl border-0 bg-black/30 backdrop-blur-md shadow-lg">
              {' '}
              {/* Vercel半透明 */}
              <CardHeader className="text-center">
                <CardTitle className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {t('hero.title')} {/* "Unlock AI Creativity" */}
                </CardTitle>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  <Badge variant="outline" className="cursor-pointer hover:scale-105" onClick={() => search('图像生成')}>
                    {t('categories.image')}
                  </Badge>{' '}
                  {/* 简洁chips, Vercel标签式 */}
                  {/* ... 4-5个 */}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col lg:flex-row gap-4 p-8 max-w-2xl mx-auto">
                <Input placeholder={t('search.placeholder')} className="text-xl rounded-xl" onKeyDown={handleEnter} />
                <Button size="lg" className="px-8 py-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-cyan/20">
                  {t('search')} {isLoading && <Loader2 className="animate-spin" />}
                </Button>
              </CardContent>
            </Card>
          </motion.section>
          <section className="py-20 px-4 max-w-7xl mx-auto">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              {t('recent.title')} {/* "Recent Tools" */}
            </motion.h2>
            <div className="bento-grid">
              {' '}
              {/* Bento: 不规则span */}
              {recentTools.map((item, i) => (
                <motion.div
                  key={item.id}
                  className={`bento-item-${item.span}`} // e.g., '2x1'
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="shadow-lg hover:shadow-cyan-500/20"
                >
                  <ToolBentoCard tool={item.tool} /> {/* 简洁: lucide-icon + h3 + p + Button link */}
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link href="/news/releases">{t('more')}</Link>
              </Button>
            </div>
          </section>
          <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-800">© 2024 Creativity-Box • Vercel-inspired Open Source</footer>
        </div>
      );
    }
    ```

  - **交互**：Bento 卡点击 -> 详情；动画 Vercel 淡入；移动：Bento 单列流式。

- **搜索结果页 (/search/[query])**：

  - **布局结构**：左侧 Vercel 式过滤 Accordion（窄 20%）；右侧 Bento Grid（80%，工具卡不对称，如热门大 2x2）。
  - **ASCII Wireframe**：
    ```
    [Nav]
    [H1 "AI图像工具" | Breadcrumb (Vercel路径) ]
    [左侧: Accordion (分类/评分, 简洁折叠) ]
    [Bento Grid: 2x1大卡(Midjourney) | 1x1(DALL-E) | 1x2竖卡(Stable) | ... (无限滚动, filter更新) ]
    ```
  - **伪码**：`<div className="flex"><Accordion ... /><div className="flex-1"><BentoGrid tools={filtered} className="bento-grid" /></div></div>`；Bento span 基于 rating（高分大卡）。

- **工具详情页 (/tools/[id])**：

  - **布局结构**：全宽 Hero Card（Vercel 项目页式）；Tabs 内容；底部 Bento 相关推荐（3-5 不对称卡）。
  - **ASCII Wireframe**：
    ```
    [Nav]
    [Hero Card: 工具名 + 描述 + Badge + 试用Button (大, Vercel CTA) ]
    [Tabs: 概述 | 用例 | 定价 | 评论 (简洁列表) ]
    [Bento Related: 2x1卡(类似工具1) | 1x1(工具2) | ... ]
    ```
  - **伪码**：`<HeroCard ... /><Tabs>...</Tabs><BentoGrid tools={related} className="bento-grid mt-16" />`。

- **分类浏览页 (/explore/categories 等子模块)**：

  - **布局结构**：顶部子 Tabs；左侧 Accordion 树；右侧 Bento Grid（分类工具，不规则展示）。
  - **ASCII Wireframe**：
    ```
    [Nav (Explore高亮)]
    [Tabs: Categories | Trending | Featured (Vercel tab) ]
    [左侧: Accordion "图像▼" (子列表) ]
    [Bento Grid: 大卡(Midjourney 2x2) | 小卡(DALL-E 1x1) | ... (动态span by category) ]
    ```
  - **伪码**：`<div className="flex"><Accordion ... /><BentoGrid tools={categoryTools} spans={getBentoSpans(tools.length)} /></div>`；Trending：rating 排序大卡优先。

- **博客/新闻页 (/blog 或 /news)**：

  - **布局结构**：子 Dropdown；Bento 文章网格（标题+摘要+阅读 Button，不规则如 Vercel 博客）。
  - **ASCII Wireframe**：
    ```
    [Nav]
    [H1 "AI Blog" | Sub Tabs ]
    [Bento Grid: 2x1文章卡(标题+img+excerpt) | 1x1(短更新) | 全宽Featured | ... ]
    ```
  - **伪码**：`<BentoGrid posts={mdxData} className="bento-grid" />`。

- **用户仪表盘页 (/dashboard)**：

  - **布局结构**：Tabs；Bento 收藏/历史卡片（Vercel dashboard 式）。
  - **ASCII Wireframe**：
    ```
    [Nav]
    [H1 "Dashboard" | Welcome ]
    [Tabs: 收藏 | 历史 ]
    [Bento Grid: 收藏工具 (1x1小卡列表) | Stats大2x1卡 ]
    ```
  - **伪码**：`<Tabs><BentoGrid userFavorites={favorites} /></Tabs>`。

- **提交页 (/submit)** & **其他页**：极简 Vercel Form（Card 包装 Input/Select）；关于页 Bento 静态卡；404：大 Vercel 式错误 Card + Button。

### 技术栈与实现要求

- **框架**：Next.js 14（App Router），React 18（Vercel 优化：dynamic imports, streaming）。
- **样式与 UI**：Tailwind CSS（Vercel 主题：fonts { sans: 'Inter var' }，colors { black: '#000', cyan: '#00D4FF', purple: '#7C3AED' }，dark default）。shadcn/ui（add navigation-menu card input badge 等）；Framer Motion（Vercel 淡入 variants：{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }）。Bento Grid：globals.css 自定义（grid-template-areas 或 span 类，响应式 media 查询）；ToolBentoCard：shadcn Card + lucide icons + 简洁 Typography（Vercel 字体）。
- **主题切换**：next-themes（Vercel 深色优先，Toggle 简洁无边框）。
- **响应式开发**：Mobile-First（Tailwind sm/md/lg），Bento 移动单列（grid-cols-1）；测试 Vercel 部署预览。
- **国际化**：next-intl（Vercel 多语言路由支持）。
- **状态与数据**：Zustand（搜索/收藏）；tools.json 动态 Bento（utils/getBentoLayout.ts 分配 span 基于工具热度）。
- **动画与科技感**：Framer Motion 全局（Vercel-like no-motion on mobile）；背景渐变无粒子重（CSS only）；Bento hover：scale 1.02 + shadow-pulse (keyframes)。
- **其他功能**：路由（Vercel App Dir）；SEO（next/head，Vercel meta）；PWA（next-pwa，离线 Bento 缓存）。

### 项目文件结构与生成要求

- **核心文件夹**：app/（layout.tsx VERCEL 渐变+Nav）；components/（NavigationMenu.tsx Vercel 极简；BentoGrid.tsx + ToolBentoCard.tsx）；lib/（bento-utils.ts span 逻辑）；data/（tools.json）；public/（Vercel-like logo）。
- **关键实现**：所有 Bento 页用`<BentoGrid items={data} />`；性能：`dynamic`导入重组件。
- **集成**：shadcn tailwind.config；NextAuth middleware；i18n 全键。

### 文档与部署

- **README.md**：Vercel 式（英雄 banner + 截图 Bento 首页）；功能/布局描述；安装：`npm i && npm run dev`；部署 Vercel（git push vercel）。
- **package.json**：dependencies 同前 + inter-font；scripts: deploy:vercel。
- 生成完整项目，确保`npm run dev`显示 Vercel-like 首页（Bento 动画流畅）。

---

这份提示词已优化为 Vercel 风格 + Bento Grid 焦点，便于 AI 生成视觉吸引、高性能的项目。您可以直接使用。如果需要特定页面的扩展提示词或代码片段，请告知！
