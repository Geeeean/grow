import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NewVariety, Variety } from '@/types/vineyard';

import { Fragment } from 'react/jsx-runtime';
import { ReactNode } from 'react';

type Props = {
    varieties: Variety[] | NewVariety[];
    children: ReactNode;
};

const VineyardVarietiesTooltip = ({ varieties, children }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent className="z-20 grid grid-cols-[repeat(3,auto)] bg-background-dark border items-start">
                    <p className="font-medium text-primary/70">Variety</p>
                    <p className="font-medium text-primary/70">Age</p>
                    <p className="font-medium text-primary/70">Rows</p>
                    {varieties.map((variety, index: number) => (
                        <Fragment key={index}>
                            <p className="text-primary text-sm mr-6 font-medium">{variety.name}</p>
                            <p className="text-primary text-sm w-10 truncate">{variety.age}</p>
                            <p className="text-primary text-sm w-10 truncate">{variety.rows}</p>
                        </Fragment>
                    ))}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default VineyardVarietiesTooltip;
