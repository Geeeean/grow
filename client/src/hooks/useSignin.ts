import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/services/react-query/client';
import { Credentials } from '@/types/auth';
import { signIn } from '@/services/api/auth';

const signInFn = async (credentials: Credentials) => {
    const result = await signIn(credentials);
    return result.data;
};

export const useSignIn = () => {
    const client = useQueryClient();

    const {
        mutate: signIn,
        error,
        isPending,
        isSuccess,
    } = useMutation({
        mutationFn: signInFn,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [QUERY_KEY.user] });
        },
        retry: false,
    });

    return { signIn, error, isPending, isSuccess };
};
