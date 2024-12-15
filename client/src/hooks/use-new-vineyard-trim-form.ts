import { VineyardId } from '@/types/vineyard';
import { useCallback, useState } from 'react';
import { useNewVineyardTrim } from './use-new-vineyard-trim';

type step = 'informations' | 'review';

export const useNewVineyardTrimForm = (vineyardId: VineyardId) => {
    const [step, setStep] = useState<step>('informations');
    const [trimDate, setTrimDate] = useState(new Date());
    const { newVineyardTrim, isPending, error, isSuccess, reset } = useNewVineyardTrim();

    const handleBtn = useCallback(() => {
        switch (step) {
            case 'informations':
                setStep('review');
                break;
            case 'review':
                newVineyardTrim({ vineyardId: vineyardId, date: trimDate });
                break;
        }
    }, [step, trimDate]);

    const resetForm = useCallback(() => {
        setStep('informations');
        reset();
        setTrimDate(new Date());
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
