'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@component/ui/card';
import { Button } from '@component/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@component/ui/avatar';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const locale = searchParams.get('lang') || 'zh-CN';
  const { data: session } = useSession();
  const user = session?.user;
  const displayName = user?.name || 'Username';
  const displayEmail = user?.email || 'you@example.com';
  const displayImage = (user as any)?.picture || (user as any)?.image || '/avatars/default.png';

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('debug_user', JSON.stringify(user));
      } catch {}
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-56px)] w-full flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl border-border/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={displayImage} alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Your profile</CardTitle>
            <CardDescription>Manage your personal information and preferences.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Name</div>
              <div className="text-sm font-medium">{displayName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="text-sm font-medium">{displayEmail}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Provider</div>
              <div className="text-sm font-medium">{(session as any)?.provider || 'google'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Locale</div>
              <div className="text-sm font-medium">{locale}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Debug session</div>
            <pre className="rounded-md border border-border/60 bg-muted/30 p-3 text-xs overflow-auto max-h-80">{JSON.stringify(session, null, 2)}</pre>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/settings?lang=${locale}`}>
              <Button variant="secondary" size="sm">
                Settings
              </Button>
            </Link>
            <Link href={`/account/activity?lang=${locale}`}>
              <Button variant="ghost" size="sm">
                Activity
              </Button>
            </Link>
            <Link href={`/auth/signout?lang=${locale}`}>
              <Button size="sm">Sign out</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
