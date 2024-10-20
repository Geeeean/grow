import { Outlet, createFileRoute, Link, useLocation } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';
import { Menu, X, Settings2 } from 'lucide-react';
import Nav from '@/components/nav';
import { ModeToggle } from '@/components/mode-toggle';
import BreadcrumbLocation from '@/components/breadcrumb-location';

export const Route = createFileRoute('/(app)/_layout')({
    component: LayoutComponent,
});

function LayoutComponent() {
    const location = useLocation();

    return (
        <div className="grid h-screen w-full md:grid-cols-[220px_1fr] grid-rows-[3.5rem_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden md:flex items-center border-b px-4 lg:px-6 bg-background-dark border-r">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-lg font-bold">grow.</span>
                </Link>
            </div>
            <header className="flex items-center gap-4 border-b bg-background-dark px-4 lg:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                            <Menu />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col p-2">
                        <div className="w-full flex items-center justify-between px-4">
                            <span className="text-lg font-bold">grow.</span>
                            <SheetClose>
                                <X />
                            </SheetClose>
                        </div>
                        <Nav className="pt-0" />
                    </SheetContent>
                </Sheet>
                <div className="w-full flex-1">
                    <BreadcrumbLocation location={location.pathname} />
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Button variant="outline" size="icon">
                        <Settings2 className="h-[1.2rem] w-[1.2rem]" />
                        <span className="sr-only">Settings</span>
                    </Button>
                </div>
            </header>
            <Nav className="hidden md:flex border-r bg-background-dark" />
            <main className="flex-1 p-4 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
