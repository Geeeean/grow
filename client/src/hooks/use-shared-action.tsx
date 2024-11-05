import { action } from '@/types/shared';
import { useCallback, useState, Dispatch, SetStateAction, useMemo } from 'react';

export const useSharedAction = () => {
    const [isEditOpen, setEditOpen] = useState<boolean>(false);
    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);

    const actionStates = useMemo(() => {
        const dictionary: Record<action, boolean> = {
            edit: isEditOpen,
            delete: isDeleteOpen,
        };

        return dictionary;
    }, [isDeleteOpen, isEditOpen]);

    const actionSetters = useMemo(() => {
        const dictionary: Record<action, Dispatch<SetStateAction<boolean>>> = {
            edit: setEditOpen,
            delete: setDeleteOpen,
        };

        return dictionary;
    }, []);

    const getActionState = useCallback(
        (action: action) => {
            return actionStates[action];
        },
        [actionStates],
    );

    const getActionSetter = useCallback(
        (action: action) => {
            return actionSetters[action];
        },
        [actionSetters],
    );
    return { getActionState, getActionSetter };
};
