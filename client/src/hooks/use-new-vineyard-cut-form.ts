import { VineyardId } from '@/types/vineyard';
import { useCallback, useState } from 'react';
import { useNewVineyardCut } from './use-new-vineyard-cut';

type step = 'informations' | 'review';

export const useNewVineyardCutForm = (vineyardId: VineyardId) => {
    const [step, setStep] = useState<step>('informations');
    const [cutDate, setCutDate] = useState(new Date());
    const { newVineyardCut, isPending, error, isSuccess, reset } = useNewVineyardCut();

    const handleBtn = useCallback(() => {
        switch (step) {
            case 'informations':
                setStep('review');
                break;
            case 'review':
                newVineyardCut({ vineyardId: vineyardId, date: cutDate });
                break;
        }
    }, [step, cutDate]);

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
        cutDate,
        setCutDate,
    };
};
