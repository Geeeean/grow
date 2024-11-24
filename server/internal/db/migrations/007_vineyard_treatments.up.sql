CREATE TABLE vineyard_treatments (
    id SERIAL PRIMARY KEY,
    action_id INT NOT NULL REFERENCES vineyard_actions(id) ON DELETE CASCADE,
    product TEXT NOT NULL,
    notes TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

