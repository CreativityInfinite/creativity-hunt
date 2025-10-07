export const runtime = 'nodejs';

export async function register() {
  const isNode = typeof process !== 'undefined' && !!(process as any).versions?.node;
  if (!isNode) return;

  const { registerCrons, stopCrons } = await import('@/lib/cron');

  // 在应用启动时注册所有 cron 任务
  registerCrons();
  setTimeout(async () => {
    stopCrons();
  }, 10000);
}
