import { useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';

import {
    CirclePlus,
    Earth,
    Edit,
    FileOutput,
    ListFilter,
    Maximize,
    Mountain,
    Plus,
    PlusCircle,
    Sprout,
    Trash,
} from 'lucide-react';

import { useVineyardAction } from '@/hooks/use-vineyard-action';
import { useSharedAction } from '@/hooks/use-shared-action';
import { useVineyardById } from '@/hooks/use-vineyards';

import VineyardActionsDropdown from '@/components/vineyard/actions-dropdown';
import NewVineyardCutForm from '@/components/vineyard/new-cut-form';
import NewVineyardTrimForm from '@/components/vineyard/new-trim-form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DetailCard, DetailCardContent, DetailCardHeader, DetailCardTitle } from '@/components/ui/detail-card';
import VarietiesChart from '@/components/vineyard/varieties-chart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import HarvestsChart from '@/components/vineyard/harvests-chart';
import NewVineyardPlantingForm from '@/components/vineyard/new-planting-form';

import { getPlantsNumber } from '@/utils/vineyard';
import { capitalize, cn } from '@/utils/shared';

import { DetailView, detailViewStr } from '@/types/vineyard';
import { Badge } from '@/components/ui/badge';
import { MenubarSeparator } from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';

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

    const [detailView, setDetailView] = useState<DetailView>('overview');

    if (error) return <p>error</p>;

    if (vineyard)
        return (
            <div className="h-full flex flex-col gap-4">
                <div className="max-w-full">
                    <p className="text-lg font-medium truncate">{vineyard.name}</p>
                    <p className="text-muted-foreground text-sm">
                        View in-depth information and management tools for this vineyard.
                    </p>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between gap-2">
                    <Tabs
                        defaultValue="overview"
                        value={detailView}
                        onValueChange={(value) => setDetailView(value as DetailView)}
                        className=""
                    >
                        <TabsList className="w-full md:w-fit">
                            {detailViewStr.map((value, index) => (
                                <TabsTrigger className="grow" value={value} key={index}>
                                    {capitalize(value)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                    <div className="flex items-center gap-4 w-full justify-between md:justify-normal md:w-fit">
                        <div className="flex gap-2">
                            <Button disabled variant="outline" className="font-normal flex items-center gap-2">
                                <FileOutput className="h-[1.2rem] w-[1.2rem]" />
                                <span className="md:hidden lg:block">Export</span>
                            </Button>
                            <Button disabled variant="outline" className="font-normal flex items-center gap-2">
                                <ListFilter className="h-[1.2rem] w-[1.2rem]" />
                                <span className="md:hidden lg:block">Filter</span>
                            </Button>
                        </div>
                        <VineyardActionsDropdown
                            primary
                            vineyardId={vineyard.id}
                            getVineyardActionSetter={getVineyardActionSetter}
                            getActionSetter={getActionSetter}
                            className="w-full md:w-fit"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto scrollbar-hide">
                    {/* BASIC INFOS */}
                    {detailView == 'overview' && (
                        <DetailCard className="md:col-span-2 lg:col-span-1">
                            <DetailCardHeader>
                                <DetailCardTitle>Basic informations</DetailCardTitle>
                                <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                    <Edit />
                                </Button>
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
                                        <p className="font-medium">
                                            {getPlantsNumber(vineyard.plants, vineyard.plantings)}
                                        </p>
                                    </div>
                                    <Sprout className="!w-6 !h-6 text-secondary-foreground" />
                                </DetailCardContent>
                            </div>
                        </DetailCard>
                    )}

                    {/* NOTES */}
                    {detailView == 'overview' && (
                        <DetailCard className="md:col-span-2 max-h-60 lg:overflow-hidden md:max-h-none">
                            <DetailCardHeader>
                                <DetailCardTitle>
                                    <span>Notes</span>
                                    <Badge variant="outline" className="text-secondary-foreground">
                                        {0}
                                    </Badge>
                                </DetailCardTitle>
                                <div className="flex gap-0 items-center">
                                    {vineyard.notes && (
                                        <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                            <PlusCircle />
                                        </Button>
                                    )}
                                    <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                        <Maximize />
                                    </Button>
                                </div>
                            </DetailCardHeader>
                            <DetailCardContent
                                className={cn(
                                    vineyard.notes && 'flex flex-col gap-1 overflow-y-auto p-1 bg-transparent',
                                    'overflow-scroll',
                                )}
                                variant={vineyard.notes ? 'default' : 'empty'}
                            >
                                {vineyard.notes ? (
                                    <>
                                        <DetailCardContent className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-muted-foreground">20/11/2023</p>
                                                <p className="">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                            </div>
                                        </DetailCardContent>
                                        <DetailCardContent className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-muted-foreground">20/11/2023</p>
                                                <p className="">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                            </div>
                                        </DetailCardContent>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <p className="text-lg md:text-xl font-medium text-center">
                                                No note currently registered.
                                            </p>
                                            <p className="text-sm text-center text-muted-foreground">
                                                Press the button to add your first note.
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" className="flex gap-1 items-center">
                                            <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
                                            New note
                                        </Button>
                                    </>
                                )}
                            </DetailCardContent>
                        </DetailCard>
                    )}

                    {/* VARIETIES */}
                    {detailView == 'overview' && (
                        <DetailCard className="md:col-span-2 lg:col-span-3">
                            <DetailCardHeader>
                                <DetailCardTitle>
                                    <span>Varieties</span>
                                    <Badge variant="outline" className="text-secondary-foreground">
                                        {vineyard.varieties.length}
                                    </Badge>
                                </DetailCardTitle>
                                <div className="flex">
                                    <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                        <Plus />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                        <Edit />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                        <Maximize />
                                    </Button>
                                </div>
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
                                                        <TableCell className="font-medium">{variety.name}</TableCell>
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
                    )}

                    {/* TRIMS */}
                    {(detailView == 'overview' || detailView == 'operations') && (
                        <DetailCard
                            className={cn(
                                detailView == 'operations' && 'col-span-3',
                                vineyard.trims.length && (detailView == 'operations' ? 'max-h-80' : 'max-h-60'),
                            )}
                        >
                            <DetailCardHeader>
                                <DetailCardTitle>
                                    <span>Trims</span>
                                    <Badge variant="outline" className="text-secondary-foreground">
                                        {vineyard.trims.length}
                                    </Badge>
                                </DetailCardTitle>
                                <div className="flex">
                                    {vineyard.trims.length ? (
                                        <>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Plus />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Edit />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Trash />
                                            </Button>
                                        </>
                                    ) : null}
                                    <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                        <Maximize />
                                    </Button>
                                </div>
                            </DetailCardHeader>
                            <DetailCardContent
                                className="overflow-scroll"
                                variant={vineyard.trims.length ? 'default' : 'empty'}
                            >
                                {vineyard.trims.length ? (
                                    <div>
                                        <p>trims table</p>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <p className="text-lg md:text-xl font-medium text-center">
                                                No trim currently registered.
                                            </p>
                                            <p className="text-sm text-center text-muted-foreground">
                                                Press the button to add your first trim.
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex gap-1 items-center"
                                            onClick={() => getVineyardActionSetter('trim')(true)}
                                        >
                                            <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
                                            New trim
                                        </Button>
                                    </>
                                )}
                            </DetailCardContent>
                        </DetailCard>
                    )}

                    {/* GRASS CUTS */}
                    {(detailView == 'overview' || detailView == 'operations') && (
                        <DetailCard
                            className={cn(
                                detailView == 'operations' && 'col-span-3',
                                vineyard.cuts.length && (detailView == 'operations' ? 'max-h-80' : 'max-h-60'),
                            )}
                        >
                            <DetailCardHeader>
                                <DetailCardTitle>
                                    <span>Grass cuts</span>
                                    <Badge variant="outline" className="text-secondary-foreground">
                                        {vineyard.cuts.length}
                                    </Badge>
                                </DetailCardTitle>
                                <div className="flex">
                                    {vineyard.cuts.length ? (
                                        <>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Plus />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Edit />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Trash />
                                            </Button>
                                        </>
                                    ) : null}
                                    <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                        <Maximize />
                                    </Button>
                                </div>
                            </DetailCardHeader>
                            <DetailCardContent
                                className="overflow-scroll"
                                variant={vineyard.cuts.length ? 'default' : 'empty'}
                            >
                                {vineyard.cuts.length ? (
                                    <span>grass cuts table</span>
                                ) : (
                                    <>
                                        <div>
                                            <p className="text-lg md:text-xl font-medium text-center">
                                                No grass cut currently registered.
                                            </p>
                                            <p className="text-sm text-center text-muted-foreground">
                                                Press the button to add your first grass cut.
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex gap-1 items-center"
                                            onClick={() => getVineyardActionSetter('cut')(true)}
                                        >
                                            <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
                                            New grass cut
                                        </Button>
                                    </>
                                )}
                            </DetailCardContent>
                        </DetailCard>
                    )}

                    {/* PLANTINGS */}
                    {(detailView == 'overview' || detailView == 'operations') && (
                        <DetailCard
                            className={cn(
                                'md:col-span-2',
                                detailView == 'operations' ? 'lg:col-span-3' : 'lg:col-span-1',
                                vineyard.plantings.length && (detailView == 'operations' ? 'max-h-80' : 'max-h-60'),
                            )}
                        >
                            <DetailCardHeader>
                                <DetailCardTitle>
                                    <span>Plantings and Removals</span>
                                    <Badge variant="outline" className="text-secondary-foreground">
                                        {vineyard.plantings.length}
                                    </Badge>
                                </DetailCardTitle>
                                <div className="flex">
                                    {vineyard.plantings.length ? (
                                        <>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Plus />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Edit />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Trash />
                                            </Button>
                                        </>
                                    ) : null}
                                    <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                        <Maximize />
                                    </Button>
                                </div>
                            </DetailCardHeader>
                            <DetailCardContent
                                variant={vineyard.plantings.length ? 'default' : 'empty'}
                                className="overflow-scroll"
                            >
                                {vineyard.plantings.length ? (
                                    <span>explantations table</span>
                                ) : (
                                    <>
                                        <div>
                                            <p className="text-lg md:text-xl font-medium text-center">
                                                No planting currently registered.
                                            </p>
                                            <p className="text-sm text-center text-muted-foreground">
                                                Press the button to add your first planting.
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex gap-1 items-center"
                                            onClick={() => getVineyardActionSetter('planting')(true)}
                                        >
                                            <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
                                            New planting/removal
                                        </Button>
                                    </>
                                )}
                            </DetailCardContent>
                        </DetailCard>
                    )}

                    {/* HARVESTS */}
                    {(detailView == 'overview' || detailView == 'harvests' || detailView == 'operations') && (
                        <DetailCard className="md:col-span-2 lg:col-span-3">
                            <DetailCardHeader>
                                <DetailCardTitle>
                                    <span>Harvests</span>
                                    <Badge variant="outline" className="text-secondary-foreground">
                                        {vineyard.harvests.length}
                                    </Badge>
                                </DetailCardTitle>
                                <div className="flex">
                                    {vineyard.harvests.length ? (
                                        <>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Plus />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Edit />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Trash />
                                            </Button>
                                        </>
                                    ) : null}
                                    <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                        <Maximize />
                                    </Button>
                                </div>
                            </DetailCardHeader>
                            <DetailCardContent
                                className={cn(vineyard.harvests.length && 'flex items-center justify-between')}
                                variant={vineyard.harvests.length ? 'default' : 'empty'}
                                size={vineyard.harvests.length ? 'default' : 'lg'}
                            >
                                {vineyard.harvests.length ? (
                                    <HarvestsChart />
                                ) : (
                                    <>
                                        <div>
                                            <p className="text-lg md:text-xl font-medium text-center">
                                                No harvest currently registered.
                                            </p>
                                            <p className="text-sm text-center text-muted-foreground">
                                                Press the button to add your first harvest.
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex gap-1 items-center"
                                            onClick={() => getVineyardActionSetter('harvest')(true)}
                                        >
                                            <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
                                            New harvest
                                        </Button>
                                    </>
                                )}
                            </DetailCardContent>
                        </DetailCard>
                    )}

                    {/* ANALYSES */}
                    {(detailView == 'overview' || detailView == 'analyses' || detailView == 'operations') && (
                        <DetailCard className="md:col-span-2 lg:col-span-3">
                            <DetailCardHeader>
                                <DetailCardTitle>
                                    <span>Analyses</span>
                                    <Badge variant="outline" className="text-secondary-foreground">
                                        {0}
                                    </Badge>
                                </DetailCardTitle>
                                <div className="flex">
                                    {0 ? (
                                        <>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Plus />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Edit />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Trash />
                                            </Button>
                                        </>
                                    ) : null}
                                    <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                        <Maximize />
                                    </Button>
                                </div>
                            </DetailCardHeader>
                            <DetailCardContent
                                className={cn(vineyard.analysis && 'flex items-center justify-between')}
                                variant={vineyard.analysis ? 'default' : 'empty'}
                                size={vineyard.analysis ? 'default' : 'lg'}
                            >
                                {vineyard.analysis ? (
                                    <span>analyses</span>
                                ) : (
                                    <>
                                        <div>
                                            <p className="text-lg md:text-xl font-medium text-center">
                                                No analysis currently registered.
                                            </p>
                                            <p className="text-sm text-center text-muted-foreground">
                                                Press the button to add your first analysis.
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex gap-1 items-center"
                                            //onClick={() => getVineyardActionSetter('')(true)}
                                        >
                                            <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
                                            New analysis
                                        </Button>
                                    </>
                                )}
                            </DetailCardContent>
                        </DetailCard>
                    )}
                </div>
                <NewVineyardTrimForm
                    open={getVineyardActionState('trim')}
                    setOpen={getVineyardActionSetter('trim')}
                    vineyardId={vineyard.id}
                />
                <NewVineyardCutForm
                    open={getVineyardActionState('cut')}
                    setOpen={getVineyardActionSetter('cut')}
                    vineyardId={vineyard.id}
                />
                <NewVineyardPlantingForm
                    open={getVineyardActionState('planting')}
                    setOpen={getVineyardActionSetter('planting')}
                    vineyardId={vineyard.id}
                />
            </div>
        );

    return <p>loading</p>;
};
