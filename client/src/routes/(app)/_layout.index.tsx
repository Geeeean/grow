import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_layout/')({
    component: LayoutComponent,
});

function LayoutComponent() {
    return <div>APP /</div>;
}
