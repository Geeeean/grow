ALTER TABLE vineyards
ALTER COLUMN altitude TYPE INTEGER USING altitude::INTEGER;
