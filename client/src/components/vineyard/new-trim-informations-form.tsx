import { Dispatch, SetStateAction } from 'react';
import { Label } from '@/components/ui/label';
import { DatePicker } from '../ui/date-picker';

type Props = {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
};

const NewTrimInformationsForm = ({ date, setDate }: Props) => {
    return (
        <form>
            <div className="flex flex-col gap-2">
                <Label htmlFor="date">Trim date</Label>
                <DatePicker id="date" date={date} setDate={setDate} />
            </div>
        </form>
    );
};

export default NewTrimInformationsForm;
