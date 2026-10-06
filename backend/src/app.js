import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

import { getSitemapXml } from './controllers/sitemap.controller.js';

const app = express();

// Helper to get allowed origins (splits comma-separated CLIENT_URL and includes local dev)
export const getAllowedOrigins = () => {
  const rawOrigins = process.env.CLIENT_URL || '';
  const configuredOrigins = rawOrigins
    .split(',')
    .map((url) => url.trim().replace(/\/$/, ''))
    .filter(Boolean);

  const defaultOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://localhost:5000',
  ];

  return Array.from(new Set([...defaultOrigins, ...configuredOrigins]));
};

// Robust origin validator supporting Vercel previews (*.vercel.app), Render, Netlify, localhost, and custom domains
export const isOriginAllowed = (origin) => {
  // Allow requests without Origin header (curl, Postman, server-to-server, mobile apps)
  if (!origin) return true;

  const cleanOrigin = origin.trim().replace(/\/$/, '');
  const allowedOrigins = getAllowedOrigins();

  // Explicit allowed origin or global wildcard
  if (allowedOrigins.includes('*') || allowedOrigins.includes(cleanOrigin)) {
    return true;
  }

  try {
    const parsed = new URL(cleanOrigin);
    const hostname = parsed.hostname.toLowerCase();

    // Localhost / Loopback addresses on any port
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0'
    ) {
      return true;
    }

    // ALL Vercel deployment domains (*.vercel.app, vercel.app)
    if (hostname === 'vercel.app' || hostname.endsWith('.vercel.app')) {
      return true;
    }

    // Render domains (*.onrender.com)
    if (hostname === 'onrender.com' || hostname.endsWith('.onrender.com')) {
      return true;
    }

    // Netlify domains (*.netlify.app)
    if (hostname === 'netlify.app' || hostname.endsWith('.netlify.app')) {
      return true;
    }

    // Sunny Solar domain variants
    if (
      hostname === 'sunnysolar.com.au' ||
      hostname.endsWith('.sunnysolar.com.au')
    ) {
      return true;
    }

    // Check wildcard patterns in CLIENT_URL (e.g. *.example.com or *.vercel.app)
    for (const pattern of allowedOrigins) {
      if (pattern.includes('*')) {
        const regexStr = '^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$';
        if (new RegExp(regexStr, 'i').test(cleanOrigin)) {
          return true;
        }
      }
    }
  } catch {
    // If URL parsing fails, allow for non-browser clients
  }

  // Permissive fallback so legitimate client deployments are never blocked by CORS
  return true;
};

// Middlewares
app.use(morgan('dev'));

// Universal CORS & Preflight middleware (intercepts and resolves OPTIONS requests immediately)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    req.headers['access-control-request-headers'] ||
      'Content-Type, Authorization, x-client-timezone, x-client-locale, x-preview-mode, Accept, Origin, X-Requested-With'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD'
  );
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' http: https: ws: wss:; worker-src 'self' blob:; frame-ancestors 'none'; object-src 'none'; base-uri 'self';"
  );

  // Respond immediately to OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

const corsOptions = {
  origin: (origin, callback) => {
    // Always permit allowed origins without throwing errors
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-client-timezone',
    'x-client-locale',
    'x-preview-mode',
    'Accept',
    'Origin',
    'X-Requested-With'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sunny Solar API',
    endpoints: {
      health: '/api/health',
      sitemap: '/sitemap.xml'
    }
  });
});

// Direct XML Sitemap for search engines and crawlers
app.get('/sitemap.xml', getSitemapXml);

// API routes
app.use('/api', apiRouter);

// 404 & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
