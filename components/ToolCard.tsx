'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Zap } from 'lucide-react';
import { Tool } from '@/types/tool';
import { CATEGORY_ICONS, type PrimaryCategoryKey } from '@/src/constants/category.constant';

function getIconForTool(tool: Tool) {
  const primaryCategory = tool.primaryCategory as PrimaryCategoryKey;
  if (primaryCategory && CATEGORY_ICONS[primaryCategory]) {
    return CATEGORY_ICONS[primaryCategory];
  }
  // 降级处理：如果没有 primaryCategory 或找不到对应图标，使用默认图标
  return Zap;
}

function getIconBgForTool(tool: Tool) {
  const primaryCategory = tool.primaryCategory as PrimaryCategoryKey;
  // 提升亮度（透明度约 20%）的调色板
  const palette = {
    ImageGeneration: '#22d3ee33', // cyan
    TextWriting: '#9333ea33', // violet
    ChatTools: '#9333ea33', // violet
    CodeAssistant: '#f59e0b33', // amber
    VoiceVideo: '#3b82f633', // blue
    DataInsights: '#10b98133', // emerald
    Automation: '#1d4ed833', // indigo
    Others: '#6b72801a' // gray
  };
  if (primaryCategory && palette[primaryCategory]) {
    return palette[primaryCategory];
  }
  // 降级处理：如果没有 primaryCategory 或找不到对应颜色，使用默认颜色
  return '#6b72801a';
}

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = getIconForTool(tool);
  const iconBg = getIconBgForTool(tool);
  return (
    <Card
      onClick={() => window.open(tool.link, '_blank')}
      className="group relative cursor-pointer bg-gradient-to-tr from-[rgba(34,211,238,0.02)] to-[rgba(34,211,238,0.06)] hover:from-[rgba(34,211,238,0.03)] hover:to-[rgba(34,211,238,0.08)] border border-border/30 hover:border-primary transition-all duration-300 ease-out rounded-xl sm:rounded-2xl lg:rounded-[30px] overflow-hidden hover:shadow-lg hover:-translate-y-1"
    >
      <CardHeader className="pb-0 p-3 sm:p-4 lg:p-6">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded-full flex items-center justify-center shadow-sm shrink-0" style={{ backgroundColor: iconBg }}>
            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-foreground/80" />
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <CardTitle className="text-xs sm:text-sm lg:text-base leading-tight mb-0.5">
              <span className="group-hover:text-primary transition-colors duration-300 block truncate" title={tool.name}>
                {tool.name}
              </span>
            </CardTitle>
            <CardDescription className="text-[10px] sm:text-xs lg:text-sm group-hover:text-foreground/80 transition-colors duration-300 truncate">{tool.category}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-2 p-3 sm:p-4 lg:p-6 lg:pt-0 lg:pb-2">
        <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground line-clamp-2 lg:line-clamp-3 mb-2 leading-relaxed">{tool.description}</p>
        <div className="mt-2 sm:mt-3 lg:mt-5 flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded-full text-[8px] sm:text-[9px] lg:text-[10px] px-1 sm:px-1.5 lg:px-2 py-0.5 bg-muted/40 text-muted-foreground/70 hover:bg-muted/60 hover:text-muted-foreground/80 transition-colors"
            >
              #{t}
            </Badge>
          ))}

          {tool.tags.length > 3 && (
            <Badge variant="secondary" className="rounded-full text-[10px] px-2 py-0.5 bg-muted/20 text-muted-foreground/50 border-0">
              +{tool.tags.length - 3}
            </Badge>
          )}
        </div>

        <span className="text-[9px] sm:text-[10px] lg:text-[11px] pt-10 text-muted-foreground group-hover:text-primary transition-colors duration-300 shrink-0 font-medium">
          ★ {tool.rating.toFixed(1)}
        </span>
      </CardContent>
    </Card>
  );
}
