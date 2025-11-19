BEGIN;

CREATE TABLE alembic_version (
    version_num VARCHAR(32) NOT NULL, 
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Running upgrade  -> 379bf463965d

DROP TABLE missing_person;

ALTER TABLE missing_persons ADD COLUMN photo_url VARCHAR(300);

INSERT INTO alembic_version (version_num) VALUES ('379bf463965d') RETURNING alembic_version.version_num;

COMMIT;

