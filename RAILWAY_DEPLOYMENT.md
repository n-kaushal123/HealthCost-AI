## Deployment (Railway)

This is a monorepo — deploy backend and frontend as two separate Railway services.

- **Backend:** Root directory `/backend`. Railway auto-detects Python and uses the
  `Procfile` to run FastAPI. Generate a domain once deployed.
- **Frontend:** Root directory `/frontend`. Set env variable `VITE_API_URL` to the
  backend's generated domain (no trailing slash). Railway auto-builds and serves it.
