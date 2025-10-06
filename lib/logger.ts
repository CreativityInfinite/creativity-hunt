import fs from 'fs';
import path from 'path';
import winston, { format, transports } from 'winston';

const isServer = typeof window === 'undefined';
const isProduction = process.env.NODE_ENV === 'production';

// logs 目录
const logsDir = path.join(process.cwd(), 'logs');
if (isServer) {
  try {
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
  } catch {
    // ignore fs errors in serverless/readonly envs
  }
}

const LOG_LEVEL = process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'); // 环境配置
const MAX_SIZE = process.env.LOG_MAX_SIZE ? parseInt(process.env.LOG_MAX_SIZE, 10) : 5 * 1024 * 1024; // 默认 5MB
const MAX_FILES = process.env.LOG_MAX_FILES ? parseInt(process.env.LOG_MAX_FILES, 10) : 5; // 默认保留 5 个拆分文件

// 抽取公共标准化：时间戳/级别/消息/label/stack 保留，其余汇总到 extras，避免重复输出
const normalizeFormat = format((info) => {
  const { timestamp, level, message, label, stack, ...rest } = info as any;
  (info as any).timestamp = timestamp;
  (info as any).level = level;
  (info as any).message = message;
  (info as any).label = label;
  (info as any).stack = stack;
  (info as any).extras = Object.keys(rest).length ? rest : undefined;
  Object.keys(rest).forEach((k) => delete (info as any)[k]);
  return info;
})();

// NestJS 风格输出（无色）
const baseFormat = (label?: string) =>
  format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.errors({ stack: true }),
    format.splat(),
    normalizeFormat,
    format.printf((info) => {
      const ts = (info as any).timestamp as string | undefined;
      const lvl = ((info as any).level as string | undefined)?.toUpperCase() || 'INFO';
      const msg = (info as any).message as string | undefined;
      const ilabel = (info as any).label as string | undefined;
      const extras = (info as any).extras as Record<string, unknown> | undefined;
      const stack = (info as any).stack as string | undefined;

      const pid = process.pid;
      const appTag = '[App]';
      const ctx = label || ilabel;
      const levelPadded = padLevel(lvl);
      const left = `${appTag} ${pid} - ${ts}`;
      const right = `${levelPadded} ${ctx ? `[${ctx}] ` : ''}${msg ?? ''}`;
      const metaStr = extras && Object.keys(extras).length ? ' ' + JSON.stringify(extras) : '';
      const stackStr = stack ? `\n${stack}` : '';
      return `${left}  ${right}${metaStr}${stackStr}`;
    })
  );

const color = {
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  blue: (s: string) => `\x1b[34m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  magenta: (s: string) => `\x1b[35m${s}\x1b[0m`
};

function padLevel(lvl: string) {
  return (lvl + '     ').slice(0, 5); // 对齐到5字符：INFO/WARN/ERROR/DEBUG
}

function colorLevel(lvl: string) {
  const padded = padLevel(lvl);
  return lvl === 'ERROR' ? color.red(padded) : lvl === 'WARN' ? color.yellow(padded) : lvl === 'DEBUG' ? color.magenta(padded) : color.green(padded);
}

// 控制台彩色输出（分段着色：时间灰、级别按级别颜色、上下文蓝、额外数据灰、堆栈红）
const consoleFormat = (ctxLabel?: string) =>
  format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.errors({ stack: true }),
    format.splat(),
    normalizeFormat,
    format.printf((info) => {
      const ts = (info as any).timestamp as string | undefined;
      const lvl = ((info as any).level as string | undefined)?.toUpperCase() || 'INFO';
      const msg = (info as any).message as string | undefined;
      const ilabel = (info as any).label as string | undefined;
      const extras = (info as any).extras as Record<string, unknown> | undefined;
      const stack = (info as any).stack as string | undefined;

      const pid = process.pid;
      const appTag = color.cyan('[App]');
      const left = `${appTag} ${color.dim(String(pid))} - ${color.gray(ts || '')}`;

      const levelColored = colorLevel(lvl);
      const ctx = ctxLabel || ilabel;
      const ctxStr = ctx ? ` ${color.blue('[' + ctx + ']')}` : '';
      const msgStr = msg ? ` ${msg}` : '';
      const extrasStr = extras && Object.keys(extras).length ? ' ' + color.dim(JSON.stringify(extras)) : '';
      const stackStr = stack ? `\n${color.red(stack)}` : '';

      return `${left}  ${levelColored}${ctxStr}${msgStr}${extrasStr}${stackStr}`;
    })
  );

export type Logger = winston.Logger;

// 创建带标题的 Logger 实例
export function createLogger(title?: string): Logger {
  // 浏览器端：仅 console 输出，避免 fs 依赖
  if (!isServer) {
    return winston.createLogger({
      level: LOG_LEVEL,
      format: format.combine(),
      transports: [new transports.Console({ format: consoleFormat(title) })]
    });
  }

  return winston.createLogger({
    level: LOG_LEVEL,
    format: baseFormat(title),
    transports: [
      // 控制台输出（彩色）
      new transports.Console({ format: consoleFormat(title) }),
      // 文件输出（滚动：按大小拆分，保留 MAX_FILES 个）
      new transports.File({
        filename: path.join(logsDir, 'app.log'),
        maxsize: MAX_SIZE,
        maxFiles: MAX_FILES,
        tailable: true
      }),
      // 错误单独文件
      new transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        maxsize: MAX_SIZE,
        maxFiles: MAX_FILES,
        tailable: true
      })
    ],
    exitOnError: false
  });
}

// 默认应用级 Logger
export const logger = createLogger('App');
