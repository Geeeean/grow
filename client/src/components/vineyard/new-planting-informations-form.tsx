import { Dispatch, SetStateAction } from 'react';
import { Label } from '@/components/ui/label';
import { DatePicker } from '../ui/date-picker';
import { NewVineyardPlanting, plantingValues, PlantingType } from '@/types/vineyard';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
    planting: NewVineyardPlanting;
    setPlanting: Dispatch<SetStateAction<NewVineyardPlanting>>;
};

const NewPlantingInformationsForm = ({ planting, setPlanting }: Props) => {
    return (
        <form className="w-full space-y-3">
            <div className="flex flex-col gap-2">
                <Label htmlFor="date">Planting type</Label>
                <Select
                    onValueChange={(plantingType) => {
                        setPlanting((old) => ({ ...old, plantingType: plantingType as PlantingType }));
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select the operation" />
                    </SelectTrigger>
                    <SelectContent>
                        {plantingValues.map((val: PlantingType, index: number) => (
                            <SelectItem key={index} value={val}>
                                {val}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>{' '}
            <div className="flex flex-col gap-2">
                <Label htmlFor="plantCount">Plant count</Label>
                <Input
                    id="plantCount"
                    type="number"
                    placeholder="123"
                    onChange={(e) => {
                        const inp = Number(e.currentTarget.value);
                        setPlanting((old) => ({ ...old, plantCount: inp }));
                    }}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="date">Planting date</Label>
                <DatePicker
                    id="date"
                    date={planting.action.date}
                    setDate={(newDate: Date) =>
                        setPlanting((old) => ({ ...old, action: { ...old.action, date: newDate } }))
                    }
                />
            </div>
        </form>
    );
};

export default NewPlantingInformationsForm;
