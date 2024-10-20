import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/_layout')({
    component: LayoutComponent,
});

function LayoutComponent() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Outlet />
        </div>
    );
}
