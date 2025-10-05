'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function ProfilePage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <div className="min-h-[calc(100vh-56px)] w-full flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl border-border/60 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/avatars/default.png" alt="User" />
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
              <div className="text-sm font-medium">Username</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="text-sm font-medium">you@example.com</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/${locale}/settings`}>
              <Button variant="secondary" size="sm">
                Settings
              </Button>
            </Link>
            <Link href={`/${locale}/account/activity`}>
              <Button variant="ghost" size="sm">
                Activity
              </Button>
            </Link>
            <Link href={`/${locale}/auth/signout`}>
              <Button size="sm">Sign out</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
