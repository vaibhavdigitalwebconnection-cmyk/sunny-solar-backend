import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

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

// Middlewares
app.use(morgan('dev'));

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman, or server-to-server)
    if (!origin) return callback(null, true);

    const allowedOrigins = getAllowedOrigins();
    const cleanOrigin = origin.replace(/\/$/, '');

    if (
      allowedOrigins.includes(cleanOrigin) ||
      allowedOrigins.includes('*') ||
      cleanOrigin.includes('localhost') ||
      cleanOrigin.includes('127.0.0.1')
    ) {
      return callback(null, true);
    }

    console.warn(`[CORS Blocked] Origin "${origin}" not in allowed list:`, allowedOrigins);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-client-timezone',
    'x-client-locale',
    'x-preview-mode',
    'Accept',
    'Origin',
    'X-Requested-With'
  ]
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Explicit preflight fallback
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-client-timezone, x-client-locale, x-preview-mode, Accept, Origin, X-Requested-With'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

import { getSitemapXml } from './controllers/sitemap.controller.js';

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
