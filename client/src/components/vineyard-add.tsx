import { SetStateAction, Dispatch, useState, useEffect, useMemo, useCallback, useReducer } from 'react';
import DialogWrapper from './responsive-dialog-wrapper';
import { soils, variety, vineyard } from '@/types/vineyard';
import VineyardAddInformations from './vineyard-add-informations';
import VineyardAddVarieties from './vineyard-add-varieties';
import VineyardCard from './vineyard-card';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

type step = 'informations' | 'varieties' | 'review';
const DESC = {
    informations: 'Enter the basic details for the vineyard.',
    varieties: 'Specify the grape varieties planted in the vineyard, along with any relevant details for each variety.',
    review: 'Review all entered information to ensure accuracy before submitting the vineyard data to the system.',
};

const VineyardCreate = ({ open, setOpen }: Props) => {
    const [step, setStep] = useState<step>('varieties');
    const [disabled, setDisabled] = useState<boolean>(true);
    const [vineyard, vineyardDispatch] = useReducer(vineyardReducer, initialVineyardState);

    useEffect(() => {
        if (open == false) {
            setStep('informations');
            vineyardDispatch({ type: 'RESET' });
        }
    }, [open]);

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
                //fetch add
                console.log(vineyard);
                break;
        }
    }, [vineyard, step]);

    const content = useMemo(() => {
        switch (step) {
            case 'informations':
                return <VineyardAddInformations dispatch={vineyardDispatch} />;
            case 'varieties':
                return <VineyardAddVarieties varieties={vineyard.varieties} dispatch={vineyardDispatch} />;
            case 'review':
                return <VineyardCard vineyard={vineyard} preview />;
            default:
                return <></>;
        }
    }, [vineyard, step]);

    return (
        <DialogWrapper
            open={open}
            setOpen={setOpen}
            title={step}
            description={DESC[step]}
            confirmCopy={step == 'review' ? 'Add vineyard' : 'Next'}
            disabled={disabled}
            handleBtn={handleBtn}
        >
            {content}
        </DialogWrapper>
    );
};

export type VineyardAction =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_SOIL'; payload: soils }
    | { type: 'SET_ALTITUDE'; payload: number | null }
    | { type: 'SET_PLANTS'; payload: number | null }
    | { type: 'APPEND_VARIETY' }
    | { type: 'UPDATE_VARIETY'; payload: { index: number; variety: variety } }
    | { type: 'REMOVE_VARIETY'; payload: number }
    | { type: 'RESET' };

const vineyardReducer = (state: vineyard, action: VineyardAction): vineyard => {
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
            return { ...state, varieties: [...state.varieties, { variety: '', age: null, rows: null }] };
        case 'UPDATE_VARIETY': {
            const updatedVarieties = state.varieties;
            updatedVarieties[action.payload.index] = action.payload.variety;

            return { ...state, varieties: updatedVarieties };
        }
        case 'REMOVE_VARIETY':
            return {
                ...state,
                varieties: state.varieties.filter((_, i) => i !== action.payload), // Rimuove la varietà
            };
        case 'RESET':
            return { name: '', altitude: null, soil: '', plants: null, varieties: [] };
        default:
            return state;
    }
};

const initialVineyardState: vineyard = {
    name: '',
    altitude: null,
    soil: '',
    plants: null,
    varieties: [],
};

export default VineyardCreate;
