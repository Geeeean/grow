CREATE TYPE soil_type AS ENUM (
    'Calcareous',
    'Clay',
    'Sandy',
    'Gravelly',
    'Volcanic',
    'Schist',
    'Silty',
    'Alluvial'
);

CREATE TABLE vineyards (
    id SERIAL PRIMARY KEY, -- Unique identifier for the vineyard
    name TEXT NOT NULL, -- Name of the vineyard
    altitude DECIMAL(5, 2), -- Altitude of the vineyard in meters, can be NULL
    soil soil_type, -- Soil type
    plants INTEGER NOT NULL, -- Number of plants
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL, -- Owner of the vineyard
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL -- Record creation date
);

CREATE TABLE grape_varieties (
    id SERIAL PRIMARY KEY, -- Unique identifier for the grape variety
    name TEXT NOT NULL, -- Name of the grape variety
    rows INTEGER NOT NULL, -- Number of rows
    age INTEGER NOT NULL, -- Age of the grapevines
    vineyard_id INTEGER REFERENCES vineyards(id) ON DELETE CASCADE NOT NULL, -- Foreign key reference to the vineyard
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL -- Record creation date
);
