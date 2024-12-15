type MakeNonNullable<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};

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

export type NewVineyard = {
    name: string;
    altitude: number | null;
    soil: Soil;
    plants: number | null;
    varieties: Variety[];
};
export type VineyardId = number;
export type Vineyard = MakeNonNullable<NewVineyard, 'plants' | 'altitude'> & {
    id: VineyardId;
    trims: VineyardTrim[];
    cuts: VineyardCut[];
    plantings: VineyardPlanting[];
};

export type NewVineyardAction = {
    vineyardId: VineyardId;
    date: Date;
};

export type NewVineyardTrim = NewVineyardAction;
export type VineyardTrim = NewVineyardTrim & {
    id: number;
};

export type NewVineyardCut = NewVineyardAction;
export type VineyardCut = NewVineyardCut & {
    id: number;
};

export const plantingValues = ['Removal', 'Planting'] as const;
export type planting = (typeof plantingValues)[number] | '';
export type NewVineyardPlanting = {
    action: NewVineyardAction;
    plantingType: planting;
    plantCount: number;
};
export type VineyardPlanting = NewVineyardPlanting & {
    id: number;
};

//only ui types
export type View = 'table' | 'grid';

export const vineyardActionStr = ['trim', 'cut', 'planting', 'treatment', 'harvest'] as const;
export type vineyardAction = (typeof vineyardActionStr)[number];
