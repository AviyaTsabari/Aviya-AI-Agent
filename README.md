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

## ScreenShots

<div align="center">
  <img src="https://github.com/user-attachments/assets/43f9335f-0686-4c33-961c-c29c28de4b36" width="180" />
  <img src="https://github.com/user-attachments/assets/9a25000c-c2ce-4c7b-9190-2e90dc51ba95" width="180" />
  <br/>
  <img src="https://github.com/user-attachments/assets/aedad9b6-871c-471b-921c-522476c43819" width="180" />
  <img src="https://github.com/user-attachments/assets/232cf4c6-a641-4eab-91b2-372a89f19eda" width="180" />
  <br/>
  <img src="https://github.com/user-attachments/assets/6032aa38-0b7d-48c4-815b-46130bb7f35d" width="180" />
  <img src="https://github.com/user-attachments/assets/25c3b29f-a163-441b-b1e7-339d34473d33" width="180" />
</div>

## Current Status

The project currently includes:

* Angular frontend with profile, skills, projects, experience, and chat pages
* FastAPI backend with knowledge and chat APIs
* A structured personal knowledge base in JSON
* Recruiter chat that answers as Aviya Yosef, in English or Hebrew
* Optional Claude integration when `ANTHROPIC_API_KEY` is set
* A local knowledge-base fallback so chat works without an API key
* A topic filter that refuses non-professional questions before any model call
* Environment-based API URL and CORS, so the same code can run locally or against a deployed API

## Example Questions

The agent answers questions such as:

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

* Angular 22, standalone components
* TypeScript
* Angular Router and HttpClient
* SCSS

### Backend

* Python
* FastAPI
* Pydantic
* Uvicorn
* Anthropic SDK, used only when an API key is present

### Data

* JSON files in `data/`, read by the API on each request
* PostgreSQL is a planned later step, not part of the current runtime

### Development Tools

* Git and GitHub
* npm
* PowerShell

## Architecture

The application is two processes that talk over HTTP. The browser never reads `data/` directly, and the model never talks to the browser.

```text
Browser (Angular)
    │
    │  GET /health
    │  GET /api/profile | /skills | /projects | /experience
    │  POST /api/chat
    ▼
FastAPI
    ├── knowledge router  →  knowledge_service  →  data/*.json
    └── chat router       →  content filter
                              ├── blocked topic → fixed reply
                              ├── API key set   → Claude, with the JSON embedded in the system prompt
                              └── no API key    → offline reply from the same JSON
```

### Why the split looks like this

The frontend is a presentation client. Profile, projects, skills, and experience are read-only pages. Chat is the only write-shaped call, and even that does not persist anything on the server. The backend owns the knowledge base and the rules for how answers are produced. That keeps the resume data in one place and lets the pages and the chat share it.

There is no authentication. The site is meant to be public. The API does not store accounts, sessions, or conversation history.

### Frontend layout

Angular is organized by responsibility, not by file type:

```text
frontend/src/app/
├── core/                 models and HTTP services
├── features/             one folder per page: home, profile, projects, skills, experience, chat
└── shared/components/    header, footer, loading spinner, error message
```

`core` is the only layer that knows the API URL. Feature components call a service and render the result. They do not build request URLs themselves.

Components are standalone. Application state that a template reads is an Angular signal. There is no global store: each page loads its own resource when it is created, and the chat component keeps its own message list.

Routes are registered eagerly in `app.routes.ts`. An earlier version lazy-loaded each page. That made Profile and Projects depend on a second JavaScript request after the app had already loaded. If that request failed, the click did nothing and the user stayed on the current page. The pages are small, so they are part of the main bundle and navigation does not wait on another chunk.

`vercel.json` rewrites every path to `index.html`. That is what lets a host such as Vercel serve `/profile` and `/chat` as client-side routes instead of looking for those files on disk.

### Backend layout

```text
backend/app/
├── main.py                      app, CORS, health
├── api/knowledge.py             read endpoints
├── api/chat.py                  request validation and the chat endpoint
└── services/
    ├── knowledge_service.py     loads data/*.json
    ├── content_filter.py        refuses non-professional topics
    ├── chat_service.py          chooses Claude or the offline reply
    └── offline_chat.py          answers from the JSON when no API key is set
```

Routers stay thin. They validate input and call a service. Services do not know about HTTP status codes, except that `chat.py` turns an unexpected model failure into HTTP 502 so the browser can show a retry instead of a stack trace.

### Knowledge base

`data/` holds four documents:

| File | Shape | Used by |
| --- | --- | --- |
| `profile.json` | one profile object | Profile page and chat |
| `skills.json` | `{ "categories": [...] }` | Skills page and chat |
| `projects.json` | `{ "projects": [...] }` | Projects page and chat |
| `experience.json` | `{ "experience": [...] }` | Experience page and chat |

`GET /api/knowledge` returns all four together. Chat uses that combined document so the model and the offline fallback see the same facts as the pages.

The files are read on every request. They are not cached in memory. Editing a JSON file shows up on the next API call without restarting Uvicorn. The dataset is small, so the cost of reading it each time is irrelevant, and a cache previously kept the Profile page on a stale name after the file had already changed.

PostgreSQL is still on the roadmap for conversation history and for data that should change without a deploy. It is not required for the current product: the knowledge base is content I edit in git, not records users create.

### Chat pipeline

