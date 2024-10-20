import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_layout/cellar')({
    component: () => <div>Hello /(app)/_layout/cellar!</div>,
});
