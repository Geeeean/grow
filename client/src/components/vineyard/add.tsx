import { SetStateAction, Dispatch, useMemo } from 'react';
import DialogWrapper from '@/components/responsive-dialog-wrapper';
import VineyardAddInformations from './add-informations';
import VineyardAddVarieties from './add-varieties';
import VineyardCard from './card';
import { useVineyardForm } from '@/hooks/use-vineyard-form';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const DESC = {
    informations: 'Enter the basic details for the vineyard.',
    varieties: 'Specify the grape varieties planted in the vineyard, along with any relevant details for each variety.',
    review: 'Review all entered information to ensure accuracy before submitting the vineyard data to the system.',
};

const VineyardAdd = ({ open, setOpen }: Props) => {
    const { step, disabled, vineyard, vineyardDispatch, handleBtn, resetForm, isPending, isSuccess, error } =
        useVineyardForm();

    const content = useMemo(() => {
        switch (step) {
            case 'informations':
                return <VineyardAddInformations dispatch={vineyardDispatch} />;
            case 'varieties':
                return <VineyardAddVarieties varieties={vineyard.varieties} dispatch={vineyardDispatch} />;
            case 'review':
                return <VineyardCard vineyard={vineyard} />;
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
            successCopy={{
                title: 'Vineyard has been added successfully!',
                desc: 'You can now manage and track this vineyard in your list.',
            }}
            errorCopy={{
                title: 'Error while adding vineyard.',
                desc: 'Something went wrong while adding this vineyard. Please try again later or contact the support.',
            }}
            disabled={disabled}
            handle={handleBtn}
            reset={resetForm}
            formState={isPending ? 'loading' : isSuccess ? 'success' : error ? 'error' : 'idle'}
        >
            {content}
        </DialogWrapper>
    );
};
export default VineyardAdd;
