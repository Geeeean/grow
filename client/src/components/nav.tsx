import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { User } from './ui/user';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
    { sectionName: 'Analytics', refs: [{ copy: 'Dashboard', ref: '/' }] },
    {
        sectionName: 'Winery',
        refs: [
            { copy: 'Vineyards', ref: '/vineyards' },
            { copy: 'Harvests', ref: '/harvests' },
            { copy: 'Cellar', ref: '/cellar' },
            { copy: 'Wine Analysis', ref: '/analysis' },
        ],
    },
    {
        sectionName: 'Bureaucracy',
        refs: [
            { copy: 'Invoicing', ref: '/invoicing' },
            { copy: 'Certifications', ref: '/certifications' },
            { copy: 'Licenses and permits', ref: '/licenses' },
        ],
    },
];

const Nav: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    const location = useLocation();

    return (
        <nav
            {...props}
            className={cn(
                'w-full flex-1 flex flex-col items-start justify-between px-2 py-4 text-lg font-medium lg:px-4 gap-4',
                className,
            )}
        >
            <div className="space-y-4 w-full">
                {NAV_ITEMS.map((section, index) => (
                    <div className="w-full" key={index}>
                        <span className="ml-2 text-sm font-bold text-muted-foreground/30">{section.sectionName}</span>
                        {section.refs.map((ref) => (
                            <Link
                                to={ref.ref}
                                key={ref.ref}
                                className={cn(
                                    'text-base w-full flex items-center gap-3 rounded-lg px-2 py-1 text-muted-foreground transition-all hover:text-primary',
                                    ref.ref == location.pathname ? 'text-secondary-foreground bg-secondary' : '',
                                )}
                            >
                                {ref.copy}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>

            <User
                main="Violoni Gianluca"
                sub="violoni.gianluca@gmail.com"
                image="https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=luca"
                fallback="VG"
            />
        </nav>
    );
};

export default Nav;
