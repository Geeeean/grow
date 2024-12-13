'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/utils/shared';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>> | ((date: Date) => void);
    id: string;
};

export function DatePicker({ date, setDate, id }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant={'outline'}
                    className={cn(
                        'justify-start text-left font-normal flex flex-row items-center gap-2',
                        !date && 'text-muted-foreground',
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
