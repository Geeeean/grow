import { useVineyardTrimAddForm } from '@/hooks/use-vineyard-trim-add-form';
import { VineyardId } from '@/types/vineyard';
import { useMemo } from 'react';
import DialogWrapper from '../responsive-dialog-wrapper';
import { BasicFormProps } from '@/types/shared';
import TrimAddInformationsForm from './trim-add-informations-form';
import { format } from 'date-fns';
import { TreeDeciduous } from 'lucide-react';

type Props = {
    vineyardId: VineyardId;
} & BasicFormProps;

const DESC = {
    informations: 'Enter the date on which the vineyard trimming took place.',
    review: 'Review the trimming date and any details to ensure accuracy before submitting.',
};

const VineyardTrimAddForm = ({ vineyardId, open, setOpen }: Props) => {
    const { step, handleBtn, resetForm, isPending, isSuccess, error, trimDate, setTrimDate } =
        useVineyardTrimAddForm(vineyardId);

    const content = useMemo(() => {
        switch (step) {
            case 'informations':
                return <TrimAddInformationsForm date={trimDate} setDate={setTrimDate} />;
            case 'review':
                return (
                    <div className="bg-secondary/30 ring-1 p-2 rounded-md flex items-center justify-between">
                        <div>
                            <p className="text-sm">Trim date</p>
                            <p className="text-secondary-foreground font-medium">{format(trimDate, 'PPP')}</p>
                        </div>
                        <TreeDeciduous className="!w-6 !h-6" />
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
                desc: 'Something went wrong while adding this tirm. Please try again later or contact the support.',
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

export default VineyardTrimAddForm;
