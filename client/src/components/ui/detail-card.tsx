import * as React from 'react';

import { cn } from '@/utils/shared';

import { cva, type VariantProps } from 'class-variance-authority';

const detailCardContentVariant = cva('h-full bg-secondary/20 dark:bg-secondary/50 p-2 rounded-sm', {
    variants: {
        variant: {
            default: 'ring-1 ring-secondary dark:ring-primary/35',
            empty: 'border border-dashed border-secondary dark:border-primary/35 flex flex-col items-center text-center justify-center gap-3',
        },
        size: {
            default: 'p-2',
            sm: 'p-0 md:p-2 lg:p-3',
            lg: 'p-3 md:p-6 lg:p-9',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

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
        <div ref={ref} className={cn('pt-1 pb-2 mx-2 mr-0 flex flex-row justify-between items-center', className)} {...props} />
    ),
);
DetailCardHeader.displayName = 'DetailCardHeader';

const DetailCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3 ref={ref} className={cn('font-medium leading-none tracking-tight flex gap-2 items-center', className)} {...props} />
    ),
);
DetailCardTitle.displayName = 'DetailCardTitle';

interface DetailCardContentProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof detailCardContentVariant> {}

const DetailCardContent = React.forwardRef<HTMLDivElement, DetailCardContentProps>(
    ({ className, variant, size, ...props }, ref) => (
        <div ref={ref} className={cn(detailCardContentVariant({ variant, size, className }))} {...props} />
    ),
);
DetailCardContent.displayName = 'DetailCardContent';

const DetailCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center mx-2', className)} {...props} />,
);
DetailCardFooter.displayName = 'DetailCardFooter';

export { DetailCard, DetailCardHeader, DetailCardFooter, DetailCardTitle, DetailCardContent };
