import { VineyardId } from '@/types/vineyard';
import { useCallback, useState } from 'react';
import { useVineyardTrimAdd } from './use-vineyard-trim-add';

type step = 'informations' | 'review';

export const useVineyardTrimAddForm = (vineyardId: VineyardId) => {
    const [step, setStep] = useState<step>('informations');
    const [trimDate, setTrimDate] = useState(new Date());
    const { trim, isPending, error, isSuccess, reset } = useVineyardTrimAdd();

    const handleBtn = useCallback(() => {
        switch (step) {
            case 'informations':
                setStep('review');
                break;
            case 'review':
                trim({ vineyardId: vineyardId, date: trimDate });
                break;
        }
    }, [step, trimDate]);

    const resetForm = useCallback(() => {
        setStep('informations');
        reset();
    }, [setStep, reset]);

    return {
        step,
        handleBtn,
        resetForm,
        isPending,
        isSuccess,
        error,
        trimDate,
        setTrimDate,
    };
};
