import * as React from 'react';

import { cn } from '@/utils/shared';

const DetailCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'p-1 rounded-md border bg-background-dark dark:bg-card text-card-foreground shadow flex flex-col',
                className,
            )}
            {...props}
        />
    ),
);
DetailCard.displayName = 'DetailCard';

const DetailCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('py-3 mx-2 flex flex-row justify-between items-center', className)} {...props} />
    ),
);
DetailCardHeader.displayName = 'DetailCardHeader';

const DetailCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3 ref={ref} className={cn('font-medium leading-none tracking-tight', className)} {...props} />
    ),
);
DetailCardTitle.displayName = 'DetailCardTitle';

const DetailCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                'bg-secondary/20 dark:bg-secondary/50 p-2 rounded-sm ring-1 ring-secondary dark:ring-primary/35 ',
                className,
            )}
            {...props}
        />
    ),
);
DetailCardContent.displayName = 'DetailCardContent';

const DetailCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center mx-2', className)} {...props} />,
);
DetailCardFooter.displayName = 'DetailCardFooter';

export { DetailCard, DetailCardHeader, DetailCardFooter, DetailCardTitle, DetailCardContent };
