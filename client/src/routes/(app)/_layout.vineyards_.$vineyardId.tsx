import { useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';

import {
    BookOpen,
    CirclePlus,
    Earth,
    Edit,
    FileOutput,
    Flower,
    Grape,
    ListFilter,
    Maximize,
    Microscope,
    Minimize,
    Mountain,
    Plus,
    Settings2,
    Sprout,
} from 'lucide-react';

import { useVineyardAction } from '@/hooks/use-vineyard-action';
import { useSharedAction } from '@/hooks/use-shared-action';
import { useVineyardById } from '@/hooks/use-vineyards';

import VineyardActionsDropdown from '@/components/vineyard/actions-dropdown';
import NewVineyardCutForm from '@/components/vineyard/new-cut-form';
import NewVineyardTrimForm from '@/components/vineyard/new-trim-form';
import { DetailCard, DetailCardContent, DetailCardHeader, DetailCardTitle } from '@/components/ui/detail-card';
import { Button } from '@/components/ui/button';
import HarvestsChart from '@/components/vineyard/harvests-chart';
import NewVineyardPlantingForm from '@/components/vineyard/new-planting-form';
import { Badge } from '@/components/ui/badge';
import TrimTable from '@/components/vineyard/trims-table';
import CutsTable from '@/components/vineyard/cuts-table';

import { getPlantsNumber } from '@/utils/vineyard';
import { capitalize, cn } from '@/utils/shared';

import { DetailView, detailViewStr } from '@/types/vineyard';
import PlantingsTable from '@/components/vineyard/plantings-table';
import VarietisTable from '@/components/vineyard/varieties-table';

export const Route = createFileRoute('/(app)/_layout/vineyards_/$vineyardId')({
    validateSearch: (search: Record<string, string>): { bcLast: string } => {
        return {
            bcLast: search.bcLast,
        };
    },
    component: () => <VineyardComponent />,
});

const getDetailViewIcon = (detailView: DetailView) => {
    switch (detailView) {
        case 'overview':
            return <BookOpen />;
        case 'operations':
            return <Settings2 />;
        case 'harvests':
            return <Grape />;
        case 'analyses':
            return <Microscope />;
    }
};

const VineyardComponent = () => {
    const { vineyardId } = Route.useParams();
    const { vineyard, error } = useVineyardById(Number(vineyardId));
    const { getVineyardActionState, getVineyardActionSetter } = useVineyardAction();
    const { getActionSetter } = useSharedAction();

    const [notesOpen, setNotesOpen] = useState<boolean>(false);
    const [varietiesOpen, setVarietiesOpen] = useState<boolean>(false);
    const [cutsOpen, setCutsOpen] = useState<boolean>(false);
    const [trimsOpen, setTrimsOpen] = useState<boolean>(false);
    const [plantingsOpen, setPlantingsOpen] = useState<boolean>(false);
    const [harvestsOpen, setHarvestsOpen] = useState<boolean>(false);
    const [analysesOpen, setAnalysesOpen] = useState<boolean>(false);

    const [detailView, setDetailView] = useState<DetailView>('overview');

    if (error) return <p>error</p>;

    if (vineyard)
        return (
            <main className="overflow-hidden grow flex flex-col">
                <div className="w-full border-b bg-background-dark/50 px-4 flex justify-between items-center pt-1">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {detailViewStr.map((value, index) => (
                            <div className={cn('p-1 px-2', detailView == value && 'border-b-2 border-b-primary')}>
                                <Button
                                    key={index}
                                    className="px-[10px] py-[2px] h-fit flex gap-2"
                                    variant="ghost"
                                    onClick={() => setDetailView(value as DetailView)}
                                >
                                    {getDetailViewIcon(value)}
                                    {capitalize(value)}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-4 grow overflow-hidden">
                    <div className="w-full flex flex-col md:flex-row justify-between gap-2 items-center">
                        <div className="grow flex gap-2 items-center">
                            <p className="text-lg font-semibold truncate">{vineyard.name}</p>
                            <Badge variant="outline" className="h-fit w-fit line-clamp-1">
                                Season 2024 - 2025
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2 h-fit w-full">
                            <div className="flex gap-2">
                                <Button variant="outline" className="font-normal flex items-center gap-2">
                                    <FileOutput className="h-[1.2rem] w-[1.2rem]" />
                                    <span className="hidden lg:block">Export</span>
                                </Button>
                                <Button variant="outline" className="font-normal flex items-center gap-2">
                                    <ListFilter className="h-[1.2rem] w-[1.2rem]" />
                                    <span className="hidden lg:block">Filter</span>
                                </Button>
                                <Button variant="secondary" className="font-normal flex items-center gap-2">
                                    <Flower className="h-[1.2rem] w-[1.2rem]" />
                                    <span className="hidden lg:block">Start a new Season</span>
                                </Button>
                            </div>
                            <div className="h-9 w-[1.5px] bg-muted z-50" />
                            <VineyardActionsDropdown
                                primary
                                vineyardId={vineyard.id}
                                getVineyardActionSetter={getVineyardActionSetter}
                                getActionSetter={getActionSetter}
                                className="w-full md:w-fit"
                            />
                        </div>
                    </div>

                    <div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto scrollbar-hide rounded-md">
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
                                        <Earth className="!w-6 !h-6 text-primary" />
                                    </DetailCardContent>
                                    <DetailCardContent className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Altitude</p>
                                            <p className="font-medium">{vineyard.altitude}m</p>
                                        </div>
                                        <Mountain className="!w-6 !h-6 text-primary" />
                                    </DetailCardContent>
                                    <DetailCardContent className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Plants</p>
                                            <p className="font-medium">
                                                {getPlantsNumber(vineyard.plants, vineyard.plantings)}
                                            </p>
                                        </div>
                                        <Sprout className="!w-6 !h-6 text-primary" />
                                    </DetailCardContent>
                                </div>
                            </DetailCard>
                        )}

                        {/* NOTES */}
                        {detailView == 'overview' && (
                            <DetailCard
                                className="md:col-span-2 max-h-60 lg:overflow-hidden md:max-h-none"
                                setOpen={setNotesOpen}
                                open={notesOpen}
                            >
                                <DetailCardHeader>
                                    <DetailCardTitle>
                                        <span>Notes</span>
                                        <Badge variant="outline" className="text-primary">
                                            {0}
                                        </Badge>
                                    </DetailCardTitle>
                                    <div className="flex gap-0 items-center">
                                        {vineyard.notes && (
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Plus />
                                            </Button>
                                        )}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="p-2 m-0 h-fit w-fit"
                                            onClick={() => setNotesOpen((old) => !old)}
                                        >
                                            {notesOpen ? <Minimize /> : <Maximize />}
                                        </Button>
                                    </div>
                                </DetailCardHeader>
                                <DetailCardContent
                                    className={cn(
                                        vineyard.notes && 'flex flex-col gap-2 overflow-y-auto p-2 bg-transparent',
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
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                        nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                    </p>
                                                </div>
                                            </DetailCardContent>
                                            <DetailCardContent className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">20/11/2023</p>
                                                    <p className="">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                        nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                                        sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                                            <Button variant="outline" size="sm" className="flex gap-2 items-center">
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
                            <DetailCard
                                className="md:col-span-2 lg:col-span-3"
                                setOpen={setVarietiesOpen}
                                open={varietiesOpen}
                            >
                                <DetailCardHeader>
                                    <DetailCardTitle>
                                        <span>Varieties</span>
                                        <Badge variant="outline" className="text-primary">
                                            {vineyard.varieties.length}
                                        </Badge>
                                    </DetailCardTitle>
                                    <div className="flex">
                                        <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                            <Plus />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="p-2 m-0 h-fit w-fit"
                                            onClick={() => setVarietiesOpen((old) => !old)}
                                        >
                                            {varietiesOpen ? <Minimize /> : <Maximize />}
                                        </Button>
                                    </div>
                                </DetailCardHeader>
                                <div className="flex flex-col lg:flex-row gap-2 w-full h-full">
                                    {vineyard.varieties.length ? (
                                        <>
                                            <div className="flex flex-col grow overflow-hidden p-[1px] h-full">
                                                <VarietisTable
                                                    varieties={vineyard.varieties}
                                                    BodyWrapper={({ children }) => (
                                                        <DetailCardContent className="overflow-scroll p-0">
                                                            {children}
                                                        </DetailCardContent>
                                                    )}
                                                />
                                            </div>
                                            {/*
                                        <DetailCardContent>
                                            <VarietiesChart varieties={vineyard.varieties} />
                                        </DetailCardContent>
                                        */}
                                        </>
                                    ) : (
                                        <DetailCardContent variant="empty" className="w-full">
                                            <div>
                                                <p className="text-lg md:text-xl font-medium text-center">
                                                    No varieties currently registered.
                                                </p>
                                                <p className="text-sm text-center text-muted-foreground">
                                                    Press the button to add your first variety.
                                                </p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex gap-2 items-center"
                                                //onClick={() => getVineyardActionSetter('cut')(true)}
                                            >
                                                <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
                                                New variety
                                            </Button>
                                        </DetailCardContent>
                                    )}
                                </div>
                            </DetailCard>
                        )}

                        {/* TRIMS */}
                        {(detailView == 'overview' || detailView == 'operations') && (
                            <DetailCard
                                className={cn(
                                    detailView == 'operations' && 'col-span-3',
                                    vineyard.trims.length &&
                                        !trimsOpen &&
                                        (detailView == 'operations' ? 'max-h-80' : 'max-h-60'),
                                )}
                                setOpen={setTrimsOpen}
                                open={trimsOpen}
                            >
                                <DetailCardHeader>
                                    <DetailCardTitle>
                                        <span>Trims</span>
                                        <Badge variant="outline" className="text-primary">
                                            {vineyard.trims.length}
                                        </Badge>
                                    </DetailCardTitle>
                                    <div className="flex">
                                        {vineyard.trims.length ? (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="p-2 m-0 h-fit w-fit"
                                                onClick={() => getVineyardActionSetter('trim')(true)}
                                            >
                                                <Plus />
                                            </Button>
                                        ) : null}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="p-2 m-0 h-fit w-fit"
                                            onClick={() => setTrimsOpen((old) => !old)}
                                        >
                                            {trimsOpen ? <Minimize /> : <Maximize />}
                                        </Button>
                                    </div>
                                </DetailCardHeader>
                                {vineyard.trims.length ? (
                                    <div className="flex flex-col gap-2 overflow-hidden p-[1px] h-full">
                                        <TrimTable
                                            trims={vineyard.trims}
                                            filter={{ placeholder: 'Filter Date...', column: 'date' }}
                                            BodyWrapper={({ children }) => (
                                                <DetailCardContent className="overflow-scroll p-0">
                                                    {children}
                                                </DetailCardContent>
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <DetailCardContent variant="empty">
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
                                            className="flex gap-2 items-center"
                                            onClick={() => getVineyardActionSetter('trim')(true)}
                                        >
                                            <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
                                            New trim
                                        </Button>
                                    </DetailCardContent>
                                )}
                            </DetailCard>
                        )}

                        {/* GRASS CUTS */}
                        {(detailView == 'overview' || detailView == 'operations') && (
                            <DetailCard
                                className={cn(
                                    detailView == 'operations' && 'col-span-3',
                                    vineyard.cuts.length && (detailView == 'operations' ? 'max-h-80' : 'max-h-60'),
                                )}
                                setOpen={setCutsOpen}
                                open={cutsOpen}
                            >
                                <DetailCardHeader>
                                    <DetailCardTitle>
                                        <span>Grass cuts</span>
                                        <Badge variant="outline" className="text-primary">
                                            {vineyard.cuts.length}
                                        </Badge>
                                    </DetailCardTitle>
                                    <div className="flex">
                                        {vineyard.cuts.length ? (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="p-2 m-0 h-fit w-fit"
                                                onClick={() => getVineyardActionSetter('cut')(true)}
                                            >
                                                <Plus />
                                            </Button>
                                        ) : null}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="p-2 m-0 h-fit w-fit"
                                            onClick={() => setCutsOpen((old) => !old)}
                                        >
                                            {cutsOpen ? <Minimize /> : <Maximize />}
                                        </Button>
                                    </div>
                                </DetailCardHeader>
                                {vineyard.cuts.length ? (
                                    <div className="flex flex-col gap-2 overflow-hidden p-[1px] h-full">
                                        <CutsTable
                                            cuts={vineyard.cuts}
                                            filter={{ placeholder: 'Filter Date...', column: 'date' }}
                                            BodyWrapper={({ children }) => (
                                                <DetailCardContent className="overflow-scroll p-0">
                                                    {children}
                                                </DetailCardContent>
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <DetailCardContent variant="empty">
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
                                            className="flex gap-2 items-center"
                                            onClick={() => getVineyardActionSetter('cut')(true)}
                                        >
                                            <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
                                            New grass cut
                                        </Button>
                                    </DetailCardContent>
                                )}
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
                                setOpen={setPlantingsOpen}
                                open={plantingsOpen}
                            >
                                <DetailCardHeader>
                                    <DetailCardTitle>
                                        <span>Plantings and Removals</span>
                                        <Badge variant="outline" className="text-primary">
                                            {vineyard.plantings.length}
                                        </Badge>
                                    </DetailCardTitle>
                                    <div className="flex">
                                        {vineyard.plantings.length ? (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="p-2 m-0 h-fit w-fit"
                                                onClick={() => getVineyardActionSetter('planting')(true)}
                                            >
                                                <Plus />
                                            </Button>
                                        ) : null}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="p-2 m-0 h-fit w-fit"
                                            onClick={() => setPlantingsOpen((old) => !old)}
                                        >
                                            {plantingsOpen ? <Minimize /> : <Maximize />}
                                        </Button>
                                    </div>
                                </DetailCardHeader>
                                {vineyard.plantings.length ? (
                                    <div className="flex flex-col gap-2 overflow-hidden p-[1px] h-full">
                                        <PlantingsTable
                                            plantings={vineyard.plantings}
                                            filter={{ placeholder: 'Filter Date...', column: 'date' }}
                                            BodyWrapper={({ children }) => (
                                                <DetailCardContent className="overflow-scroll p-0">
                                                    {children}
                                                </DetailCardContent>
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <DetailCardContent variant="empty">
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
                                            className="flex gap-2 items-center"
                                            onClick={() => getVineyardActionSetter('planting')(true)}
                                        >
                                            <CirclePlus className="h-[1.2rem] w-[1.2rem]" />
                                            New planting/removal
                                        </Button>
                                    </DetailCardContent>
                                )}
                            </DetailCard>
                        )}

                        {/* HARVESTS */}
                        {(detailView == 'overview' || detailView == 'harvests' || detailView == 'operations') && (
                            <DetailCard
                                className="md:col-span-2 lg:col-span-3"
                                setOpen={setHarvestsOpen}
                                open={harvestsOpen}
                            >
                                <DetailCardHeader>
                                    <DetailCardTitle>
                                        <span>Harvests</span>
                                        <Badge variant="outline" className="text-primary">
                                            {vineyard.harvests.length}
                                        </Badge>
                                    </DetailCardTitle>
                                    <div className="flex">
                                        {vineyard.harvests.length ? (
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Plus />
                                            </Button>
                                        ) : null}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="p-2 m-0 h-fit w-fit"
                                            onClick={() => setHarvestsOpen((old) => !old)}
                                        >
                                            {harvestsOpen ? <Minimize /> : <Maximize />}
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
                                                className="flex gap-2 items-center"
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
                            <DetailCard
                                className="md:col-span-2 lg:col-span-3"
                                setOpen={setAnalysesOpen}
                                open={analysesOpen}
                            >
                                <DetailCardHeader>
                                    <DetailCardTitle>
                                        <span>Analyses</span>
                                        <Badge variant="outline" className="text-primary">
                                            {0}
                                        </Badge>
                                    </DetailCardTitle>
                                    <div className="flex">
                                        {0 ? (
                                            <Button size="icon" variant="ghost" className="p-2 m-0 h-fit w-fit">
                                                <Plus />
                                            </Button>
                                        ) : null}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="p-2 m-0 h-fit w-fit"
                                            onClick={() => setAnalysesOpen((old) => !old)}
                                        >
                                            {analysesOpen ? <Minimize /> : <Maximize />}
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
                                                className="flex gap-2 items-center"
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
            </main>
        );

    return <p>loading</p>;
};
