ALTER TABLE grape_varieties
ADD COLUMN user_id UUID NOT NULL;

ALTER TABLE grape_varieties
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE;
