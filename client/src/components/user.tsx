import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/hooks/useUser';

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

    if (error || isLoading) return <div className="w-full h-16 bg-muted"></div>;

    return (
        <div className="w-full grid grid-cols-[2.5rem_1fr] gap-2 p-2 bg-secondary border border-border rounded-lg shadow-sm">
            <Avatar className="rounded-full">
                <AvatarImage src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${user.email}`} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>

            <div className="truncate">
                <p className="font-medium text-sm line-clamp-1">{user.name}</p>
                <p className="text-primary text-xs line-clamp-1">{user.email}</p>
            </div>
        </div>
    );
};
User.displayName = 'User'
