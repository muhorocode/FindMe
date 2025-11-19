-- Migration SQL for Render: Add all missing columns to missing_persons

ALTER TABLE missing_persons ADD COLUMN user_id INTEGER;
ALTER TABLE missing_persons ADD COLUMN full_name VARCHAR(100) NOT NULL;
ALTER TABLE missing_persons ADD COLUMN age INTEGER NOT NULL;
ALTER TABLE missing_persons ADD COLUMN gender VARCHAR(20) NOT NULL;
ALTER TABLE missing_persons ADD COLUMN height VARCHAR(20);
ALTER TABLE missing_persons ADD COLUMN weight VARCHAR(20);
ALTER TABLE missing_persons ADD COLUMN hair_color VARCHAR(50);
ALTER TABLE missing_persons ADD COLUMN eye_color VARCHAR(50);
ALTER TABLE missing_persons ADD COLUMN distinguishing_features TEXT;
ALTER TABLE missing_persons ADD COLUMN last_seen_date TIMESTAMP NOT NULL;
ALTER TABLE missing_persons ADD COLUMN last_seen_location VARCHAR(200) NOT NULL;
ALTER TABLE missing_persons ADD COLUMN last_seen_wearing TEXT;
ALTER TABLE missing_persons ADD COLUMN contact_name VARCHAR(100) NOT NULL;
ALTER TABLE missing_persons ADD COLUMN contact_phone VARCHAR(20) NOT NULL;
ALTER TABLE missing_persons ADD COLUMN contact_email VARCHAR(100);
ALTER TABLE missing_persons ADD COLUMN status VARCHAR(20) DEFAULT 'missing';
ALTER TABLE missing_persons ADD COLUMN case_number VARCHAR(50) UNIQUE;
ALTER TABLE missing_persons ADD COLUMN additional_info TEXT;
ALTER TABLE missing_persons ADD COLUMN photo_url VARCHAR(300);
ALTER TABLE missing_persons ADD COLUMN created_at TIMESTAMP DEFAULT NOW();
ALTER TABLE missing_persons ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
