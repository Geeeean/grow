type Modify<T, R> = Omit<T, keyof R> & R;
type MakeNonNullable<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};

/*** VARIETY ***/
export const soilValues = [
    'Calcareous',
    'Clay',
    'Sandy',
    'Gravelly',
    'Volcanic',
    'Schist',
    'Silty',
    'Alluvial',
] as const;
export type Soil = (typeof soilValues)[number] | '';
type VarietyId = number;
export type NewVariety = {
    name: string;
    rows: number | null;
    age: number | null;
};
export type Variety = MakeNonNullable<NewVariety, 'rows' | 'age'> & { id: VarietyId };

/*** VINEYARD NOTES ***/
type NoteId = number;
export type NewVineyardNote = {
    content: string;
};
export type VineyardNote = NewVineyardNote & { id: NoteId };

/*** VINEYARD ***/
export type VineyardId = number;
export type NewVineyard = {
    name: string;
    altitude: number | null;
    soil: Soil;
    plants: number | null;
    varieties: NewVariety[];
};
export type Vineyard = Modify<MakeNonNullable<NewVineyard, 'plants' | 'altitude'>, { varieties: Variety[] }> & {
    id: VineyardId;
    trims: VineyardTrim[];
    cuts: VineyardCut[];
    plantings: VineyardPlanting[];
    treatments: VineyardTreatment[];
    harvests: VineyardHarvestId[];
    analysis: [];
    notes: VineyardNote[];
};

/*** VINEYARD ACTION ***/
export type NewVineyardAction = {
    vineyardId: VineyardId;
    date: Date;
};

/*** VINEYARD TRIM ***/
type VineyardTrimId = number;
export type NewVineyardTrim = NewVineyardAction;
export type VineyardTrim = NewVineyardTrim & {
    id: VineyardTrimId;
};

/*** VINEYARD CUT ***/
type VineyardCutId = number;
export type NewVineyardCut = NewVineyardAction;
export type VineyardCut = NewVineyardCut & {
    id: VineyardCutId;
};

/*** VINEYARD PLANTING ***/
type VineyardPlantingId = number;
export const plantingValues = ['Removal', 'Planting'] as const;
export type PlantingType = (typeof plantingValues)[number] | '';
export type NewVineyardPlanting = {
    action: NewVineyardAction;
    plantingType: PlantingType;
    plantCount: number;
};
export type VineyardPlanting = NewVineyardPlanting & {
    id: VineyardPlantingId;
};

/*** VINEYARD TREATMENT ***/
type VineyardTreatmentId = number;
export const treatmentValues = ['Fungicide', 'Pesticide', 'Fertilizer', 'Irrigation'] as const;
export type TreatmentType = (typeof vineyardActionStr)[number];
export type NewVineyardTreatment = {
    action: NewVineyardAction;
    product: string;
    treatmentType: TreatmentType;
};
export type VineyardTreatment = {
    action: NewVineyardAction;
    product: string;
    treatmentType: TreatmentType;
} & { id: VineyardTreatmentId };

/*** VINEYARD HARVEST ***/
/** harvest variety **/
type HarvestVarietyId = number;
export type NewHarvestVariety = {
    weight: number;
    grapeVarietyId: number;
    harvestId: number;
};
export type HarvestVariety = {
    weight: number;
    grapeVarietyId: number;
} & { id: HarvestVarietyId };

/** harvest **/
type VineyardHarvestId = number;
export type NewVineyardHarvest = {
    action: NewVineyardAction;
    qualityNotes: string;
    numberOfWorkers: number;
    varieties: NewHarvestVariety[];
};
export type VineyardHarvest = Modify<NewVineyardHarvest, { varieties: HarvestVariety[] }> & { id: VineyardHarvestId };

export const vineyardActionStr = ['trim', 'cut', 'planting', 'treatment', 'harvest'] as const;
export type vineyardAction = (typeof vineyardActionStr)[number];

//only ui types
export type View = 'table' | 'grid';

export const detailViewStr = ['overview', 'operations', 'harvests', 'analyses'] as const;
export type DetailView = (typeof detailViewStr)[number];
