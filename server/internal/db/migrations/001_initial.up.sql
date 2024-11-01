CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table for harvests
CREATE TABLE harvests (
    id SERIAL PRIMARY KEY, -- Unique identifier for the harvest
    grape_variety TEXT NOT NULL, -- Grape variety
    quantity_collected DECIMAL(10, 2) NOT NULL, -- Quantity of grapes collected in kg
    quality_notes TEXT NOT NULL, -- Notes on the quality of the harvest
    harvest_date TIMESTAMPTZ DEFAULT now() NOT NULL, -- Harvest date
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL, -- Record creation date
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL -- ID of the user who created the harvest record
);
