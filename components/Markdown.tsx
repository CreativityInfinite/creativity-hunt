'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className }: MarkdownProps) {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // 客户端检测暗色模式
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // 监听主题变化
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // 自定义 ReactMarkdown 组件配置
  const markdownComponents = {
    h1: ({ children, ...props }: any) => (
      <h1 className="text-3xl font-bold text-foreground mt-8 mb-4 first:mt-0" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-xl font-semibold text-foreground mt-5 mb-2" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: any) => (
      <h4 className="text-lg font-medium text-foreground mt-4 mb-2" {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }: any) => (
      <h5 className="text-base font-medium text-foreground mt-3 mb-1" {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }: any) => (
      <h6 className="text-sm font-medium text-foreground mt-3 mb-1" {...props}>
        {children}
      </h6>
    ),
    p: ({ children, ...props }: any) => (
      <p className="text-foreground mb-4 leading-7" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="text-foreground" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground mb-4" {...props}>
        {children}
      </blockquote>
    ),
    a: ({ children, ...props }: any) => (
      <a className="text-primary underline hover:text-primary/80" {...props}>
        {children}
      </a>
    ),
    strong: ({ children, ...props }: any) => (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }: any) => (
      <em className="italic text-foreground" {...props}>
        {children}
      </em>
    ),
    hr: ({ ...props }: any) => <hr className="border-border my-8" {...props} />,
    table: ({ children, ...props }: any) => (
      <table className="w-full border-collapse border border-border mb-4" {...props}>
        {children}
      </table>
    ),
    th: ({ children, ...props }: any) => (
      <th className="border border-border px-4 py-2 bg-muted font-semibold text-left" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="border border-border px-4 py-2" {...props}>
        {children}
      </td>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      return !inline && language ? (
        <SyntaxHighlighter style={isDark ? oneDark : oneLight} language={language} PreTag="div" className="rounded-lg mb-4" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }: any) => (
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props}>
        {children}
      </pre>
    )
  };

  return (
    <div className={cn('text-foreground max-w-none', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
