import { useNewVineyardTrimForm } from '@/hooks/use-new-vineyard-trim-form';
import { vineyardAction, VineyardId } from '@/types/vineyard';
import { useMemo } from 'react';
import DialogWrapper from '../responsive-dialog-wrapper';
import { BasicFormProps } from '@/types/shared';
import NewTrimInformationsForm from './new-trim-informations-form';
import { format } from 'date-fns';
import { getVineyardActionIcon } from '@/utils/vineyard';

type Props = {
    vineyardId: VineyardId;
} & BasicFormProps;

const DESC = {
    informations: 'Enter the date on which the vineyard trimming took place.',
    review: 'Review the trimming date and any details to ensure accuracy before submitting.',
};

const action: vineyardAction = 'trim';

const NewVineyardTrimForm = ({ vineyardId, open, setOpen }: Props) => {
    const { step, handleBtn, resetForm, isPending, isSuccess, error, trimDate, setTrimDate } =
        useNewVineyardTrimForm(vineyardId);

    const content = useMemo(() => {
        switch (step) {
            case 'informations':
                return <NewTrimInformationsForm date={trimDate} setDate={setTrimDate} />;
            case 'review':
                return (
                    <div className="p-2 bg-card ring-1 ring-border rounded-lg">
                        <div className="bg-muted ring-1 ring-primary p-2 rounded-md flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Trim date</p>
                                <p className="font-medium">{format(trimDate, 'PPP')}</p>
                            </div>
                            {getVineyardActionIcon(action, '!w-6 !h-6')}
                        </div>
                    </div>
                );
        }
    }, [step, trimDate]);

    return (
        <DialogWrapper
            open={open}
            setOpen={setOpen}
            title={step}
            description={DESC[step]}
            confirmCopy={step == 'review' ? 'Add trim' : 'Next'}
            successCopy={{
                title: 'Trim has been added successfully!',
                desc: 'You can continue to manage and track vineyards.',
            }}
            errorCopy={{
                title: 'Error while adding trim.',
                desc: 'Something went wrong while adding this trim. Please try again later or contact the support.',
            }}
            disabled={false}
            handle={handleBtn}
            reset={resetForm}
            formState={isPending ? 'loading' : isSuccess ? 'success' : error ? 'error' : 'idle'}
        >
            {content}
        </DialogWrapper>
    );
};

export default NewVineyardTrimForm;
