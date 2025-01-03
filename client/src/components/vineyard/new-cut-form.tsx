import { useNewVineyardCutForm } from '@/hooks/use-new-vineyard-cut-form';
import { vineyardAction, VineyardId } from '@/types/vineyard';
import { useMemo } from 'react';
import DialogWrapper from '../responsive-dialog-wrapper';
import { BasicFormProps } from '@/types/shared';
import { format } from 'date-fns';
import NewCutInformationsForm from './new-cut-informations-form';
import { getVineyardActionIcon } from '@/utils/vineyard';

type Props = {
    vineyardId: VineyardId;
} & BasicFormProps;

const DESC = {
    informations: 'Enter the date on which the grass cut took place.',
    review: 'Review the cutting grase date and any details to ensure accuracy before submitting.',
};

const action: vineyardAction = 'cut';

const NewVineyardCutForm = ({ vineyardId, open, setOpen }: Props) => {
    const { step, handleBtn, resetForm, isPending, isSuccess, error, cutDate, setCutDate } =
        useNewVineyardCutForm(vineyardId);

    const content = useMemo(() => {
        switch (step) {
            case 'informations':
                return <NewCutInformationsForm date={cutDate} setDate={setCutDate} />;
            case 'review':
                return (
                    <div className="p-2 bg-card ring-1 ring-border rounded-lg">
                        <div className="bg-muted ring-primary ring-1 p-2 rounded-md flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Cut date</p>
                                <p className="font-medium">{format(cutDate, 'PPP')}</p>
                            </div>
                            {getVineyardActionIcon(action, '!w-6 !h-6')}
                        </div>
                    </div>
                );
        }
    }, [step, cutDate]);

    return (
        <DialogWrapper
            open={open}
            setOpen={setOpen}
            title={step}
            description={DESC[step]}
            confirmCopy={step == 'review' ? 'Add grass cut' : 'Next'}
            successCopy={{
                title: 'Cut has been added successfully!',
                desc: 'You can continue to manage and track vineyards.',
            }}
            errorCopy={{
                title: 'Error while adding grass cut.',
                desc: 'Something went wrong while adding this grass cut. Please try again later or contact the support.',
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

export default NewVineyardCutForm;
