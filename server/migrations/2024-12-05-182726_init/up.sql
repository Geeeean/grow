CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TYPE soil_type AS ENUM ('calcareous','clay','sandy','gravelly','volcanic','schist','silty','alluvial');
cREATE TYPE action_type AS ENUM ('trim', 'cut', 'planting', 'treatment', 'harvest');
CREATE TYPE treatment_type AS ENUM ('fungicide', 'pesticide', 'fertilizer', 'irrigation');
CREATE TYPE planting_type AS ENUM ('removal', 'planting');

CREATE TABLE vineyards (
    id SERIAL PRIMARY KEY, -- Unique identifier for the vineyard
    name TEXT NOT NULL, -- Name of the vineyard
    altitude INTEGER NOT NULL, -- Altitude of the vineyard in meters, can be NULL
    soil soil_type NOT NULL, -- Soil type
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL, -- Owner of the vineyard
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL -- Record creation date
);

CREATE TABLE grape_varieties (
    id SERIAL PRIMARY KEY, -- Unique identifier for the grape variety
    name TEXT NOT NULL, -- Name of the grape variety
    rows INTEGER NOT NULL, -- Number of rows
    age INTEGER NOT NULL, -- Age of the grapevines
    vineyard_id INTEGER REFERENCES vineyards(id) ON DELETE CASCADE NOT NULL, -- Foreign key reference to the vineyard
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL, -- Record creation date
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL -- ID of the user who created the harvest record
);


-- store basic information about actions performed on the vineyard
CREATE TABLE vineyard_actions (
    id SERIAL PRIMARY KEY,
    vineyard_id INT NOT NULL REFERENCES vineyards(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    action_type action_type NOT NULL,
    action_date TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- store details about the treatments performed on the vineyard
CREATE TABLE vineyard_treatments (
    id SERIAL PRIMARY KEY,
    vineyard_action_id INT NOT NULL REFERENCES vineyard_actions(id) ON DELETE CASCADE,
    treatment_type treatment_type NOT NULL,
    product TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- store details specific to the harvest operation
CREATE TABLE harvests (
    id SERIAL PRIMARY KEY,
    vineyard_action_id INT NOT NULL REFERENCES vineyard_actions(id) ON DELETE CASCADE,
    quality_notes TEXT NOT NULL, -- Notes on the quality of the harvest
    number_of_workers INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE harvest_grape_varieties (
    id SERIAL PRIMARY KEY,
    harvest_id INT NOT NULL REFERENCES harvests(id) ON DELETE CASCADE,
    grape_variety_id INT NOT NULL REFERENCES grape_varieties(id),
    total_weight DECIMAL NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- store operations related to planting or removal of plants
CREATE TABLE vineyard_plantings (
    id SERIAL PRIMARY KEY,
    vineyard_action_id INT NOT NULL REFERENCES vineyard_actions(id) ON DELETE CASCADE,
    planting_type planting_type NOT NULL,
    plant_count INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
