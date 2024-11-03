import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { View } from '@/types/vineyard';
import { useVineyards } from '@/hooks/use-vineyards';

import VineyardsTable from '@/components/vineyard/table';
import VineyardsGrid from '@/components/vineyard/grid';
import VineyardControls, { AddButton } from '@/components/vineyard/toolbar';
import VineyardAddForm from '@/components/vineyard/add-form';

import plant from '/plant.svg';

export const Route = createFileRoute('/(app)/_layout/vineyards')({
    component: () => <Vineyards />,
});

const Vineyards = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [view, setView] = useState<View>('grid');

    const { vineyards, error } = useVineyards();

    if (error) return <p>error</p>;

    if (vineyards != undefined)
        return (
            <>
                {vineyards.length > 0 ? (
                    <div className="h-full flex flex-col gap-2 md:gap-4">
                        <div>
                            <p className="font-medium text-lg">Vineyards</p>
                            <p className="text-muted-foreground text-sm">Manage your vineyards and view their infos.</p>
                        </div>
                        <VineyardControls setOpen={setOpen} view={view} setView={setView} />

                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                            {view === 'grid' ? (
                                <VineyardsGrid vineyards={vineyards} />
                            ) : (
                                <VineyardsTable vineyards={vineyards} />
                            )}
                        </div>
                        <AddButton setOpen={setOpen} className='flex md:hidden' />
                    </div>
                ) : (
                    <div className="px-2 rounded-lg border-dashed border-2 w-full h-full flex flex-col items-center justify-center bg-background-dark">
                        <img src={plant} className="h-56" />
                        <p className="text-2xl md:text-4xl mt-8 font-medium text-center">
                            No vineyards currently registered.
                        </p>
                        <p className="text-lg md:text-xl text-muted-foreground mt-1 mb-4 text-center">
                            To manage your operations effectively, consider adding your first vineyard.
                        </p>
                        <AddButton setOpen={setOpen} />
                    </div>
                )}
                <VineyardAddForm open={open} setOpen={setOpen} />
            </>
        );

    return <p>loading...</p>;
};
