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

export type VineyardCutAdd = {
    vineyardId: VineyardId;
    date: Date;
};
export type VineyardCut = VineyardCutAdd & {
    id: number;
};

export const plantingValues = ['removal', 'planting'] as const;
export type planting = (typeof plantingValues)[number];
export type VineyardPlantingAdd = {
    vineyardId: VineyardId;
    date: Date;
    plantingType: planting;
};
export type VineyardPlanting = VineyardPlantingAdd & {
    id: number;
};

//only ui types
export type View = 'table' | 'grid';

export const vineyardActionStr = ['trim', 'cut', 'planting', 'treatment', 'harvest'] as const;
export type vineyardAction = (typeof vineyardActionStr)[number];
