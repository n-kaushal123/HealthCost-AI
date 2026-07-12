# Railway Deployment Guide

This repository is a **Monorepo** (it contains both the frontend and backend in separate folders). To deploy this to Railway smoothly without errors, you need to create **two services** in your Railway project.

## Step 1: Deploy the Backend
1. In Railway, click **New** -> **GitHub Repo** and select this repository.
2. Once the service is added, go to its **Settings**.
3. Scroll down to **Root Directory** and change it to `/backend`.
4. Railway will automatically detect Python, install `requirements.txt`, and use the `Procfile` to start the FastAPI server.
5. Go to the **Variables** tab (optional) if you want to set any custom environment variables.
6. Go to the **Settings** tab and click **Generate Domain** under the Environments section. 
7. **Copy this generated backend domain** (e.g., `https://healthcost-backend.up.railway.app`).

## Step 2: Deploy the Frontend
1. In Railway, click **New** -> **GitHub Repo** and select this repository again.
2. Go to this new service's **Settings**.
3. Scroll down to **Root Directory** and change it to `/fronted/frontend`.
4. Go to the **Variables** tab for the frontend service.
5. Add a new variable called `VITE_API_URL` and set its value to the backend domain you copied in Step 1 (e.g., `https://healthcost-backend.up.railway.app`). **Do not include a trailing slash.**
6. Railway will automatically detect Node.js, run `npm install`, `npm run build`, and then `npm start` (which we configured to serve your static files).
7. Go to the **Settings** tab and click **Generate Domain**. This is your live frontend URL!

You are all set! Your frontend will now correctly talk to your backend in the cloud.
