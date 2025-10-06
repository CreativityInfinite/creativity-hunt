import { NextResponse } from 'next/server';
import { createLogger } from '@/lib/logger';

const log = createLogger('LogTest');

export async function GET() {
  log.error('Log test endpoint hit', { at: Date.now() });
  try {
    throw new Error('Test error');
  } catch (err: any) {
    log.error('Signin error', err);
  }
  return NextResponse.json({ ok: true, message: 'logged' });
}
