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

const VineyardActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Operations</DropdownMenuLabel>
                <DropdownMenuItem className="flex items-center gap-1">
                    <TreeDeciduous /> Trimming
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-1">
                    <Scissors /> Cutting grass
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-1">
                    <Shovel /> Explantation
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-1">
                    <FlaskRound /> Treatments
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-1">
                    <Grape /> Harvest
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem className="flex items-center gap-1">
                    <Pencil /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-1 text-destructive">
                    <Scissors /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default VineyardActions;
