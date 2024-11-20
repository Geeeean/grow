import { useVineyardById } from '@/hooks/use-vineyards';
import { createFileRoute } from '@tanstack/react-router';
import { Earth, FileOutput, ListFilter, Maximize, Mountain, Sprout } from 'lucide-react';
import VineyardActionsDropdown from '@/components/vineyard/actions-dropdown';
import { useVineyardAction } from '@/hooks/use-vineyard-action';
import { useSharedAction } from '@/hooks/use-shared-action';
import VineyardCutAddForm from '@/components/vineyard/cut-add-form';
import VineyardTrimAddForm from '@/components/vineyard/trim-add-form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DetailCard, DetailCardContent, DetailCardHeader, DetailCardTitle } from '@/components/ui/detail-card';
import VarietiesChart from '@/components/vineyard/varieties-chart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/(app)/_layout/vineyards_/$vineyardId')({
    validateSearch: (search: Record<string, string>): { bcLast: string } => {
        return {
            bcLast: search.bcLast,
        };
    },
    component: () => <VineyardComponent />,
});

const VineyardComponent = () => {
    const { vineyardId } = Route.useParams();
    const { vineyard, error } = useVineyardById(Number(vineyardId));
    const { getVineyardActionState, getVineyardActionSetter } = useVineyardAction();
    const { getActionSetter } = useSharedAction();

    const [detailView, setDetailView] = useState('overview');

    if (error) return <p>error</p>;

    if (vineyard)
        return (
            <>
                <div className="h-full flex flex-col gap-4">
                    <div>
                        <p className="text-lg font-medium">{vineyard.name}</p>
                        <p className="text-muted-foreground text-sm">
                            View in-depth information and management tools for this vineyard.
                        </p>
                    </div>

                    <div className="w-full flex items-center justify-between">
                        <Tabs defaultValue="grid" value={detailView} onValueChange={setDetailView}>
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="harvests">Harvests</TabsTrigger>
                                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex items-center gap-2">
                            <Button disabled variant="outline" className="font-normal flex items-center gap-2">
                                <FileOutput className="h-[1.2rem] w-[1.2rem]" />
                                Export
                            </Button>
                            <Button disabled variant="outline" className="font-normal flex items-center gap-2">
                                <ListFilter className="h-[1.2rem] w-[1.2rem]" />
                                Filter
                            </Button>
                            <VineyardActionsDropdown
                                primary
                                vineyardId={vineyard.id}
                                getVineyardActionSetter={getVineyardActionSetter}
                                getActionSetter={getActionSetter}
                            />
                        </div>
                    </div>

                    {detailView == 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto scrollbar-hide">
                            <DetailCard className="md:col-span-2 lg:col-span-1">
                                <DetailCardHeader>
                                    <DetailCardTitle>Basic informations</DetailCardTitle>
                                    <Maximize />
                                </DetailCardHeader>
                                <div className="flex flex-col gap-1">
                                    <DetailCardContent className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Soil type</p>
                                            <p className="font-medium">{vineyard.soil}</p>
                                        </div>
                                        <Earth className="!w-6 !h-6 text-secondary-foreground" />
                                    </DetailCardContent>
                                    <DetailCardContent className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Altitude</p>
                                            <p className="font-medium">{vineyard.altitude}m</p>
                                        </div>
                                        <Mountain className="!w-6 !h-6 text-secondary-foreground" />
                                    </DetailCardContent>
                                    <DetailCardContent className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Plants</p>
                                            <p className="font-medium">{vineyard.plants}</p>
                                        </div>
                                        <Sprout className="!w-6 !h-6 text-secondary-foreground" />
                                    </DetailCardContent>
                                </div>
                            </DetailCard>
                            <DetailCard className="md:col-span-2 lg:col-span-3">
                                <DetailCardHeader>
                                    <DetailCardTitle>Variants</DetailCardTitle>
                                    <Maximize />
                                </DetailCardHeader>
                                <div className="flex flex-col lg:flex-row gap-1 w-full h-full">
                                    <DetailCardContent className="h-full p-0 grow">
                                        <div className="max-h-[270px] overflow-y-auto">
                                            <Table className="p-0 w-full">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Name</TableHead>
                                                        <TableHead>Rows</TableHead>
                                                        <TableHead>Age</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {vineyard.varieties.map((variety, index: number) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-medium">
                                                                {variety.name}
                                                            </TableCell>
                                                            <TableCell>{variety.rows}</TableCell>
                                                            <TableCell>{variety.age}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </DetailCardContent>
                                    <DetailCardContent>
                                        <VarietiesChart varieties={vineyard.varieties} />
                                    </DetailCardContent>
                                </div>
                            </DetailCard>
                        </div>
                    )}
                </div>
                <VineyardTrimAddForm
                    open={getVineyardActionState('trimming')}
                    setOpen={getVineyardActionSetter('trimming')}
                    vineyardId={vineyard.id}
                />
                <VineyardCutAddForm
                    open={getVineyardActionState('cutting')}
                    setOpen={getVineyardActionSetter('cutting')}
                    vineyardId={vineyard.id}
                />
            </>
        );

    return <p>loading</p>;
};
