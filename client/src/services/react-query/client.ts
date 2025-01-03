import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const QUERY_KEY = {
    user: 'user',
    vineyards: 'vineyards',
};
