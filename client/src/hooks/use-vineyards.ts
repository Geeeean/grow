import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/services/react-query/client';
import { Vineyard, VineyardId } from '@/types/vineyard';
import { getAll, getById } from '@/services/api/vineyard';

export const vineyardsFn = async (): Promise<Vineyard[]> => {
    const result = await getAll();
    return result.data;
};

const vineyardFn = async (vineyardId: VineyardId): Promise<Vineyard> => {
    const result = await getById(vineyardId);
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

export const useVineyardById = (vineyardId: VineyardId) => {
    const {
        isLoading,
        error,
        data: vineyard,
    } = useQuery({
        queryKey: [QUERY_KEY.vineyards],
        queryFn: vineyardsFn,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: Infinity,
        select: (data) => data.find((v) => v.id === vineyardId),
    });

    return { vineyard, isLoading, error };
};
