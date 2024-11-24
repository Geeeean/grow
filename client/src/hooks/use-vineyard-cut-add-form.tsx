import { VineyardId } from '@/types/vineyard';
import { useCallback, useState } from 'react';
import { useVineyardCutAdd } from './use-vineyard-cut-add';

type step = 'informations' | 'review';

export const useVineyardCutAddForm = (vineyardId: VineyardId) => {
    const [step, setStep] = useState<step>('informations');
    const [cutDate, setCutDate] = useState(new Date());
    const { vineyardCutAdd, isPending, error, isSuccess, reset } = useVineyardCutAdd();

    const handleBtn = useCallback(() => {
        switch (step) {
            case 'informations':
                setStep('review');
                break;
            case 'review':
                vineyardCutAdd({ vineyardId: vineyardId, date: cutDate });
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
