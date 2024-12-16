import { Dispatch, SetStateAction } from 'react';

export type BasicFormProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const actionStr = ['edit', 'delete'] as const;
export type action = (typeof actionStr)[number];

export type ApiResponse<T> = {
    data: T;
    message: string;
    status: number;
};
