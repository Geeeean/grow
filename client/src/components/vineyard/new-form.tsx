import { useMemo } from 'react';
import DialogWrapper from '@/components/responsive-dialog-wrapper';
import NewVineyardInformationsForm from './new-informations-form';
import NewVineyardVarietiesForm from './new-varieties-form';
import { useNewVineyardForm } from '@/hooks/use-new-vineyard-form';
import { BasicFormProps } from '@/types/shared';
import VineyardPreview from './preview';

const DESC = {
    informations: 'Enter the basic details for the vineyard.',
    varieties: 'Specify the grape varieties planted in the vineyard, along with any relevant details for each variety.',
    review: 'Review all entered information to ensure accuracy before submitting the vineyard data to the system.',
};

const NewVineyardForm = ({ open, setOpen }: BasicFormProps) => {
    const { step, disabled, vineyard, vineyardDispatch, handleBtn, resetForm, isPending, isSuccess, error } =
        useNewVineyardForm();

    const content = useMemo(() => {
        switch (step) {
            case 'informations':
                return <NewVineyardInformationsForm dispatch={vineyardDispatch} />;
            case 'varieties':
                return <NewVineyardVarietiesForm varieties={vineyard.varieties} dispatch={vineyardDispatch} />;
            case 'review':
                return <VineyardPreview vineyard={vineyard} />;
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
            confirmCopy={step == 'review' ? 'New vineyard' : 'Next'}
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
export default NewVineyardForm;
