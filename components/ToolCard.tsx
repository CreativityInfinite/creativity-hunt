'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Bot, Code, Image as ImageIcon, Mic, FileText, Zap } from 'lucide-react';
import { Tool } from '@/types/tool';

function getIconForTool(tool: Tool) {
  const name = tool.name?.toLowerCase?.() || '';
  const cat = tool.category?.toLowerCase?.() || '';
  if (cat.includes('图像') || cat.includes('image') || name.includes('image')) return ImageIcon;
  if (cat.includes('语音') || cat.includes('voice') || cat.includes('speech') || name.includes('voice')) return Mic;
  if (cat.includes('代码') || cat.includes('code') || cat.includes('开发') || name.includes('code')) return Code;
  if (cat.includes('文档') || cat.includes('text') || cat.includes('写作') || name.includes('doc')) return FileText;
  if (cat.includes('chat') || cat.includes('对话') || name.includes('chat')) return Bot;
  return Zap;
}

function getIconBgForTool(tool: Tool) {
  const name = tool.name?.toLowerCase?.() || '';
  const cat = tool.category?.toLowerCase?.() || '';
  // 提升亮度（透明度约 20%）
  const palette = {
    indigo: '#1d4ed833',
    violet: '#9333ea33',
    cyan: '#22d3ee33',
    amber: '#f59e0b33',
    red: '#ef444433',
    emerald: '#10b98133',
    blue: '#3b82f633'
  };
  if (cat.includes('图像') || cat.includes('image') || name.includes('image')) return palette.cyan;
  if (cat.includes('语音') || cat.includes('voice') || cat.includes('speech') || name.includes('voice')) return palette.blue;
  if (cat.includes('代码') || cat.includes('code') || cat.includes('开发') || name.includes('code')) return palette.amber;
  if (cat.includes('文档') || cat.includes('text') || cat.includes('写作') || name.includes('doc')) return palette.emerald;
  if (cat.includes('chat') || cat.includes('对话') || name.includes('chat')) return palette.violet;
  return palette.indigo;
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
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: iconBg }}>
            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-foreground/80" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xs sm:text-sm lg:text-base leading-tight">
              <span className="group-hover:text-primary transition-colors duration-300 block truncate">{tool.name}</span>
            </CardTitle>
            <CardDescription className="text-[10px] sm:text-xs lg:text-sm group-hover:text-foreground/80 transition-colors duration-300 line-clamp-1 mt-0.5">{tool.category}</CardDescription>
          </div>
          <span className="text-[9px] sm:text-[10px] lg:text-[11px] text-muted-foreground group-hover:text-primary transition-colors duration-300 shrink-0 font-medium">
            ★ {tool.rating.toFixed(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-2 p-3 sm:p-4 lg:p-6 lg:pt-0 lg:pb-2">
        <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground line-clamp-2 lg:line-clamp-3 mb-2 leading-relaxed">{tool.description}</p>
        <div className="mt-2 sm:mt-3 lg:mt-5 flex flex-wrap gap-1">
          {tool.tags.slice(0, 2).map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded-full text-[8px] sm:text-[9px] lg:text-[10px] px-1 sm:px-1.5 lg:px-2 py-0.5 bg-muted/40 text-muted-foreground/70 hover:bg-muted/60 hover:text-muted-foreground/80 transition-colors"
            >
              #{t}
            </Badge>
          ))}
          {tool.tags.length > 2 && (
            <Badge variant="secondary" className="rounded-full text-[8px] sm:text-[9px] lg:text-[10px] px-1 sm:px-1.5 lg:px-2 py-0.5 bg-muted/20 text-muted-foreground/50">
              +{tool.tags.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
