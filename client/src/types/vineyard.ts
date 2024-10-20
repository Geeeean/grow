//data types
export type soils = 'Calcareous' | 'Clay' | 'Sandy' | 'Gravelly' | 'Volcanic' | 'Schist' | 'Silty' | 'Alluvial';

export type variety = { variety: string; rows: number; age: number };

export type vineyard = {
    name: string;
    altitude: number;
    soil: soils;
    plants: number;
    varieties: variety[];
};

//interface types
export type view = 'table' | 'grid';
