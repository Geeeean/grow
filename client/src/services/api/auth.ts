import { apiClient } from '@/services/api/client';
import { User } from '@/types/user';

export const signIn = async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post<User>('/auth/signin', credentials);

    return response.data;
};
