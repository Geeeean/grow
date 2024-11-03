export const soilValues = [
    'Calcareous',
    'Clay',
    'Sandy',
    'Gravelly',
    'Volcanic',
    'Schist',
    'Silty',
    'Alluvial',
    '',
] as const;
export type Soil = (typeof soilValues)[number];
export type Variety = { name: string; rows: number | null; age: number | null; id?: number };

export type VineyardAdd = {
    name: string;
    altitude: number | null;
    soil: Soil;
    plants: number | null;
    varieties: Variety[];
};

export type VineyardId = number;

export type Vineyard = VineyardAdd & {
    id: VineyardId;
};

export type VineyardTrimAdd = {
    vineyardId: VineyardId;
    date: Date;
};

export type VineyardTrim = VineyardTrimAdd & {
    id: number;
};

//interface types
export type View = 'table' | 'grid';
