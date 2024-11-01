import { createFileRoute } from '@tanstack/react-router';
import VineyardsTable from '@/components/vineyards-table';

import { View } from '@/types/vineyard';
import VineyardControls from '@/components/vineyards-controls';
import { useState } from 'react';
import VineyardsGrid from '@/components/vineyards-grid';
import VineyardAdd from '@/components/vineyard-add';
import { useVineyards } from '@/hooks/use-vineyards';

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
            <div className="h-full flex flex-col gap-2">
                <div>
                    <p className="font-medium text-lg">Vineyards</p>
                    <p className="text-muted-foreground text-sm">Manage your vineyards and view their infos.</p>
                </div>
                <VineyardControls setOpen={setOpen} view={view} setView={setView} />

                <div className="flex-1 overflow-y-auto">
                    {vineyards.length > 0 ? (
                        view === 'grid' ? (
                            <VineyardsGrid vineyards={vineyards} />
                        ) : (
                            <VineyardsTable vineyards={vineyards} />
                        )
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <img src={plant} className="h-56 opacity-80" />
                            <p className='text-4xl mt-8 font-medium'>No vineyards currently registered.</p>
                            <p className='text-xl text-muted-foreground'>To manage your operations effectively, consider adding your first vineyard.</p>
                        </div>
                    )}
                </div>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> vineyards
                </div>

                <VineyardAdd open={open} setOpen={setOpen} />
            </div>
        );

    return <p>loading...</p>;
};
