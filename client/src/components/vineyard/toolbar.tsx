import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { FileOutput, ListFilter, CirclePlus, Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import { View } from '@/types/vineyard';
import { useMediaQuery } from '@/hooks/use-media-query';

type AddProps = {
    setOpen: Dispatch<SetStateAction<boolean>>;
};

type Props = {
    view: View;
    setView: Dispatch<SetStateAction<View>>;
} & AddProps;

export const AddButton = ({ setOpen }: AddProps) => {
    return (
        <Button className="font-normal flex items-center gap-1" onClick={() => setOpen(true)}>
            <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
            Add vineyard
        </Button>
    );
};

const VineyardToolbar = ({ setOpen, view, setView }: Props) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <div className="flex gap-2 flex-col md:flex-row-reverse w-full justify-between items-center mt-2 mb-4">
            <div className="w-full md:w-fit flex gap-2 items-center justify-between self-end">
                <Tabs defaultValue="grid" value={view} onValueChange={(newVal) => setView(newVal as View)}>
                    <TabsList>
                        <TabsTrigger value="grid">Grid</TabsTrigger>
                        <TabsTrigger value="table">Table</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="border-r h-10 hidden md:block" />
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="font-normal flex items-center gap-1">
                        <FileOutput className="h-[1.2rem] w-[1.2rem]" />
                        Export
                    </Button>
                    <Button variant="outline" className="font-normal flex items-center gap-1">
                        <ListFilter className="h-[1.2rem] w-[1.2rem]" />
                        Filter
                    </Button>
                </div>
                {isDesktop ? (
                    <AddButton setOpen={setOpen} />
                ) : (
                    <div className="absolute bottom-2 right-4">
                        <AddButton setOpen={setOpen} />
                    </div>
                )}
            </div>
            <div className="relative flex-1 md:grow-0 w-full">
                <Search className="absolute left-2.5 top-2.5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
        </div>
    );
};

export default VineyardToolbar;
