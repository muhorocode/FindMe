# FindMe - Missing Persons Reporting Platform

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
