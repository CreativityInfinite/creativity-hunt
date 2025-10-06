import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createLogger } from '@/lib/logger';

const log = createLogger('AuthNextauth');

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
