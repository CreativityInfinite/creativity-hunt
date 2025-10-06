import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { R } from '@util/R';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({} as any));
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!email || !password) return R.error(undefined, 'Email and password are required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return R.error(undefined, 'Invalid email format');
    if (!name) return R.error(undefined, 'Name is required');
    if (name.length < 2) return R.error(undefined, 'Name must be at least 2 characters');
    if (password.length < 6) return R.error(undefined, 'Password must be at least 6 characters');
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return R.error(undefined, 'Email is already in use');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name: name || null, email, passwordHash } });
    return R.ok(user);
  } catch (err: any) {
    return R.error(undefined, err);
  }
}
