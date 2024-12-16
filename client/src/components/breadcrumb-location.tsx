import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useMediaQuery } from '@/hooks/use-media-query';
import { capitalize } from '@/utils/shared';
import { Link } from '@tanstack/react-router';

import { Fragment } from 'react';

type Props = {
    location: string;
    bcLast: string | undefined;
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

const BreadcrumbLocation = ({ location, bcLast }: Props) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const { parts, lastPart } = splitPath(location);

    return (
        <Breadcrumb className="grow">
            <BreadcrumbList className="max-w-full truncate flex-nowrap">
                <BreadcrumbItem>
                    <Link to="/">Home</Link>
                </BreadcrumbItem>
                {isDesktop ? (
                    parts.map((part, index) => (
                        <Fragment key={index}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="max-w-20 md:max-w-full">
                                <Link className="truncate" to={`/${parts.slice(0, index + 1).join('/')}`} key={index}>
                                    {capitalize(part)}
                                </Link>
                            </BreadcrumbItem>
                        </Fragment>
                    ))
                ) : parts.length > 0 ? (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>...</BreadcrumbItem>
                    </>
                ) : null}
                {lastPart != '' && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="max-w-20 md:max-w-full">
                            <BreadcrumbPage className="truncate">
                                {bcLast ? bcLast : capitalize(lastPart)}
                            </BreadcrumbPage>
                        </BreadcrumbItem>{' '}
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbLocation;
