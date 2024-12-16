import { VineyardTrim } from '@/types/vineyard';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable, Filter } from '../ui/data-table';
import { format } from 'date-fns';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { CalendarArrowDown, CalendarArrowUp, MoreHorizontal } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { ComponentType, ReactNode } from 'react';

const columns: ColumnDef<VineyardTrim>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'date',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="p-0 h-fit hover:bg-transparent flex gap-2 items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Date
                    {column.getIsSorted() === 'asc' ? <CalendarArrowDown /> : <CalendarArrowUp />}
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.original.date);

            return format(date, 'PPP');
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const trim = row.original;

            return (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(trim.id))}>
                                Copy trim ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

const DefaultWrapper: ComponentType<{ children: ReactNode }> = ({ children }) => (
    <div className="rounded-md border">{children}</div>
);

type Props = {
    trims: VineyardTrim[];
    filter?: Filter;
    BodyWrapper?: ComponentType<{ children: ReactNode }>;
    rowClassName?: string;
};

const TrimTable = ({ trims, filter, BodyWrapper = DefaultWrapper, rowClassName = '' }: Props) => {
    return (
        <DataTable
            columns={columns}
            data={trims}
            filter={filter}
            BodyWrapper={BodyWrapper}
            rowClassName={rowClassName}
        />
    );
};

export default TrimTable;
