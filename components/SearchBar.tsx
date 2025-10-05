'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Search, ArrowRight, Sparkles } from 'lucide-react';

import { motion } from 'framer-motion';
const searchSuggestions = ['生成产品海报的 AI', '视频剪辑工具', '代码自动补全', '语音转文字', '图片背景移除', 'PPT 自动生成'];

export function SearchBar({ placeholder, compact = false, showButton = true }: { placeholder: string; compact?: boolean; showButton?: boolean }) {
  const router = useRouter();
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  const submit = (q: string) => {
    const query = q.trim();
    if (!query) return;
    setLoading(true);
    setShowSuggestions(false);
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    setShowSuggestions(v.length > 0);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {}, 300);
  };

  const filteredSuggestions = searchSuggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase())).slice(0, 4);

  return (
    <div className={compact ? 'flex items-center gap-2' : 'flex w-full max-w-3xl items-center gap-3'}>
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit(value);
            if (e.key === 'Escape') setShowSuggestions(false);
          }}
          onFocus={() => {
            if (value.length > 0) setShowSuggestions(true);
            setFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
            setTimeout(() => setFocused(false), 150);
          }}
          className="pl-12 pr-12 h-16 text-lg rounded-xl bg-background/80 backdrop-blur border border-border/50 focus:ring-2 focus:ring-ring focus:border-ring/50 transition-all"
        />
        <motion.div
          className="absolute right-12 top-1/2 -translate-y-1/2"
          animate={focused ? { rotate: [0, 18, -18, 0], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
          transition={{ duration: 1.2, repeat: focused ? Infinity : 0, ease: 'easeInOut' }}
        >
          <Sparkles className="h-5 w-5 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.55)]" />
        </motion.div>
        {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />}

        {/* 搜索建议 */}
        {showSuggestions && (value.length > 0 || filteredSuggestions.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-tr from-[rgba(34,211,238,0.02)] to-[rgba(34,211,238,0.06)] backdrop-blur border border-border/50 rounded-xl shadow-lg overflow-hidden z-10">
            {value.length > 0 && (
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => submit(value)}>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  搜索 &ldquo;<span className="font-medium">{value}</span>&rdquo;
                </span>
              </div>
            )}

            {filteredSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => submit(suggestion)}>
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">猜你想搜</span>
                <span className="text-sm font-medium">{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {showButton && (
        <Button onClick={() => submit(value)} className="h-16 px-8 text-lg rounded-xl">
          <Search className="mr-2 h-5 w-5" />
          搜索
        </Button>
      )}
    </div>
  );
}
