import React from 'react';
import { cn } from '@/lib/utils';

type GradientBackgroundProps = {
  className?: string;
};

export function GradientBackground({ className }: GradientBackgroundProps) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0', className)}>
      {/* 基础双径向渐变 */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_70%_-10%,rgba(34,211,238,0.12),transparent_70%),radial-gradient(60%_60%_at_0%_100%,rgba(147,51,234,0.12),transparent_60%)]" />

      {/* 细网格线叠加 */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 40px)'
        }}
      />

      {/* 底部向上渐变遮罩，减弱边缘对比 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  );
}

export default GradientBackground;
