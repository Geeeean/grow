import { vineyardAction } from '@/types/vineyard';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

export const useVineyardAction = () => {
    const [isTrimOpen, setTrimOpen] = useState<boolean>(false);
    const [isCutOpen, setCutOpen] = useState<boolean>(false);
    const [isExplantationOpen, setExplantationOpen] = useState<boolean>(false);
    const [isTreatmentOpen, setTreatmentOpen] = useState<boolean>(false);
    const [isHarvestOpen, setHarvestOpen] = useState<boolean>(false);

    const actionStates = useMemo(() => {
        const dictionary: Record<vineyardAction, boolean> = {
            trim: isTrimOpen,
            cut: isCutOpen,
            explantation: isExplantationOpen,
            treatment: isTreatmentOpen,
            harvest: isHarvestOpen,
        };
        return dictionary;
    }, [isTrimOpen, isCutOpen, isExplantationOpen, isTreatmentOpen, isHarvestOpen]);

    const actionSetters = useMemo(() => {
        const dictionary: Record<vineyardAction, Dispatch<SetStateAction<boolean>>> = {
            trim: setTrimOpen,
            cut: setCutOpen,
            explantation: setExplantationOpen,
            treatment: setTreatmentOpen,
            harvest: setHarvestOpen,
        };

        return dictionary;
    }, []);

    const getVineyardActionState = useCallback(
        (action: vineyardAction) => {
            return actionStates[action];
        },
        [actionStates],
    );

    const getVineyardActionSetter = useCallback(
        (action: vineyardAction) => {
            return actionSetters[action];
        },
        [actionSetters],
    );

    return { getVineyardActionState, getVineyardActionSetter };
};
