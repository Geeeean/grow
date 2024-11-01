import { apiClient } from '@/services/api/client';
import { Vineyard } from '@/types/vineyard';

export const getAll = async () => {
    const response = await apiClient.get('/vineyard/get/all')
    return response.data
}

export const addVineyard = async (vineyard: Vineyard) => {
    const response = await apiClient.post('/vineyard/add', vineyard);
    return response.data;
};