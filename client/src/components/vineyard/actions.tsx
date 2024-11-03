import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import VineyardTrimAddForm from './trim-add-form';
import { VineyardId } from '@/types/vineyard';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { vineyardAction, vineyardActionStr } from '@/types/vineyard';
import { action, actionStr } from '@/types/shared';
import { actionCopy, getActionIcon } from '@/utils/shared';
import { vineyardActionCopy, getVineyardActionIcon } from '@/utils/vineyard';
import VineyardCutAddForm from './cut-add-form';

type Props = {
    vineyardId: VineyardId;
};

const VineyardActions = ({ vineyardId }: Props) => {
    const [isTrimmingOpen, setTrimmingOpen] = useState<boolean>(false);
    const [isCuttingGrassOpen, setCuttingGrassOpen] = useState<boolean>(false);
    const [isExplantationOpen, setExplantationOpen] = useState<boolean>(false);
    const [isTreatmentOpen, setTreatmentOpen] = useState<boolean>(false);
    const [isHarvestOpen, setHarvestOpen] = useState<boolean>(false);
    const [isEditOpen, setEditOpen] = useState<boolean>(false);
    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);

    const getOpenStateProps = useCallback(
        (action: vineyardAction | action): [boolean, Dispatch<SetStateAction<boolean>>] => {
            switch (action) {
                case 'trimming':
                    return [isTrimmingOpen, setTrimmingOpen];
                case 'cutting':
                    return [isCuttingGrassOpen, setCuttingGrassOpen];
                case 'explantation':
                    return [isExplantationOpen, setExplantationOpen];
                case 'treatment':
                    return [isTreatmentOpen, setTreatmentOpen];
                case 'harvest':
                    return [isHarvestOpen, setHarvestOpen];
                case 'edit':
                    return [isEditOpen, setEditOpen];
                case 'delete':
                    return [isDeleteOpen, setDeleteOpen];
                default:
                    return [false, () => {}];
            }
        },
        [
            isTrimmingOpen,
            isCuttingGrassOpen,
            isExplantationOpen,
            isTreatmentOpen,
            isHarvestOpen,
            isEditOpen,
            isDeleteOpen,
        ],
    );

    return (
        <>
            <VineyardTrimAddForm vineyardId={vineyardId} open={isTrimmingOpen} setOpen={setTrimmingOpen} />
            <VineyardCutAddForm vineyardId={vineyardId} open={isCuttingGrassOpen} setOpen={setCuttingGrassOpen} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="z-20" aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-20">
                    <DropdownMenuLabel>Operations</DropdownMenuLabel>
                    {vineyardActionStr.map((action: vineyardAction, index: number) => {
                        const [, setOpen] = getOpenStateProps(action);

                        return (
                            <DropdownMenuItem
                                className="flex items-center gap-1"
                                key={index}
                                onClick={() => setOpen(true)}
                            >
                                {getVineyardActionIcon(action)}
                                {vineyardActionCopy[action]}
                            </DropdownMenuItem>
                        );
                    })}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {actionStr.map((action: action, index) => {
                        const [, setOpen] = getOpenStateProps(action);

                        return (
                            <DropdownMenuItem
                                className="flex items-center gap-1"
                                key={index}
                                onClick={() => setOpen(true)}
                            >
                                {getActionIcon(action)}
                                {actionCopy[action]}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default VineyardActions;
