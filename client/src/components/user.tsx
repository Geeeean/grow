import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSignOut } from '@/hooks/use-signout';
import { useUser } from '@/hooks/use-user';
import { Loader, LogOut } from 'lucide-react';
import AnimatedButton from './ui/animated-button';
import { Navigate } from '@tanstack/react-router';

const getInitials = (fullName: string) => {
    const splitted = fullName.split(' ');
    let res = '';

    for (let i = 0; i < splitted.length; i++) {
        res += splitted[i][0].toUpperCase();
    }

    return res;
};

export const User = () => {
    const { user, isLoading, error } = useUser();
    const { signOut, isPending, isSuccess, error: signOutError } = useSignOut();

    if (error) {
        return <Navigate to="/signin" search={{ redirect: '/' }} />;
    }

    if (isLoading || !user) return <div className="w-full h-16 bg-muted"></div>;

    return (
        <div className="w-full grid grid-cols-[2.5rem_1fr_auto] ring-1 items-center gap-2 p-2 bg-secondary/20 rounded-lg">
            <Avatar className="rounded-md">
                <AvatarImage src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.email}`} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>

            <div className="truncate">
                <p className="font-medium text-sm line-clamp-1">{user.name}</p>
                <p className="text-primary text-xs line-clamp-1">{user.email}</p>
            </div>

            <AnimatedButton
                disabled={isPending}
                size="icon"
                variant="outline"
                className="border-none text-secondary-foreground p-2 m-0 h-fit w-fit"
                onClick={() => {
                    signOut();
                }}
            >
                {isPending ? <Loader className="animate-spin" /> : <LogOut />}
            </AnimatedButton>
        </div>
    );
};
User.displayName = 'User';
