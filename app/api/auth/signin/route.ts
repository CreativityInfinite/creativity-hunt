import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { R } from '@/lib/R';
import { createLogger } from '@/lib/logger';

const log = createLogger('AuthSignin');

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({} as any));
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!email || !password) return R.error(undefined, 'Email and password are required');
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return R.error(undefined, 'Invalid email or password');
    const valid = user.passwordHash ? await bcrypt.compare(password, user.passwordHash) : false;
    if (!valid) return R.error(undefined, 'Invalid email or password');
    return R.ok({ id: user.id, email: user.email, name: user.name });
  } catch (err: any) {
    log.error('Signin error', err);
    return R.error(undefined, err);
  }
}

export async function GET(request: Request) {
  const u = new URL(request.url);
  const isCancel = u.searchParams.get('error') === 'Callback';
  if (isCancel) {
    const home = new URL('/auth/signin', request.url);
    return Response.redirect(home, 302);
  }
  return new Response(null, { status: 204 });
}
