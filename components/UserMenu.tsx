import Link from 'next/link';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useSession, signOut } from 'next-auth/react';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated' && !!session?.user;

  const displayName = session?.user?.name || session?.user?.email || 'User';
  const avatar = (session?.user as any)?.picture || '/avatars/default.png';

  return (
    <>
      {!isAuthenticated ? (
        <>
          <Link href={`/auth/signin`} className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href={`/auth/signup`}>
            <Button size="sm">Sign up</Button>
          </Link>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="px-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={avatar} alt={displayName} />
                <AvatarFallback>{(displayName || 'U').slice(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur rounded-md border border-border/50 shadow-md">
            <div className="px-2 py-1.5 text-xs text-muted-foreground">Signed in as {displayName}</div>
            <DropdownMenuItem asChild>
              <Link href={`/profile`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/settings`}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/account/activity`}>Activity</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
