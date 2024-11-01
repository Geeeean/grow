import { Dispatch } from 'react';
import { VineyardAction } from './vineyard-add';
import { Label } from './ui/label';
import { Input } from './ui/input';

import { Plus, X } from 'lucide-react';
import { Variety } from '@/types/vineyard';

type Props = {
    dispatch: Dispatch<VineyardAction>;
    varieties: Variety[];
};

const VineyardAddVarieties = ({ varieties, dispatch }: Props) => {
    return (
        <div className="w-full space-y-3">
            <div className="space-y-1">
                <Label htmlFor="name">Varieties</Label>

                <div className="bg-secondary/30 ring-1 p-2 rounded-md space-y-2 relative">
                    {varieties.length > 0 && (
                        <div className="p-1 max-h-52 overflow-auto space-y-1">
                            <div className="backdrop-blur-lg grid items-center grid-cols-[1fr_60px_60px_30px] gap-1 sticky top-0 py-2 rounded-md">
                                <Label className="">Name</Label>
                                <Label className="">Rows</Label>
                                <Label className="">Age</Label>
                            </div>
                            {varieties.map((variety: Variety, index: number) => (
                                <div key={index} className="grid items-center grid-cols-[1fr_60px_60px_30px] gap-1">
                                    <Input
                                        value={variety.variety}
                                        className="bg-background-dark"
                                        placeholder={`Variety ${String.fromCharCode(97 + index).toUpperCase()}`}
                                        onChange={(e) => {
                                            const inp = e.currentTarget.value;
                                            dispatch({
                                                type: 'UPDATE_VARIETY',
                                                payload: {
                                                    index: index,
                                                    variety: {
                                                        ...variety,
                                                        variety: inp,
                                                    },
                                                },
                                            });
                                        }}
                                    />
                                    <Input
                                        value={variety.age ?? ''}
                                        className="bg-background-dark"
                                        placeholder="0"
                                        onChange={(e) => {
                                            const inp = e.currentTarget.value;
                                            const parsed = Number(inp);

                                            dispatch({
                                                type: 'UPDATE_VARIETY',
                                                payload: {
                                                    index: index,
                                                    variety: {
                                                        ...variety,
                                                        age: isNaN(parsed) || inp == '' ? null : parsed,
                                                    },
                                                },
                                            });
                                        }}
                                    />
                                    <Input
                                        value={variety.rows ?? ''}
                                        className="bg-background-dark"
                                        placeholder="0"
                                        onChange={(e) => {
                                            const inp = e.currentTarget.value;
                                            const parsed = Number(inp);

                                            dispatch({
                                                type: 'UPDATE_VARIETY',
                                                payload: {
                                                    index: index,
                                                    variety: {
                                                        ...variety,
                                                        rows: isNaN(parsed) || inp == '' ? null : parsed,
                                                    },
                                                },
                                            });
                                        }}
                                    />
                                    <X
                                        className="justify-self-center cursor-pointer"
                                        onClick={() => dispatch({ type: 'REMOVE_VARIETY', payload: index })}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <span
                        onClick={() => dispatch({ type: 'APPEND_VARIETY' })}
                        className="cursor-pointer flex items-center gap-1 text-muted-foreground"
                    >
                        <Plus /> add variety
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VineyardAddVarieties;