# FindMe - Missing Persons Platform

> Community-driven platform for reporting and tracking missing persons

## 🎯 Project Overview

FindMe is a full-stack web application that enables community members to report and search for missing persons. The platform combines secure authentication, detailed reporting, and advanced search capabilities.

**Tech Stack:**
- **Backend:** Flask (Python), PostgreSQL, JWT Authentication
- **Frontend:** React, TailwindCSS
- **Media Storage:** Cloudinary
- **Database:** PostgreSQL (development & production)

---

## 📋 Table of Contents
1. [Team Roles & Responsibilities](#team-roles--responsibilities)
2. [Database Schema](#database-schema)
3. [API Endpoints](#api-endpoints)
4. [Development Setup](#development-setup)
5. [Git Workflow](#git-workflow)
6. [Testing Guidelines](#testing-guidelines)

---

## 👥 Team Roles & Responsibilities

### 👤 Person 1: Backend Lead & Authentication
**Branch:** `person1-dev` → `dev` → `main`

**Responsibilities:**
- Flask server setup and project structure
- User authentication system (register/login/logout)
- JWT token management
- Password hashing (bcrypt)
- User model and relationships

**Endpoints:**
```
POST   /api/auth/register     - User registration
POST   /api/auth/login        - User login  
GET    /api/auth/me           - Get current user
POST   /api/auth/logout       - User logout
```

**Dependencies:**
```
flask-bcrypt
PyJWT==2.8.0
```

---

### 👤 Person 2: Missing Persons CRUD (elijah-dev)
**Branch:** `elijah-dev` → `dev` → `main`

**Responsibilities:**
- Missing person reports CRUD operations
- Photo upload integration (Cloudinary)
- Data validation for report submissions
- MissingPerson model implementation

**Endpoints:**
```
POST   /api/missing-persons           - Create report
GET    /api/missing-persons           - List all reports (paginated)
GET    /api/missing-persons/:id       - Get specific report
PUT    /api/missing-persons/:id       - Update report
DELETE /api/missing-persons/:id       - Delete report (admin only)
```

**Model Fields (MissingPerson):**
```python
- id (Primary Key)
- full_name (required)
- age (required)
- gender (required)
- height, weight
- hair_color, eye_color
- distinguishing_features (text)
- last_seen_date (required)
- last_seen_location (required)
- last_seen_wearing (text)
- contact_name (required)
- contact_phone (required)
- contact_email
- status (default: 'missing')
- case_number (unique)
- additional_info (text)
- created_at, updated_at (auto)
```

**Dependencies:**
```
cloudinary
python-magic (file type validation)
```

---

### 👤 Person 3: Search & Filter System
**Branch:** `person3-dev` → `dev` → `main`

**Responsibilities:**
- Advanced search functionality
- Location-based filtering
- Date range filtering
- API documentation

**Endpoints:**
```
GET    /api/search?q=...&location=...&age_min=...    - Advanced search
GET    /api/missing-persons/location/:city           - Filter by city
GET    /api/missing-persons/recent                   - Recent reports (7 days)
GET    /api/missing-persons/stats                    - Platform statistics
```

**Query Parameters:**
- `q` - Name search (partial match)
- `location` - City/area filter
- `age_min`, `age_max` - Age range
- `gender` - Gender filter
- `status` - Case status (missing/found/closed)
- `page`, `per_page` - Pagination (default: 20 per page)

---

### 👤 Person 4: Frontend Lead & Core Pages
**Branch:** `person4-dev` → `dev` → `main`

**Responsibilities:**
- React app setup (Vite)
- Routing (React Router)
- Homepage and navigation
- Report submission form
- API integration service

**Pages:**
```
/                - Homepage with search bar & featured cases
/report          - Report missing person form
/about           - About the platform
```

**Components:**
- Navbar (with auth state)
- Footer
- ReportForm (multi-step form)
- SearchBar

---

### 👤 Person 5: Frontend Features & UI
**Branch:** `person5-dev` → `dev` → `main`

**Responsibilities:**
- Search results page
- Individual person detail page
- Community updates feed
- Responsive UI (TailwindCSS)

**Pages:**
```
/search          - Search results with filters
/person/:id      - Missing person detail profile
/updates         - Community updates feed
```

**Components:**
- PersonCard
- SearchFilters
- PersonDetail
- UpdatesFeed

---

## 🗄️ Database Schema

### **PostgreSQL Configuration**
**Database:** `findme_db`  
**User:** `findme_user`  
**Password:** `grouptwo`  
**Host:** `localhost:5432`

⚠️ **IMPORTANT:** Everyone must use PostgreSQL (no SQLite). Install:
```bash
# Ubuntu/Debian
sudo apt-get install postgresql libpq-dev

# Mac
brew install postgresql
```

### **Tables**

#### `missing_persons` (Person 2)
```sql
id                      SERIAL PRIMARY KEY
full_name               VARCHAR(100) NOT NULL
age                     INTEGER NOT NULL
gender                  VARCHAR(20) NOT NULL
height                  VARCHAR(20)
weight                  VARCHAR(20)
hair_color              VARCHAR(50)
eye_color               VARCHAR(50)
distinguishing_features TEXT
last_seen_date          TIMESTAMP NOT NULL
last_seen_location      VARCHAR(200) NOT NULL
last_seen_wearing       TEXT
contact_name            VARCHAR(100) NOT NULL
contact_phone           VARCHAR(20) NOT NULL
contact_email           VARCHAR(100)
status                  VARCHAR(20) DEFAULT 'missing'
case_number             VARCHAR(50) UNIQUE
additional_info         TEXT
photo_url               VARCHAR(300)
created_at              TIMESTAMP DEFAULT NOW()
updated_at              TIMESTAMP DEFAULT NOW()
```

#### `users` (Person 1)
```sql
id                      SERIAL PRIMARY KEY
username                VARCHAR(80) UNIQUE NOT NULL
email                   VARCHAR(120) UNIQUE NOT NULL
password_hash           VARCHAR(255) NOT NULL
is_admin                BOOLEAN DEFAULT FALSE
created_at              TIMESTAMP DEFAULT NOW()
```

---

## 🔌 API Endpoints Reference

### Base URL
```
Development: http://localhost:5000/api
Production: TBD
```

### Response Format
All responses follow this structure:
```json
{
  "success": true/false,
  "data": { ... },
  "message": "Optional message",
  "error": "Error details (if failed)"
}
```

### Authentication
Protected endpoints require JWT token:
```
Authorization: Bearer <token>
```

### Endpoints Summary

| Method | Endpoint | Auth Required | Owner |
|--------|----------|---------------|-------|
| POST | `/auth/register` | No | Person 1 |
| POST | `/auth/login` | No | Person 1 |
| GET | `/auth/me` | Yes | Person 1 |
| POST | `/missing-persons` | Yes | Person 2 |
| GET | `/missing-persons` | No | Person 2 |
| GET | `/missing-persons/:id` | No | Person 2 |
| PUT | `/missing-persons/:id` | Yes | Person 2 |
| DELETE | `/missing-persons/:id` | Yes (Admin) | Person 2 |
| GET | `/search` | No | Person 3 |
| GET | `/missing-persons/location/:city` | No | Person 3 |
| GET | `/missing-persons/recent` | No | Person 3 |

---

## 🚀 Development Setup

### Backend Setup (All Team Members)

1. **Clone and navigate:**
```bash
git clone https://github.com/muhorocode/FindMe.git
cd FindMe/Findme-backend
```

2. **Create virtual environment:**
```bash
python3 -m venv env
source env/bin/activate  # Mac/Linux
# env\Scripts\activate   # Windows
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Setup PostgreSQL database:**
```bash
# Login to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE findme_db;
CREATE USER findme_user WITH PASSWORD 'grouptwo';
GRANT ALL PRIVILEGES ON DATABASE findme_db TO findme_user;
\q
```

5. **Run migrations:**
```bash
flask db upgrade
```

6. **Start server:**
```bash
python app.py
# Server runs on http://localhost:5000
```

7. **Test health endpoint:**
```bash
curl http://localhost:5000/api/health
```

### Frontend Setup (Person 4 & 5)

1. **Navigate to frontend:**
```bash
cd findme-client
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start dev server:**
```bash
npm run dev
# Runs on http://localhost:5173
```

---

## 🌿 Git Workflow

### Branch Structure
```
main (protected - requires 2 approvals)
  ↑
dev (protected - requires 1 approval)
  ↑
feature branches (elijah-dev, person1-dev, etc.)
```

### Workflow Steps

1. **Create feature branch:**
```bash
git checkout dev
git pull origin dev
git checkout -b your-name-dev
```

2. **Make changes and commit:**
```bash
git add .
git commit -m "feat(module): description"
```

3. **Push to your branch:**
```bash
git push origin your-name-dev
```

4. **Create Pull Request:**
- Base: `dev` ← Compare: `your-name-dev`
- Request review from 1 teammate
- Wait for approval before merging

5. **After merge, update your branch:**
```bash
git checkout dev
git pull origin dev
git checkout your-name-dev
git merge dev
```

### Commit Message Format
```
feat(module): add new feature
fix(module): fix bug description
chore(module): update dependencies
docs: update README
test(module): add tests
```

---

## ⚠️ Important Guidelines

### Database
- **ALWAYS use PostgreSQL** - no SQLite in any branch
- **Run migrations** before pushing model changes
- **Never commit** migrations without testing

### Model Changes
- Person 2 owns `MissingPerson` model
- Person 1 owns `User` model
- Coordinate before changing shared fields

### API Contracts
- Document all endpoint changes in this README
- Use consistent response format
- Version breaking changes (e.g., `/api/v2/...`)

### Dependencies
- Add new packages to `requirements.txt` or `package.json`
- Document why dependency is needed
- Check for conflicts before adding

### Before Pushing
```bash
# Backend checklist
python app.py  # Verify server starts
flask db upgrade  # Test migrations
pytest  # Run tests

# Frontend checklist
npm run build  # Verify build works
npm run lint  # Check code style
```

---

## 🧪 Testing Guidelines

### Backend Tests (pytest)
```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_missing_persons.py

# Run with coverage
pytest --cov=.
```

### Test Structure
```
tests/
  test_auth.py          - Person 1
  test_missing_persons.py - Person 2
  test_search.py        - Person 3
```

---

## 📞 Communication

### Daily Standups (Async)
Post in team chat:
- What I completed yesterday
- What I'm working on today
- Any blockers

### Conflict Resolution
If you encounter merge conflicts:
1. Don't panic
2. Check this README for "source of truth"
3. Communicate with affected team member
4. Resolve locally, test, then push

### Questions
- Check README first
- Ask in team chat
- Tag relevant person (@person2 for model questions)

---

## 📚 Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [JWT Introduction](https://jwt.io/introduction)

---

## 🔄 Changelog

| Date | Author | Change |
|------|--------|--------|
| 2025-11-14 | Person 2 (Elijah) | Initial setup: PostgreSQL config, MissingPerson model, migrations |
| 2025-11-14 | Person 1 | Added auth system placeholder |

---

**Last Updated:** November 14, 2025  
**Maintained by:** All team members - Missing Persons Reporting Platform

> **Monorepo Architecture**: Full-stack application with Flask backend and React frontend

## Project Structure

```
FindMe/
├── Findme-backend/      # Flask REST API
└── findme-client/       # React + Vite
```

## Tech Stack

### Backend (Flask)
- **Framework**: Flask 3.0.3
- **Database**: SQLAlchemy 2.0.44 + SQLite
- **Migrations**: Alembic 1.13.1
- **Testing**: Pytest 8.4.2
- **CORS**: Flask-CORS 4.0.0

### Frontend (React)
- **Framework**: React 18
- **Build Tool**: Vite 5.x
- **HTTP Client**: Axios

## Getting Started

### Prerequisites
- Python 3.13+
- Node.js 20.x+
- npm

### Backend Setup

```bash
cd Findme-backend

# Create virtual environment
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
python app.py
```

**Backend runs on**: `http://localhost:5000`

### Frontend Setup

```bash
cd findme-client

# Install dependencies
npm install

# Run development server
npm run dev
```

**Frontend runs on**: `http://localhost:5173`

## Backend Architecture

```
Findme-backend/
├── models/          # Database models (SQLAlchemy)
├── controllers/     # Business logic layer
├── routes/          # API endpoints (Blueprint registration)
├── database/        # SQLite database files
├── tests/           # Unit and integration tests
├── config.py        # Configuration management
└── app.py           # Application entry point
```

### Design Patterns
- **MVC Architecture**: Separation of concerns
- **Blueprint Pattern**: Modular route organization
- **Factory Pattern**: Application configuration

## API Endpoints (Planned)

### Missing Persons

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/missing` | List all missing persons |
| POST | `/api/missing` | Create new report |
| GET | `/api/missing/<id>` | Get specific report |
| PUT | `/api/missing/<id>` | Update report status |
| DELETE | `/api/missing/<id>` | Delete report |

## Testing

### Backend Tests
```bash
cd Findme-backend
pytest
```

### Frontend Tests
```bash
cd findme-client
npm run test
```

## Environment Variables

Create `.env` in `Findme-backend/`:

```env
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///database/missing_persons.db
FLASK_ENV=development
```

## Team Collaboration

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature development

## Development Guidelines

### API Design Principles
- RESTful conventions
- JSON response format
- Proper HTTP status codes
- Error handling middleware
- Input validation

## Roadmap

- Project setup and structure
- Database models and migrations
- CRUD API endpoints
- User authentication (JWT)
- Real-time notifications
- Google Maps integration
- SMS alerts
- Admin dashboard
- Mobile responsive design

## Contributors

- Elijah Kamanga
- James Wachira
- Demestrine Awuor
- Eva Chemngorem
- Ian Tuitoek

## License

MIT License

---

**Built by the finders for Phase 4 - Moringa School**
