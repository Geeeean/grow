import { Dispatch } from 'react';
import { Input } from '@/components/ui/input';
import { NewVineyardAction } from '@/hooks/use-new-vineyard-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Soil, soilValues } from '@/types/vineyard';

type Props = {
    dispatch: Dispatch<NewVineyardAction>;
};

const NewVineyardInformationsForm = ({ dispatch }: Props) => {
    return (
        <form className="w-full space-y-3">
            <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    placeholder="Vigneto delle Valli"
                    onChange={(e) => {
                        const inp = e.currentTarget.value;
                        dispatch({ type: 'SET_NAME', payload: inp });
                    }}
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="soil">Soil type</Label>
                <Select
                    onValueChange={(val: Soil) => {
                        dispatch({ type: 'SET_SOIL', payload: val });
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a soil type" />
                    </SelectTrigger>
                    <SelectContent>
                        {soilValues.map(
                            (val: Soil, index: number) =>
                                val != '' && (
                                    <SelectItem key={index} value={val}>
                                        {val}
                                    </SelectItem>
                                ),
                        )}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-1">
                <Label htmlFor="plants">Plants</Label>
                <Input
                    id="plants"
                    type="number"
                    placeholder="123"
                    onChange={(e) => {
                        const inp = e.currentTarget.value;
                        const parsed = Number(inp);

                        if (isNaN(parsed) || inp == '') dispatch({ type: 'SET_PLANTS', payload: null });
                        else dispatch({ type: 'SET_PLANTS', payload: parsed });
                    }}
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="altitude">Altitude [m]</Label>
                <Input
                    id="altitude"
                    type="number"
                    placeholder="123"
                    onChange={(e) => {
                        const inp = e.currentTarget.value;
                        const parsed = Number(inp);

                        if (isNaN(parsed) || inp == '') dispatch({ type: 'SET_ALTITUDE', payload: null });
                        else dispatch({ type: 'SET_ALTITUDE', payload: parsed });
                    }}
                />
            </div>
        </form>
    );
};

export default NewVineyardInformationsForm;
