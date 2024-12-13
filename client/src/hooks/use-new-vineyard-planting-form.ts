import { NewVineyardPlanting, VineyardId } from '@/types/vineyard';
import { useCallback, useEffect, useState } from 'react';
import { useNewVineyardPlanting } from './use-new-vineyard-planting';

type step = 'informations' | 'review';

export const useNewVineyardPlantingForm = (vineyardId: VineyardId) => {
    const [step, setStep] = useState<step>('informations');
    const [planting, setPlanting] = useState<NewVineyardPlanting>({
        action: {
            vineyardId: vineyardId,
            date: new Date(),
        },
        plantingType: 'Planting',
        plantCount: 0,
    });
    const [disabled, setDisabled] = useState(true);
    const { newVineyardPlanting, isPending, error, isSuccess, reset } = useNewVineyardPlanting();

    useEffect(() => {
        if (planting.plantCount <= 0) setDisabled(true);
        else setDisabled(false);
    }, [planting]);

    const handleBtn = useCallback(() => {
        switch (step) {
            case 'informations':
                setStep('review');
                break;
            case 'review':
                newVineyardPlanting(planting);
                break;
        }
    }, [step, planting]);

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
        disabled,
        planting,
        setPlanting,
    };
};
