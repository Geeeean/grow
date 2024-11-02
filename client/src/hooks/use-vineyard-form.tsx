import { useCallback, useEffect, useReducer, useState } from 'react';

import { Soil, VineyardCreate, Variety } from '@/types/vineyard';
import { useVineyardAdd } from './use-vineyard-add';

type step = 'informations' | 'varieties' | 'review';

export type VineyardAction =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_SOIL'; payload: Soil }
    | { type: 'SET_ALTITUDE'; payload: number | null }
    | { type: 'SET_PLANTS'; payload: number | null }
    | { type: 'APPEND_VARIETY' }
    | { type: 'UPDATE_VARIETY'; payload: { index: number; variety: Variety } }
    | { type: 'REMOVE_VARIETY'; payload: number }
    | { type: 'RESET' };

const vineyardReducer = (state: VineyardCreate, action: VineyardAction): VineyardCreate => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_ALTITUDE':
            return { ...state, altitude: action.payload };
        case 'SET_SOIL':
            return { ...state, soil: action.payload };
        case 'SET_PLANTS':
            return { ...state, plants: action.payload };
        case 'APPEND_VARIETY':
            return { ...state, varieties: [...state.varieties, { name: '', age: null, rows: null }] };
        case 'UPDATE_VARIETY': {
            const updatedVarieties = state.varieties;
            updatedVarieties[action.payload.index] = action.payload.variety;

            return { ...state, varieties: updatedVarieties };
        }
        case 'REMOVE_VARIETY':
            return {
                ...state,
                varieties: state.varieties.filter((_, i: number) => i !== action.payload), // Rimuove la varietà
            };
        case 'RESET':
            return { name: '', altitude: null, soil: '', plants: null, varieties: [] };
        default:
            return state;
    }
};

const initialVineyardState: VineyardCreate = {
    name: '',
    altitude: null,
    soil: '',
    plants: null,
    varieties: [],
};
export const useVineyardForm = () => {
    const [step, setStep] = useState<step>('informations');
    const [vineyard, vineyardDispatch] = useReducer(vineyardReducer, initialVineyardState);
    const [disabled, setDisabled] = useState<boolean>(true);
    const { vineyardAdd, isPending, isSuccess, error, reset } = useVineyardAdd();

    useEffect(() => {
        switch (step) {
            case 'informations':
                if (
                    vineyard.name === '' ||
                    vineyard.soil === '' ||
                    vineyard.altitude == null ||
                    vineyard.plants == null
                ) {
                    setDisabled(true);
                } else {
                    setDisabled(false);
                }
                break;
            case 'varieties':
                {
                    const valid = vineyard.varieties.every(
                        (cur) =>
                            cur.variety !== '' &&
                            cur.rows !== null &&
                            cur.rows >= 0 &&
                            cur.age !== null &&
                            cur.age >= 0,
                    );
                    setDisabled(!(valid && vineyard.varieties.length > 0));
                }
                break;
            default:
                break;
        }
    }, [vineyard, step]);

    const handleBtn = useCallback(() => {
        switch (step) {
            case 'informations':
                setStep('varieties');
                break;
            case 'varieties':
                setStep('review');
                break;
            case 'review':
                vineyardAdd(vineyard);
                break;
        }
    }, [vineyard, step]);

    const resetForm = useCallback(() => {
        setStep('informations');
        vineyardDispatch({ type: 'RESET' });
        reset();
    }, [setStep, vineyardDispatch, reset]);

    return {
        step,
        disabled,
        vineyard,
        vineyardDispatch,
        handleBtn,
        resetForm,
        isPending,
        isSuccess,
        error,
    };
};
