import { apiClient } from '@/services/api/client';

export const info = async () => {
    const response = await apiClient.get('/user');
    return response.data;
};
