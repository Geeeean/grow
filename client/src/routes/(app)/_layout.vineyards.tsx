import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { View, VineyardId } from '@/types/vineyard';
import { useVineyards } from '@/hooks/use-vineyards';

import VineyardsTable from '@/components/vineyard/table';
import VineyardsGrid from '@/components/vineyard/grid';
import VineyardControls, { AddButton } from '@/components/vineyard/toolbar';
import NewVineyardForm from '@/components/vineyard/new-form';
import NewVineyardTrimForm from '@/components/vineyard/new-trim-form';
import NewVineyardCutForm from '@/components/vineyard/new-cut-form';

import plant from '/plant.svg';
import { useVineyardAction } from '@/hooks/use-vineyard-action';
import { useSharedAction } from '@/hooks/use-shared-action';
import NewVineyardPlantingForm from '@/components/vineyard/new-planting-form';

export const Route = createFileRoute('/(app)/_layout/vineyards')({
    component: () => <Vineyards />,
});

const Vineyards = () => {
    const [addOpen, setAddOpen] = useState<boolean>(false);
    const [view, setView] = useState<View>('grid');
    const { getVineyardActionState, getVineyardActionSetter } = useVineyardAction();
    const { getActionSetter } = useSharedAction();

    const [selectedVineyard, setSelectedVineyard] = useState<VineyardId>(0);

    const { vineyards, error } = useVineyards();

    if (error) return <p>error</p>;

    if (vineyards != undefined)
        return (
            <main className="p-4 overflow-hidden grow">
                {vineyards.length > 0 ? (
                    <div className="h-full flex flex-col gap-2 md:gap-4">
                        <div>
                            <p className="font-medium text-lg">Vineyards</p>
                            <p className="text-muted-foreground text-sm">Manage your vineyards and view their infos.</p>
                        </div>
                        <VineyardControls setOpen={setAddOpen} view={view} setView={setView} />

                        <div className="grow overflow-y-auto scrollbar-hide">
                            {view === 'grid' ? (
                                <VineyardsGrid
                                    vineyards={vineyards}
                                    setSelectedVineyard={setSelectedVineyard}
                                    getVineyardActionSetter={getVineyardActionSetter}
                                    getActionSetter={getActionSetter}
                                />
                            ) : (
                                <VineyardsTable
                                    vineyards={vineyards}
                                    setSelectedVineyard={setSelectedVineyard}
                                    getVineyardActionSetter={getVineyardActionSetter}
                                    getActionSetter={getActionSetter}
                                />
                            )}
                        </div>
                        <AddButton setOpen={setAddOpen} className="flex md:hidden" />
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
                        <AddButton setOpen={setAddOpen} />
                    </div>
                )}
                <NewVineyardForm open={addOpen} setOpen={setAddOpen} />
                <NewVineyardTrimForm
                    open={getVineyardActionState('trim')}
                    setOpen={getVineyardActionSetter('trim')}
                    vineyardId={selectedVineyard}
                />
                <NewVineyardCutForm
                    open={getVineyardActionState('cut')}
                    setOpen={getVineyardActionSetter('cut')}
                    vineyardId={selectedVineyard}
                />
                <NewVineyardPlantingForm
                    open={getVineyardActionState('planting')}
                    setOpen={getVineyardActionSetter('planting')}
                    vineyardId={selectedVineyard}
                />
            </main>
        );

    return <p>loading...</p>;
};
