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
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-background-dark md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <span className="text-lg font-bold">grow.</span>
                        </Link>
                    </div>
                    <Nav />
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-16 items-center gap-4 border-b bg-background-dark px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                                <Menu className="h-4 w-4" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col p-2">
                            <div className="w-full flex items-center justify-between px-4">
                                <span className="text-lg font-bold">grow.</span>
                                <SheetClose>
                                    <X className="h-4 w-4" />
                                </SheetClose>
                            </div>
                            <Nav />
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
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
