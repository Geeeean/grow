import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { View } from '@/types/vineyard';
import { useVineyards } from '@/hooks/use-vineyards';

import VineyardsTable from '@/components/vineyard/table';
import VineyardsGrid from '@/components/vineyard/grid';
import VineyardControls, { AddButton } from '@/components/vineyard/toolbar';
import VineyardAdd from '@/components/vineyard/add';

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
            <div
                className={
                    vineyards.length > 0
                        ? 'h-full flex flex-col gap-2'
                        : 'w-full h-full flex flex-col items-center justify-center'
                }
            >
                {vineyards.length > 0 ? (
                    <>
                        <div>
                            <p className="font-medium text-lg">Vineyards</p>
                            <p className="text-muted-foreground text-sm">Manage your vineyards and view their infos.</p>
                        </div>
                        <VineyardControls setOpen={setOpen} view={view} setView={setView} />

                        <div className="flex-1 overflow-y-auto">
                            {view === 'grid' ? (
                                <VineyardsGrid vineyards={vineyards} />
                            ) : (
                                <VineyardsTable vineyards={vineyards} />
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <img src={plant} className="h-56" />
                        <p className="text-4xl mt-8 font-medium">No vineyards currently registered.</p>
                        <p className="text-xl text-muted-foreground mt-1 mb-4">
                            To manage your operations effectively, consider adding your first vineyard.
                        </p>
                        <AddButton setOpen={setOpen} />
                    </>
                )}
                <VineyardAdd open={open} setOpen={setOpen} />
            </div>
        );

    return <p>loading...</p>;
};
