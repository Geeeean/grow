import { useVineyardById } from '@/hooks/use-vineyards';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { Earth, Maximize, Mountain, MousePointer2, MousePointerClick, Sprout } from 'lucide-react';
import VineyardActionsDropdown from '@/components/vineyard/actions-dropdown';
import { useVineyardAction } from '@/hooks/use-vineyard-action';
import { useSharedAction } from '@/hooks/use-shared-action';
import VineyardCutAddForm from '@/components/vineyard/cut-add-form';
import VineyardTrimAddForm from '@/components/vineyard/trim-add-form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DetailCard, DetailCardContent, DetailCardHeader, DetailCardTitle } from '@/components/ui/detail-card';
import VarietiesChart from '@/components/vineyard/varieties-chart';

export const Route = createFileRoute('/(app)/_layout/vineyards/$vineyardId')({
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
                        <Menubar className="w-fit">
                            <MenubarMenu>
                                <MenubarTrigger>Year</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarRadioGroup value="Luis">
                                        <MenubarRadioItem value="Luis">2024</MenubarRadioItem>
                                        <MenubarRadioItem value="benoit">2023</MenubarRadioItem>
                                        <MenubarRadioItem value="andy">2022</MenubarRadioItem>
                                    </MenubarRadioGroup>
                                    <MenubarSeparator />
                                    <MenubarItem inset className="flex justify-between">
                                        Select all <MousePointerClick className="text-muted-foreground" />
                                    </MenubarItem>
                                    <MenubarItem inset className="flex justify-between gap-6">
                                        Select current year <MousePointer2 className="text-muted-foreground" />
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Varieties</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarRadioGroup value="Luis">
                                        <MenubarRadioItem value="Luis">sangiovese</MenubarRadioItem>
                                        <MenubarRadioItem value="benoit">pinot noir</MenubarRadioItem>
                                    </MenubarRadioGroup>
                                    <MenubarSeparator />
                                    <MenubarItem inset className="flex justify-between">
                                        Select all <MousePointerClick className="text-muted-foreground" />
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                        <VineyardActionsDropdown
                            primary
                            vineyardId={vineyard.id}
                            getVineyardActionSetter={getVineyardActionSetter}
                            getActionSetter={getActionSetter}
                        />
                    </div>

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
                                    <VarietiesChart varieties={vineyard.varieties}/>
                                </DetailCardContent>
                            </div>
                        </DetailCard>
                    </div>
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
