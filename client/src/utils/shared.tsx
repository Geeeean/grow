import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { action } from '@/types/shared';

import { Trash, Pen } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const actionCopy: Record<action, string> = {
    delete: 'Delete',
    edit: 'Edit',
};

const actionIcon: Record<action, (className?: string) => JSX.Element> = {
    delete: (className) => <Trash className={className} />,
    edit: (className) => <Pen className={className} />,
};

export const getActionIcon = (action: action, className?: string) => {
    return actionIcon[action](className);
};
