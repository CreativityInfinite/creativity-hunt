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
      className="group relative cursor-pointer bg-gradient-to-tr from-[rgba(34,211,238,0.02)] to-[rgba(34,211,238,0.06)] hover:from-[rgba(34,211,238,0.03)] hover:to-[rgba(34,211,238,0.08)] border border-border/30 hover:border-primary transition-all duration-300 ease-out rounded-2xl sm:rounded-[30px] overflow-hidden"
    >
      <CardHeader className="pb-0 p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: iconBg }}>
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/80" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm sm:text-base">
              <span className="group-hover:text-primary transition-colors duration-300 block truncate">{tool.name}</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm group-hover:text-foreground/80 transition-colors duration-300 line-clamp-1">{tool.category}</CardDescription>
          </div>
          <span className="text-[10px] sm:text-[11px] text-muted-foreground group-hover:text-primary transition-colors duration-300 shrink-0">★ {tool.rating.toFixed(1)}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-2 p-4 sm:p-6 sm:pt-0 sm:pb-2">
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 mb-2">{tool.description}</p>
        <div className="mt-3 sm:mt-5 flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded-full text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 bg-muted/40 text-muted-foreground/70 hover:bg-muted/60 hover:text-muted-foreground/80 transition-colors"
            >
              #{t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
