import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { User } from '@/components/user';
import { capitalize, cn } from '@/utils/shared';
import { useSignOut } from '@/hooks/use-signout';
import {
    BookCheck,
    Cylinder,
    Grape,
    LogOut,
    Microscope,
    PieChart,
    ShieldCheck,
    Sprout,
    TicketCheck,
} from 'lucide-react';
import { GearIcon } from '@radix-ui/react-icons';

type NAV_ACTIONS = 'logout';

const NAV_ITEMS: {
    sectionName: string;
    elements: (
        | {
              copy: string;
              ref: string;
              icon: JSX.Element;
          }
        | {
              copy: string;
              action: NAV_ACTIONS;
              icon: JSX.Element;
          }
    )[];
}[] = [
    { sectionName: 'Analytics', elements: [{ copy: 'Dashboard', ref: '/', icon: <PieChart /> }] },
    {
        sectionName: 'Winery',
        elements: [
            { copy: 'Vineyards', ref: '/vineyards', icon: <Sprout /> },
            { copy: 'Harvests', ref: '/harvests', icon: <Grape /> },
            { copy: 'Cellar', ref: '/cellar', icon: <Cylinder /> },
            { copy: 'Wine Analysis', ref: '/analysis', icon: <Microscope /> },
        ],
    },
    {
        sectionName: 'Bureaucracy',
        elements: [
            { copy: 'Invoicing', ref: '/invoicing', icon: <BookCheck /> },
            { copy: 'Certifications', ref: '/certifications', icon: <ShieldCheck /> },
            { copy: 'Licenses and permits', ref: '/licenses', icon: <TicketCheck /> },
        ],
    },
    {
        sectionName: 'Setting & Account',
        elements: [
            { copy: 'Settings', ref: '/settings', icon: <GearIcon /> },
            { copy: 'Logout', action: 'logout', icon: <LogOut /> },
        ],
    },
];

const Nav: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    const { signOut } = useSignOut();
    const location = useLocation();

    return (
        <nav
            {...props}
            className={cn(
                'w-full flex-1 flex flex-col items-start justify-between px-2 text-lg font-medium gap-4',
                className,
            )}
        >
            <div className="space-y-4 w-full">
                {NAV_ITEMS.map((section, index) => (
                    <div className="w-full" key={index}>
                        <span className="ml-2 text-sm font-bold text-muted-foreground/30">{section.sectionName}</span>
                        {section.elements.map((element) => (
                            <>
                                {'ref' in element ? (
                                    <Link
                                        to={element.ref}
                                        key={element.ref}
                                        className={cn(
                                            'text-base font-normal w-full flex items-center gap-2 rounded-lg px-2 py-1 text-muted-foreground transition-all hover:text-primary',
                                            element.ref == location.pathname ? 'text-primary bg-primary/15' : '',
                                        )}
                                    >
                                        {element.icon}
                                        {element.copy}
                                    </Link>
                                ) : (
                                    <div
                                        onClick={() => {
                                            switch (element.action) {
                                                case 'logout':
                                                    signOut();
                                                    break;
                                            }
                                        }}
                                        className="font-normal text-base w-full flex items-center gap-2 rounded-lg px-2 py-1 text-muted-foreground transition-all hover:text-primary"
                                    >
                                        {element.icon}
                                        {capitalize(element.action)}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                ))}
            </div>
            <User />
        </nav>
    );
};

export default Nav;
