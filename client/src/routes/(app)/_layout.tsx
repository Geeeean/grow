import { Outlet, createFileRoute, Link, useLocation, redirect } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import { Menu, X, Settings2 } from 'lucide-react';
import Nav from '@/components/nav';
import { ModeToggle } from '@/components/mode-toggle';
import BreadcrumbLocation from '@/components/breadcrumb-location';
import { QUERY_KEY, queryClient } from '@/services/react-query/client';
import { info } from '@/services/api/user';
import { Toaster } from '@/components/ui/toaster';

const fetchUser = async () => {
    const cachedData = queryClient.getQueryData([QUERY_KEY.user]);

    if (cachedData) {
        return cachedData;
    }

    const { data } = await info();
    queryClient.setQueryData([QUERY_KEY.user], data);
    return data;
};

export const Route = createFileRoute('/(app)/_layout')({
    beforeLoad: async ({ location }) => {
        try {
            const user = await fetchUser(); //can throw
            if (!user) {
                throw Error('user not logged');
            }
        } catch (e) {
            throw redirect({
                to: '/signin',
                search: {
                    redirect: location.href,
                },
            });
        }
    },
    component: () => <Layout />,
});

const Layout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col h-screen w-full">
            <header className="flex items-center gap-4 border-b bg-background-dark px-4 w-full py-3 h-fit">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 h-fit w-fit p-[5px]">
                            <Menu />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col p-2 py-4">
                        <SheetHeader>
                            <SheetTitle>
                                <div className="w-full flex items-center justify-between px-2">
                                    <span className="ml-2 text-lg font-bold">grow.</span>
                                    <SheetClose>
                                        <Button variant="ghost" size="icon">
                                            <X />
                                        </Button>
                                    </SheetClose>
                                </div>
                            </SheetTitle>
                            <SheetDescription className="hidden"></SheetDescription>
                        </SheetHeader>
                        <Nav />
                    </SheetContent>
                </Sheet>
                <BreadcrumbLocation location={location.pathname} bcLast={location.search.bcLast} />
                <div className="flex items-center gap-2">
                    <ModeToggle />
                </div>
            </header>
            <Outlet />
            <Toaster />
        </div>
    );
};
