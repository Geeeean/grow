CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Tabella per le vendemmie
CREATE TABLE harvests (
    id SERIAL PRIMARY KEY, -- Identificatore unico per la vendemmia
    grape_variety TEXT NOT NULL, -- Varietà di uva
    quantity_collected DECIMAL(10, 2) NOT NULL, -- Quantità di uva raccolta in kg
    quality_notes TEXT NOT NULL, -- Note sulla qualità della vendemmia
    harvest_date TIMESTAMPTZ DEFAULT now() NOT NULL, -- Data della vendemmia
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL, -- Data di creazione del record
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL -- ID dell'utente che ha creato la vendemmia
);
