import { useVineyardById } from '@/hooks/use-vineyards';
import { createFileRoute } from '@tanstack/react-router';

import { Card } from '@/components/ui/card';

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
import { MousePointer2, MousePointerClick } from 'lucide-react';
import VineyardActionsDropdown from '@/components/vineyard/actions-dropdown';
import { useVineyardAction } from '@/hooks/use-vineyard-action';
import { useSharedAction } from '@/hooks/use-shared-action';

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
    const { getVineyardActionSetter } = useVineyardAction();
    const { getActionSetter } = useSharedAction();

    if (error) return <p>error</p>;

    if (vineyard)
        return (
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

                <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-2 overflow-y-auto">
                    <Card className="h-80"></Card>
                    <Card className="h-80 col-span-2"></Card>
                    <Card className="h-56"></Card>
                    <Card className="h-56"></Card>
                    <Card className="h-56"></Card>
                    <Card className="h-96 col-span-3"></Card>
                    <Card className="h-80 col-span-2"></Card>
                    <Card className="h-80"></Card>
                </div>
            </div>
        );

    return <p>loading</p>;
};
