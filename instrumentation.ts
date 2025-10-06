import { registerCrons, stopCrons } from '@/lib/cron';

export async function register() {
  // 在应用启动时注册所有 cron 任务
  registerCrons();
  setTimeout(() => {
    stopCrons();
  }, 10000);
}
