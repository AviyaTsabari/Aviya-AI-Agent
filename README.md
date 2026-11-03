# Aviya AI Agent

An AI-powered personal career agent that represents my professional background, technical skills, software projects, and experience.

The system allows recruiters and hiring managers to ask questions about my experience and receive focused, relevant answers through an interactive chat interface.

## About the Project

Recruiters often review many resumes in a limited amount of time.

Instead of presenting only a static resume, this project provides an interactive AI agent that can answer questions about:

* My technical skills
* My education
* My software projects
* My professional experience
* My problem-solving abilities
* The types of roles I am interested in

The project is built as a full-stack application using Angular and FastAPI.

## Current Status

The project currently includes:

* Angular frontend with profile, skills, projects, experience, and chat pages
* FastAPI backend with knowledge and chat APIs
* A structured personal knowledge base in JSON
* Recruiter chat that answers as Aviya
* Optional Claude integration when `ANTHROPIC_API_KEY` is set
* A local knowledge-base fallback so chat works without an API key

## Planned Features

* Interactive recruiter chat
* Structured personal profile
* Skills and technologies database
* Software project knowledge base
* Context-aware answers
* Hebrew and English support
* Conversation history
* PostgreSQL integration
* Resume download
* GitHub project links
* Deployment to a public environment

## Example Questions

The agent will be able to answer questions such as:

* What are Aviya's strongest technical skills?
* What backend technologies has she worked with?
* Tell me about her compiler project.
* What experience does she have with databases?
* Which project best demonstrates her problem-solving abilities?
* Does she have experience with reverse engineering?
* What type of role is she looking for?
* Why could she be a good candidate for a junior software development role?

## Tech Stack

### Frontend

* Angular
* TypeScript
* HTML
* CSS

### Backend

* Python
* FastAPI
* Pydantic
* Uvicorn

### Database

* PostgreSQL — planned integration

### Development Tools

* Git
* GitHub
* Visual Studio Code
* Claude Code
* PowerShell

## Project Structure

```text
Aviya-AI-Agent/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   ├── .venv/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   └── index.html
│   ├── angular.json
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## Running the Project Locally

### Backend

Open a terminal in the `backend` directory:

```powershell
cd backend
```

Create a virtual environment:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the dependencies:

```powershell
python -m pip install -r requirements.txt
```

Run the FastAPI server:

```powershell
python -m uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

### Frontend

Open another terminal in the `frontend` directory:

```powershell
cd frontend
```

Install the dependencies:

```powershell
npm install
```

Run the Angular application:

```powershell
npx ng serve
```

The frontend will be available at:

```text
http://localhost:4200
```

## API Endpoints

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "healthy"
}
```

### Knowledge and chat

```text
GET  /api/profile
GET  /api/projects
GET  /api/skills
GET  /api/experience
GET  /api/knowledge
POST /api/chat
```

`POST /api/chat` accepts `{ "message": "...", "history": [] }` and returns `{ "reply": "..." }`.

## Development Roadmap

### Phase 1 — Rebranding

* Rename the project
* Update the frontend title
* Update the FastAPI application information
* Replace the original README

### Phase 2 — Personal Knowledge Base

* Add professional profile data
* Add education information
* Add skills
* Add work experience
* Add software projects

### Phase 3 — Chat System

* Build the Angular chat interface
* Add chat request and response models
* Create a FastAPI chat endpoint
* Generate answers from structured profile information

### Phase 4 — Database

* Connect PostgreSQL
* Store profile and project information
* Store conversation history
* Add database models and migrations

### Phase 5 — AI Integration

* Integrate a language model
* Retrieve relevant information before generating answers
* Prevent unsupported or inaccurate answers
* Add prompt and response validation

### Phase 6 — Deployment

* Deploy the backend
* Deploy the frontend
* Add environment configuration
* Publish a live version for recruiters

## Purpose

This project demonstrates practical experience with:

* Full-stack development
* REST API design
* Angular frontend development
* Python backend development
* Modular architecture
* Database integration
* AI-assisted applications
* Git and GitHub workflows
* Product-oriented thinking

## Author

**Aviya Yosef**

Computer Science graduate with experience in software development, databases, compiler construction, algorithms, and reverse engineering.

## Repository

```text
https://github.com/AviyaTsabari/Aviya-AI-Agent
```
