-- action types and treatment types
CREATE TYPE action_type_enum AS ENUM ('trim', 'cut', 'planting', 'treatment', 'harvest');
CREATE TYPE treatment_type_enum AS ENUM ('fungicide', 'pesticide', 'fertilizer', 'irrigation');
CREATE TYPE planting_type_enum AS ENUM ('removal', 'planting');

-- store basic information about actions performed on the vineyard
CREATE TABLE vineyard_actions (
    id SERIAL PRIMARY KEY,
    vineyard_id INT NOT NULL REFERENCES vineyards(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    action_type action_type_enum NOT NULL,
    action_date TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- store details about the treatments performed on the vineyard
CREATE TABLE vineyard_treatments (
    id SERIAL PRIMARY KEY,
    action_id INT NOT NULL REFERENCES vineyard_actions(id) ON DELETE CASCADE,
    treatment_type treatment_type_enum NOT NULL,
    product_used TEXT NOT NULL,
    tratment_date TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- store details specific to the harvest operation
DROP TABLE IF EXISTS harvests;
CREATE TABLE harvests (
    id SERIAL PRIMARY KEY,
    action_id INT NOT NULL REFERENCES vineyard_actions(id) ON DELETE CASCADE,
    quality_notes TEXT NOT NULL, -- Notes on the quality of the harvest
    number_of_workers INT NOT NULL,
    date TIMESTAMPTZ DEFAULT now() NOT NULL,
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
    action_id INT NOT NULL REFERENCES vineyard_actions(id) ON DELETE CASCADE,
    planting_type planting_type_enum NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

