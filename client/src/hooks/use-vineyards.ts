import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/services/react-query/client';
import { Vineyard } from '@/types/vineyard';
import { getAll } from '@/services/api/vineyard';

export const vineyardsFn = async (): Promise<Vineyard[]> => {
    const result = await getAll();
    return result.data;
};

export const useVineyards = () => {
    const {
        isLoading,
        error,
        data: vineyards,
    } = useQuery({
        queryKey: [QUERY_KEY.vineyards],
        queryFn: vineyardsFn,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: Infinity,
    });

    return { vineyards, isLoading, error };
};
