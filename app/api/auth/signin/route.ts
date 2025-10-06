import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { R } from '@util/R';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({} as any));
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password) return R.error(undefined, 'Email and password are required');

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return R.error(undefined, 'Invalid email or password');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return R.error(undefined, 'Invalid email or password');

    return R.ok({ id: user.id, email: user.email, name: user.name });
  } catch (err: any) {
    return R.error(undefined, err);
  }
}
