# LabFlow AI

LabFlow AI is a full-stack laboratory and research workflow management system.

The platform will help teams manage projects, experiments, tasks, equipment,
reservations, maintenance records, documents, and operational workflows.

An AI agent will analyze laboratory data, summarize project progress,
identify scheduling conflicts, recommend actions, and perform approved
operations through backend tools.

## Technology Stack

### Frontend
- Angular
- TypeScript
- Angular Material

### Backend
- Python
- FastAPI
- Pydantic

### Database
- PostgreSQL
- SQLAlchemy
- Alembic

### AI
- Claude
- Amazon Bedrock
- AI tool calling

### Cloud and DevOps
- AWS
- GitHub
- GitHub Actions

## Current Status

- [x] Initialize Git repository
- [x] Create Angular application
- [x] Create FastAPI application
- [x] Add backend health endpoint
- [ ] Connect Angular to FastAPI
- [ ] Add PostgreSQL
- [ ] Implement authentication
- [ ] Implement AI agent
- [ ] Deploy to AWS

## Project Structure

```text
labflow-ai/
├── backend/
│   ├── app/
│   └── requirements.txt
├── frontend/
├── docs/
├── .gitignore
└── README.md