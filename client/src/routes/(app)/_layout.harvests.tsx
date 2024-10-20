import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_layout/harvests')({
    component: LayoutComponent,
});

function LayoutComponent() {
    return <div></div>;
}
