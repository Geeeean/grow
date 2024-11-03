import { useMemo } from 'react';
import DialogWrapper from '@/components/responsive-dialog-wrapper';
import VineyardAddInformationsForm from './add-informations-form';
import VineyardAddVarietiesForm from './add-varieties-form';
import VineyardCard from './card';
import { useVineyardAddForm } from '@/hooks/use-vineyard-add-form';
import { BasicFormProps } from '@/types/shared';

const DESC = {
    informations: 'Enter the basic details for the vineyard.',
    varieties: 'Specify the grape varieties planted in the vineyard, along with any relevant details for each variety.',
    review: 'Review all entered information to ensure accuracy before submitting the vineyard data to the system.',
};

const VineyardAddForm = ({ open, setOpen }: BasicFormProps) => {
    const { step, disabled, vineyard, vineyardDispatch, handleBtn, resetForm, isPending, isSuccess, error } =
        useVineyardAddForm();

    const content = useMemo(() => {
        switch (step) {
            case 'informations':
                return <VineyardAddInformationsForm dispatch={vineyardDispatch} />;
            case 'varieties':
                return <VineyardAddVarietiesForm varieties={vineyard.varieties} dispatch={vineyardDispatch} />;
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
export default VineyardAddForm;
