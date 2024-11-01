import { apiClient } from '@/services/api/client';

export const info = async () => {
    const response = await apiClient.get('/user/info');
    return response.data;
};
