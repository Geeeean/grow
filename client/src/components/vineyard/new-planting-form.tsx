import { useNewVineyardPlantingForm } from '@/hooks/use-new-vineyard-planting-form';
import { vineyardAction, VineyardId } from '@/types/vineyard';
import { useMemo } from 'react';
import DialogWrapper from '../responsive-dialog-wrapper';
import { BasicFormProps } from '@/types/shared';
import { format } from 'date-fns';
import NewPlantingInformationsForm from './new-planting-informations-form';
import { getVineyardActionIcon } from '@/utils/vineyard';
import { Badge } from '../ui/badge';

type Props = {
    vineyardId: VineyardId;
} & BasicFormProps;

const DESC = {
    informations: 'Enter the date on which the planting/removal took place.',
    review: 'Review the planting/removal details to ensure accuracy before submitting.',
};

const action: vineyardAction = 'planting';

const NewVineyardPlantingForm = ({ vineyardId, open, setOpen }: Props) => {
    const { step, handleBtn, resetForm, isPending, isSuccess, error, planting, setPlanting, disabled } =
        useNewVineyardPlantingForm(vineyardId);

    const content = useMemo(() => {
        switch (step) {
            case 'informations':
                return <NewPlantingInformationsForm planting={planting} setPlanting={setPlanting} />;
            case 'review':
                return (
                    <div className="p-2 ring-1 ring-border bg-card rounded-lg space-y-3">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Operation</p>
                                <Badge variant={planting.plantingType == 'Removal' ? 'destructive' : 'default'}>
                                    {planting.plantingType}
                                </Badge>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Plant count</p>
                                <p className=" font-medium">{planting.plantCount}</p>
                            </div>
                        </div>
                        <div className="bg-muted ring-primary ring-1 p-2 rounded-md flex gap-10 items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Planting date</p>
                                <p className="font-medium">{format(planting.action.date, 'PPP')}</p>
                            </div>
                            {getVineyardActionIcon(action, '!w-6 !h-6')}
                        </div>
                    </div>
                );
        }
    }, [step, planting]);

    return (
        <DialogWrapper
            open={open}
            setOpen={setOpen}
            title={step}
            description={DESC[step]}
            confirmCopy={step == 'review' ? `Add ${planting.plantingType}` : 'Next'}
            successCopy={{
                title: `${planting.plantingType} has been added successfully!`,
                desc: 'You can continue to manage and track vineyards.',
            }}
            errorCopy={{
                title: 'Error while adding planting.',
                desc: `Something went wrong while adding ${planting.plantingType}. Please try again later or contact the support.`,
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

export default NewVineyardPlantingForm;
