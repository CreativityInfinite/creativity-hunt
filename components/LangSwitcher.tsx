'use client';

import { Languages } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const locales = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en', label: 'English' }
];

export function LangSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const onSelect = (code: string) => {
    // 替换路径中的 locale 段
    const parts = pathname.split('/');
    parts[1] = code;
    router.push(parts.join('/') || '/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Language">
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32 bg-background/95 backdrop-blur rounded-md border border-border/50 shadow-md">
        {locales.map((l) => (
          <DropdownMenuItem key={l.code} onClick={() => onSelect(l.code)} className={l.code === locale ? 'opacity-70' : ''}>
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
