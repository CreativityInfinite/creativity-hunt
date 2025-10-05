'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 当滚动超过视口高度时显示按钮
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // 通知 ScrollTrigger 进入程序化滚动阶段，防止误触发向下自动滚动
    window.dispatchEvent(new CustomEvent('backToTop:start'));

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // 监听滚动直到到达顶部后结束抑制；同时设置超时兜底
    const watcher = () => {
      if (window.scrollY === 0) {
        window.dispatchEvent(new CustomEvent('backToTop:end'));
        window.removeEventListener('scroll', watcher);
      }
    };
    window.addEventListener('scroll', watcher, { passive: true });

    // 兜底计时器，避免因浏览器特殊情况未触发到 0
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('backToTop:end'));
      window.removeEventListener('scroll', watcher);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, -20, 0] }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ y: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' } }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-12 w-12 rounded-full border border-border/50 bg-[rgba(34,211,238,0.06)] backdrop-blur text-foreground shadow-md hover:shadow-lg"
            aria-label="回到顶部"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
