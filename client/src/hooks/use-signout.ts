import { useQueryClient, useMutation } from '@tanstack/react-query';
import { signOut } from '@/services/api/auth';

const signOutFn = async () => {
    const result = await signOut();
    return result.data;
};

export const useSignOut = () => {
    const client = useQueryClient();

    const {
        mutate: signOut,
        error,
        isPending,
        isSuccess,
    } = useMutation({
        mutationFn: signOutFn,
        onSuccess: () => {
            client.clear();
        },
        retry: false,
    });

    return { signOut, error, isPending, isSuccess };
};
