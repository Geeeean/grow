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
export type Variety = { variety: string; rows: number | null; age: number | null; id?: number };

export type Vineyard = {
    name: string;
    altitude: number | null;
    soil: Soil;
    plants: number | null;
    varieties: Variety[];
    id?: number;
};

//interface types
export type View = 'table' | 'grid';
