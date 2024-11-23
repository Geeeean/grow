import { createRootRoute, Outlet } from '@tanstack/react-router';

import { ThemeProvider } from '@/components/theme-provider';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/react-query/client';

export const Route = createRootRoute({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <Outlet />
            </ThemeProvider>
        </QueryClientProvider>
    ),
});
