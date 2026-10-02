# 🚀 Sunny Solar - Production Deployment Guide

This guide contains all instructions and configurations to take the Sunny Solar full-stack application (React 19 + Vite frontend and Node.js + Express + MongoDB backend) live.

---

## 🏗️ Architecture Overview

| Component | Technology | Recommended Host | Production URL Example |
| :--- | :--- | :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Framer Motion | **Vercel** / **Netlify** / **Render Static** | `https://sunnysolar.com.au` |
| **Backend** | Node.js, Express, MongoDB Atlas, Cloudinary | **Render** / **Railway** / **VPS** | `https://sunny-solar-backend.onrender.com` |
| **Database** | MongoDB Atlas (M0 Free or Dedicated) | **MongoDB Cloud** | `mongodb+srv://...` |
| **Media Storage** | Cloudinary | **Cloudinary Cloud** | `res.cloudinary.com` |

---

## 📋 Required Environment Variables Checklist

### 1. Frontend (`frontend/.env.production`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Full URL to your live backend `/api` endpoint | `https://sunny-solar-backend.onrender.com/api` |

### 2. Backend (`backend/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port for Express server | `5000` (Render/Railway sets this automatically) |
| `NODE_ENV` | Environment mode | `production` |
| `CLIENT_URL` | Comma-separated allowed frontend domains for CORS | `https://sunnysolar.com.au,https://www.sunnysolar.com.au,https://sunny-solar.vercel.app` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/sunny-solar?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret key for admin JWT session signing | *(long random 64-char string)* |
| `JWT_EXPIRES_IN` | Token duration | `7d` |
| `ADMIN_EMAIL` | Default admin email for seeding | `admin@sunnysolar.com.au` |
| `ADMIN_PASSWORD` | Strong password for initial admin user | *(Your secure password)* |
| `CLOUDINARY_CLOUD_NAME`| Cloudinary cloud name | `sunny-solar` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | *(from Cloudinary console)* |
| `CLOUDINARY_API_SECRET`| Cloudinary API Secret | *(from Cloudinary console)* |

---

## ⚡ Deployment Options

### Option A: Vercel (Frontend) + Render (Backend) — *Recommended*

#### Step 1: Deploy Backend on Render
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New + > Web Service**.
2. Connect your Git repository.
3. Set the following settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`
4. Add the environment variables from the Backend table above.
5. Click **Create Web Service**. Once deployed, copy your backend URL (e.g. `https://sunny-solar-backend.onrender.com`).

#### Step 2: Deploy Frontend on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
2. Select your repository.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In **Environment Variables**, add:
   - `VITE_API_URL` = `https://sunny-solar-backend.onrender.com/api` (replace with your Render backend URL)
5. Click **Deploy**. Vercel will build the frontend with `vercel.json` already providing SPA routing and asset caching.
6. Under **Project Settings > Domains**, connect your custom domain: `sunnysolar.com.au` and `www.sunnysolar.com.au`.

---

### Option B: 1-Click Blueprint on Render (`render.yaml`)

This repository includes a [`render.yaml`](./render.yaml) file that automatically sets up both services in one click:
1. Push your code to GitHub.
2. In [Render](https://dashboard.render.com/), click **New + > Blueprint**.
3. Select this repository. Render will automatically read `render.yaml` and configure:
   - Web service: `sunny-solar-backend` (port 5000, `/api/health` keepalive)
   - Static site: `sunny-solar-frontend` (publish `dist`, SPA rewrite rule `/* -> /index.html`)
4. Fill in the prompted secrets (`MONGODB_URI`, `CLOUDINARY_*`, etc.).
5. Click **Apply**.

---

### Option C: Netlify (Frontend)

1. In [Netlify](https://app.netlify.com/), click **Add new site > Import an existing project**.
2. Set:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
3. Environment variables:
   - `VITE_API_URL` = `https://sunny-solar-backend.onrender.com/api`
4. Netlify will automatically detect [`frontend/netlify.toml`](./frontend/netlify.toml) and [`frontend/public/_redirects`](./frontend/public/_redirects).

---

### Option D: Docker & Docker Compose (VPS / AWS / DigitalOcean)

To run both services in Docker containers on a Linux VPS:
```bash
# 1. Create .env file in backend/
cp backend/.env.example backend/.env
# Edit backend/.env with your production MongoDB and Cloudinary credentials

# 2. Build and launch all containers in detached mode
docker-compose up -d --build

# 3. View status and logs
docker-compose ps
docker-compose logs -f
```

---

## 🔍 Pre-Launch Verification Checklist

Before announcing the website live:
- [ ] **Health Endpoint**: Visit `https://your-backend.onrender.com/api/health` — it should return `{"status":"OK", "database":"connected"}`.
- [ ] **SPA Direct Deep Links**: Visit deep links like `https://sunnysolar.com.au/solar`, `https://sunnysolar.com.au/ev-charger`, `https://sunnysolar.com.au/calculators` and press refresh — they must NOT return 404.
- [ ] **Assessment Form**: Submit a test inquiry on `/get-started/free-assessment` and verify it saves to the database.
- [ ] **Admin Portal**: Visit `/admin`, log in with your admin credentials, and verify blogs and leads appear.
- [ ] **Robots & Sitemap**:
  - Visit `https://sunnysolar.com.au/robots.txt`
  - Visit `https://sunnysolar.com.au/sitemap.xml`
- [ ] **Submit Sitemap to Google Search Console**: Add `https://sunnysolar.com.au/sitemap.xml`.
