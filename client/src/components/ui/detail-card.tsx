import * as React from 'react';

import { cn } from '@/utils/shared';

import { cva, type VariantProps } from 'class-variance-authority';

const detailCardContentVariant = cva('h-full bg-muted/45 dark:bg-muted/50 p-2 rounded-sm', {
    variants: {
        variant: {
            default: 'p-2 ring-1 ring-primary/15 dark:ring-primary/35',
            empty: 'py-5 border border-dashed border-primary/15 dark:border-primary/35 flex flex-col items-center text-center justify-center gap-3',
        },
        size: {
            default: '',
            sm: 'p-0 md:p-2 lg:p-3',
            lg: 'p-3 md:p-6 lg:p-9',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

const DetailCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { open?: boolean; setOpen?: React.Dispatch<React.SetStateAction<boolean>> }
>(({ className, open, setOpen, ...props }, ref) => (
    <>
        <div
            ref={ref}
            className={cn(
                'relative p-1 rounded-md border bg-background-dark dark:bg-card text-card-foreground shadow flex flex-col',
                className,
            )}
            {...props}
        />
        {open && setOpen && (
            <div className="w-svw h-svh absolute z-30 top-0 left-0 p-4 md:p-8 flex justify-center items-center">
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                />
                <div
                    ref={ref}
                    className={cn(
                        'p-1 rounded-md border bg-background-dark dark:bg-card text-card-foreground shadow flex flex-col',
                        className,
                        'w-full h-full z-50 max-h-none',
                    )}
                    {...props}
                />
            </div>
        )}
    </>
));
DetailCard.displayName = 'DetailCard';

const DetailCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('pt-1 pb-2 mx-2 mr-0 flex flex-row justify-between items-center', className)}
            {...props}
        />
    ),
);
DetailCardHeader.displayName = 'DetailCardHeader';

const DetailCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn('font-medium line-clamp-1 flex gap-2 items-center', className)}
            {...props}
        />
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
