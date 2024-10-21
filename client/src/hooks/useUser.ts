import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/services/react-query/client";
import { info } from "@/services/api/user";
import { User } from "@/types/user";

export const userFn = async (): Promise<User> => {
    const result = await info();
    return result.data;
};

export const useUser = () => {
    const {
        isLoading,
        error,
        data: user,
    } = useQuery({
        queryKey: [QUERY_KEY.user],
        queryFn: userFn,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: Infinity,
    });

    return { user, isLoading, error };
};

export type UserContext = ReturnType<typeof useUser>
