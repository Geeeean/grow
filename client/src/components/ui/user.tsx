import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type UserProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
    main: string;
    sub: string;
    image: string;
    fallback: string;
};

export const User = React.forwardRef<HTMLDivElement, UserProps>(
    ({ className, main, sub, image, fallback, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'w-full grid grid-cols-[2.5rem_1fr] gap-2 p-2 bg-secondary border border-border rounded-lg shadow-sm',
                    className,
                )}
                {...props}
            >
                <Avatar className="rounded-md">
                    <AvatarImage src={image} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>

                <div className="truncate">
                    <p className="font-medium text-sm line-clamp-1">{main}</p>
                    <p className="text-primary text-xs line-clamp-1">{sub}</p>
                </div>
            </div>
        );
    },
);
User.displayName = 'User';