`POST /api/chat` is stateless. The browser sends the new message and the previous messages. The server answers and forgets the exchange. Refreshing the page starts a new conversation. That avoids a database and makes the endpoint easy to reason about. The request caps history at 40 messages so a long tab cannot grow the prompt without limit.

The order inside `get_chat_response` is deliberate:

1. **Topic filter.** A fixed list of non-professional topics is rejected in code, before any model call. The same rule is repeated in the system prompt so a model reply follows it too. The API returns the fixed refusal as a normal `200` with a `reply`, not as an error. The chat UI can render it like any other answer.
2. **Claude, when `ANTHROPIC_API_KEY` is set.** The call uses `claude-haiku-4-5`. Haiku is the cost choice for a short career conversation. The full knowledge base is placed in the system prompt, with instructions to answer in the first person, match Hebrew or English, and not invent employers, dates, or skills. A retrieval index is unnecessary while the whole background still fits in one prompt.
3. **Offline fallback otherwise.** `offline_chat.py` answers from the same JSON with keyword matching: a named project, skills, experience, education, or the role I am looking for. The chat still demonstrates the product when no API key is configured. The replies are narrower than the model, which is an acceptable tradeoff for local development and for a deploy that should not fail closed.

The Anthropic API expects the first message in `messages` to be a user turn. The welcome message in the UI is an assistant message, so the service drops any leading assistant turns from the history it forwards.

### API

Interactive documentation is generated by FastAPI at `/docs`.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/` | Confirms the process is up |
| `GET` | `/health` | Returns `{ "status": "healthy" }`. The footer calls this and shows the result |
| `GET` | `/api/profile` | Profile document |
| `GET` | `/api/skills` | Skill categories |
| `GET` | `/api/projects` | Project list |
| `GET` | `/api/experience` | Experience list |
| `GET` | `/api/knowledge` | All four documents in one object |
| `POST` | `/api/chat` | One chat turn |

Chat request:

```json
{
  "message": "What kind of role are you targeting?",
  "history": [
    { "role": "user", "content": "earlier question" },
    { "role": "assistant", "content": "earlier answer" }
  ]
}
```

Chat response:

```json
{
  "reply": "..."
}
```

Validation:

* `message` is required, stripped, and limited to 4000 characters.
* `history` defaults to an empty list and accepts at most 40 entries.
* Each history entry is `user` or `assistant`.
* Invalid input returns `422`.
* An unexpected failure while producing a reply returns `502` with `Chat service is unavailable right now.`

### CORS and environments

The API and the SPA are different origins in development (`127.0.0.1:8000` and `127.0.0.1:4200`) and will be different origins in production too. FastAPI allows the browser to call it only from origins listed in `ALLOWED_ORIGINS`.

If that variable is unset, the default is:

```text
http://localhost:4200,http://127.0.0.1:4200
```

Both hosts are listed because the dev server is often opened as one or the other, and the browser treats them as different origins. A deployed frontend origin has to be added to the same variable. `allow_credentials` is on, so the allow-list cannot be `*`.

The frontend chooses the API host at build time:

| File | When it is used | `apiUrl` |
| --- | --- | --- |
| `environment.development.ts` | `ng serve` and development builds | `http://127.0.0.1:8000` |
| `environment.ts` | production builds | the deployed API URL |

`angular.json` swaps the production file for the development file with `fileReplacements`. Services import `environment.apiUrl` and append the path. Changing hosts does not require edits under `core/services`.

Backend secrets stay out of git. Copy `backend/.env.example` to `backend/.env`:

```text
ANTHROPIC_API_KEY=
ALLOWED_ORIGINS=http://localhost:4200,http://127.0.0.1:4200
```

`python-dotenv` loads that file when the process starts. An empty API key is valid: chat uses the offline fallback.

## Project Structure

```text
Aviya-AI-Agent/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   └── services/
│   ├── .env.example
│   └── requirements.txt
├── data/
│   ├── profile.json
│   ├── skills.json
│   ├── projects.json
│   └── experience.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── environments/
│   │   └── index.html
│   ├── angular.json
│   ├── vercel.json
│   └── package.json
├── .gitignore
└── README.md
```

`backend/.venv/`, `frontend/node_modules/`, `frontend/dist/`, and `backend/.env` are local only.

## Running the Project Locally

Run the API first, then the SPA. The footer stays on "Backend connection failed" until `/health` succeeds.

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

Optional: copy `.env.example` to `.env` and set `ANTHROPIC_API_KEY` if you want model answers instead of the offline fallback.

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

Production build, after `environment.ts` points at the real API:

```powershell
npx ng build
```

The static files are written under `frontend/dist/`. Hosting that build needs the SPA rewrite in `vercel.json`, or the equivalent rule on another host, and the API's `ALLOWED_ORIGINS` must include the site origin.

## Development Roadmap

Done in the current codebase: the knowledge base, the read APIs, the chat UI, Hebrew and English replies, optional Claude, and the offline fallback.

Still planned:

* PostgreSQL for profile data and conversation history
* Resume download
* A public deployment of both the API and the SPA

## Purpose

This project demonstrates practical experience with:

* Full-stack development
* REST API design
* Angular frontend development
* Python backend development
* Modular architecture
* AI-assisted applications, including a path that works without a model
* Git and GitHub workflows
* Product-oriented thinking

## Author

**Aviya Yosef**

Computer Science graduate with experience in software development, databases, compiler construction, algorithms, and reverse engineering.

## Repository

```text
https://github.com/AviyaTsabari/Aviya-AI-Agent
```
