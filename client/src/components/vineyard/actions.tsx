import { FlaskRound, Grape, MoreHorizontal, Pencil, Scissors, Shovel, TreeDeciduous } from 'lucide-react';
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

const operationStr = ['trimming', 'cutting_grass', 'explantation', 'treatmenst', 'harvest'] as const;
type operation = (typeof operationStr)[number];

const actionStr = ['edit', 'delete'] as const;
type action = (typeof actionStr)[number];

type Props = {
    vineyardId: VineyardId;
};

const getContent = (
    action: action | operation,
    vineyardId: VineyardId,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
) => {
    switch (action) {
        case 'trimming':
            return (
                <>
                    <TreeDeciduous /> Trimming
                </>
            );
        case 'cutting_grass':
            return (
                <>
                    <Scissors /> Cutting grass
                </>
            );
        case 'explantation':
            return (
                <>
                    <Shovel /> Explantation
                </>
            );
        case 'treatmenst':
            return (
                <>
                    <FlaskRound /> Treatments
                </>
            );
        case 'harvest':
            return (
                <>
                    <Grape /> Harvest
                </>
            );
        case 'edit':
            return (
                <>
                    <Pencil /> Edit
                </>
            );
        case 'delete':
            return (
                <>
                    <Scissors /> Delete
                </>
            );
    }
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
        (action: operation | action): [boolean, Dispatch<SetStateAction<boolean>>] => {
            switch (action) {
                case 'trimming':
                    return [isTrimmingOpen, setTrimmingOpen];
                case 'cutting_grass':
                    return [isCuttingGrassOpen, setCuttingGrassOpen];
                case 'explantation':
                    return [isExplantationOpen, setExplantationOpen];
                case 'treatmenst':
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="z-20" aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-20">
                    <DropdownMenuLabel>Operations</DropdownMenuLabel>
                    {operationStr.map((operation: operation, index) => {
                        const [open, setOpen] = getOpenStateProps(operation);

                        return (
                            <DropdownMenuItem
                                className="flex items-center gap-1"
                                key={index}
                                onClick={() => setOpen(true)}
                            >
                                {getContent(operation, vineyardId, open, setOpen)}
                            </DropdownMenuItem>
                        );
                    })}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {actionStr.map((action: action, index) => {
                        const [open, setOpen] = getOpenStateProps(action);

                        return (
                            <DropdownMenuItem className="flex items-center gap-1" key={index}>
                                {getContent(action, vineyardId, open, setOpen)}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default VineyardActions;
