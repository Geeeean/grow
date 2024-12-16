import { Variety } from '@/types/vineyard';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable, Filter } from '../ui/data-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import { ComponentType, ReactNode } from 'react';

const columns: ColumnDef<Variety>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'age',
        header: 'Age',
    },
    {
        accessorKey: 'rows',
        header: 'Rows',
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
                                Copy variety ID
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
    varieties: Variety[];
    filter?: Filter;
    BodyWrapper?: ComponentType<{ children: ReactNode }>;
    rowClassName?: string;
};

const VarietisTable = ({ varieties, filter, BodyWrapper = DefaultWrapper, rowClassName = '' }: Props) => {
    return (
        <DataTable
            columns={columns}
            data={varieties}
            filter={filter}
            BodyWrapper={BodyWrapper}
            rowClassName={rowClassName}
            columnSelector={false}
        />
    );
};

export default VarietisTable;
