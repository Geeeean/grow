import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import React from 'react';

type Props = {
    location: string;
};

function splitPath(path: string): { parts: string[]; lastPart: string } {
    const trimmedPath = path.replace(/^\/|\/$/g, '');

    const pathParts = trimmedPath.split('/');

    const lastPart = pathParts.pop() || '';
    return {
        parts: pathParts,
        lastPart: lastPart,
    };
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const BreadcrumbLocation = ({ location }: Props) => {
    const { parts, lastPart } = splitPath(location);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${parts.slice(0, index + 1).join('/')}`}>
                                {capitalize(part)}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
                {lastPart != '' && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{capitalize(lastPart)}</BreadcrumbPage>
                        </BreadcrumbItem>{' '}
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbLocation;
