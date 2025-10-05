import Link from 'next/link';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

export default function UserMenu({ base, isAuthenticated }: { base: string; isAuthenticated: boolean }) {
  return (
    <>
      {!isAuthenticated ? (
        <>
          <Link href={`${base}/auth/signin`} className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href={`${base}/auth/signup`}>
            <Button size="sm">Sign up</Button>
          </Link>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="px-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/avatars/default.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur rounded-md border border-border/50 shadow-md">
            <div className="px-2 py-1.5 text-xs text-muted-foreground">Signed in as username</div>
            <DropdownMenuItem asChild>
              <Link href={`${base}/profile`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`${base}/settings`}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`${base}/account/activity`}>Activity</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`${base}/auth/signout`}>Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
