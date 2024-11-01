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
export type soils = (typeof soilValues)[number];
export type variety = { variety: string; rows: number | null; age: number | null };

export type vineyard = {
    name: string;
    altitude: number | null;
    soil: soils;
    plants: number | null;
    varieties: variety[];
};

//interface types
export type view = 'table' | 'grid';
