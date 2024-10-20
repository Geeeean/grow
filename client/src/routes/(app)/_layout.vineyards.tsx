import { createFileRoute } from '@tanstack/react-router';
import VineyardsTable from '@/components/vineyards-table';

import { view, vineyard } from '@/types/vineyard';
import VineyardControls from '@/components/vineyards-controls';
import { useState } from 'react';
import VineyardsGrid from '@/components/vineyards-grid';

const VINEYARDS: vineyard[] = [
    {
        name: 'Vigneto delle Colline',
        altitude: 324,
        soil: 'Clay',
        plants: 132,
        varieties: [
            { variety: 'Sangiovese', rows: 10, age: 25 },
            { variety: 'Merlot', rows: 8, age: 15 },
        ],
    },
    {
        name: 'Vigneto del Sole',
        altitude: 450,
        soil: 'Calcareous',
        plants: 250,
        varieties: [
            { variety: 'Nebbiolo', rows: 15, age: 30 },
            { variety: 'Barbera', rows: 12, age: 20 },
            { variety: 'Dolcetto', rows: 8, age: 18 },
        ],
    },
    {
        name: 'Tenuta La Rocca',
        altitude: 600,
        soil: 'Sandy',
        plants: 300,
        varieties: [{ variety: 'Syrah', rows: 20, age: 22 }],
    },
    {
        name: 'Podere San Pietro',
        altitude: 200,
        soil: 'Volcanic',
        plants: 180,
        varieties: [
            { variety: 'Aglianico', rows: 14, age: 35 },
            { variety: 'Fiano', rows: 10, age: 12 },
        ],
    },
    {
        name: 'Vigneto del Fiume',
        altitude: 150,
        soil: 'Alluvial',
        plants: 220,
        varieties: [
            { variety: 'Pinot Noir', rows: 25, age: 28 },
            { variety: 'Cabernet Sauvignon', rows: 18, age: 22 },
            { variety: 'Sauvignon Blanc', rows: 15, age: 12 },
        ],
    },
    {
        name: 'Vigneto delle Valli',
        altitude: 380,
        soil: 'Schist',
        plants: 270,
        varieties: [{ variety: 'Riesling', rows: 12, age: 14 }],
    },
    {
        name: 'Tenuta Monteverde',
        altitude: 520,
        soil: 'Gravelly',
        plants: 190,
        varieties: [
            { variety: 'Grenache', rows: 14, age: 18 },
            { variety: 'Tempranillo', rows: 10, age: 20 },
        ],
    },
];

export const Route = createFileRoute('/(app)/_layout/vineyards')({
    component: () => <Vineyards />,
});

const Vineyards = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [view, setView] = useState<view>('grid');

    return (
        <div className="h-full flex flex-col gap-2">
            <div>
                <p className="font-medium text-lg">Vineyards</p>
                <p className="text-muted-foreground text-sm">Manage your vinewyards and view their infos.</p>
            </div>
            <VineyardControls setOpen={setOpen} view={view} setView={setView} />
            <div className="flex-1 overflow-y-auto">
                {view === 'grid' ? <VineyardsGrid vineyards={VINEYARDS} /> : <VineyardsTable vineyards={VINEYARDS} />}
            </div>
            <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> vineyards
            </div>
        </div>
    );
};
