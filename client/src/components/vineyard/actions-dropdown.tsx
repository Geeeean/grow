import { MoreHorizontal, Settings2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { VineyardId } from '@/types/vineyard';
import { vineyardAction, vineyardActionStr } from '@/types/vineyard';
import { action, actionStr } from '@/types/shared';
import { actionCopy, cn, getActionIcon } from '@/utils/shared';
import { vineyardActionCopy, getVineyardActionIcon } from '@/utils/vineyard';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    vineyardId: VineyardId;
    setSelectedVineyard?: Dispatch<SetStateAction<VineyardId>>;
    getVineyardActionSetter: (action: vineyardAction) => React.Dispatch<React.SetStateAction<boolean>>;
    getActionSetter: (action: action) => Dispatch<SetStateAction<boolean>>;
    primary?: boolean;
    className?: string;
};

const VineyardActionsDropdown = ({
    vineyardId,
    setSelectedVineyard,
    getVineyardActionSetter,
    getActionSetter,
    primary = false,
    className = '',
}: Props) => {
    return (
        <DropdownMenu onOpenChange={(open) => open && setSelectedVineyard && setSelectedVineyard(vineyardId)}>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-haspopup="true"
                    size={primary ? 'default' : 'icon'}
                    variant={primary ? 'default' : 'ghost'}
                    className={cn('z-20 flex items-center gap-2', className)}
                >
                    {primary ? (
                        <>
                            <Settings2 /> Operate
                        </>
                    ) : (
                        <MoreHorizontal />
                    )}
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-20">
                <DropdownMenuLabel>Operations</DropdownMenuLabel>
                {vineyardActionStr.map((action: vineyardAction, index: number) => {
                    const setter = getVineyardActionSetter(action);

                    return (
                        <DropdownMenuItem
                            className="flex items-center gap-8 justify-between"
                            key={index}
                            onClick={() => setter(true)}
                        >
                            {vineyardActionCopy[action]}
                            {getVineyardActionIcon(action, 'text-muted-foreground')}
                        </DropdownMenuItem>
                    );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {actionStr.map((action: action, index) => {
                    const setter = getActionSetter(action);

                    return (
                        <DropdownMenuItem
                            className="flex items-center gap-8 justify-between"
                            key={index}
                            onClick={() => setter(true)}
                        >
                            {actionCopy[action]}
                            {getActionIcon(action, 'text-muted-foreground')}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default VineyardActionsDropdown;
