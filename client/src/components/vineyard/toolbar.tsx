import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { FileOutput, ListFilter, CirclePlus, Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import { View } from '@/types/vineyard';
import { cn } from '@/utils/shared';

type AddProps = {
    setOpen: Dispatch<SetStateAction<boolean>>;
};

type Props = {
    view: View;
    setView: Dispatch<SetStateAction<View>>;
} & AddProps;

export const AddButton = ({ setOpen, className }: AddProps & { className: string }) => {
    return (
        <Button className={cn('font-normal flex items-center gap-2', className)} onClick={() => setOpen(true)}>
            <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
            Add vineyard
        </Button>
    );
};

const VineyardToolbar = ({ setOpen, view, setView }: Props) => {
    return (
        <div className="flex gap-2 flex-col md:flex-row-reverse w-full justify-between items-center">
            <div className="w-full md:w-fit flex gap-2 items-center justify-between self-end">
                <Tabs defaultValue="grid" value={view} onValueChange={(newVal) => setView(newVal as View)}>
                    <TabsList>
                        <TabsTrigger value="grid">Grid</TabsTrigger>
                        <TabsTrigger value="table">Table</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="border-r h-10 hidden md:block" />
                <div className="flex items-center gap-2">
                    <Button disabled variant="outline" className="font-normal flex items-center gap-2">
                        <FileOutput className="h-[1.2rem] w-[1.2rem]" />
                        Export
                    </Button>
                    <Button disabled variant="outline" className="font-normal flex items-center gap-2">
                        <ListFilter className="h-[1.2rem] w-[1.2rem]" />
                        Filter
                    </Button>
                </div>
                <AddButton setOpen={setOpen} className="hidden md:flex" />
            </div>
            <div className="relative flex-1 md:grow-0 w-full">
                <Search className="absolute left-2.5 top-2.5 text-muted-foreground" />
                <Input
                    disabled
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
        </div>
    );
};

export default VineyardToolbar;
