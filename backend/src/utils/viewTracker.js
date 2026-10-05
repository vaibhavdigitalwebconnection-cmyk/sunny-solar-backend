import TrafficLog from '../models/TrafficLog.js';

// In-memory view deduplication cache
// Tracks `${ip}_${type}_${slug}` with a 60-second cooldown window
const recentViews = new Map();

// Country dictionary mapping code to Name & Emoji Flag
const COUNTRY_MAP = {
  IN: { country: 'India', flag: '🇮🇳' },
  AU: { country: 'Australia', flag: '🇦🇺' },
  US: { country: 'United States', flag: '🇺🇸' },
  GB: { country: 'United Kingdom', flag: '🇬🇧' },
  NZ: { country: 'New Zealand', flag: '🇳🇿' },
  CA: { country: 'Canada', flag: '🇨🇦' },
  DE: { country: 'Germany', flag: '🇩🇪' },
  GR: { country: 'Greece', flag: '🇬🇷' },
  SG: { country: 'Singapore', flag: '🇸🇬' },
  AE: { country: 'United Arab Emirates', flag: '🇦🇪' }
};

export const getCountryName = (code) => {
  if (COUNTRY_MAP[code]?.country) return COUNTRY_MAP[code].country;
  try {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
};

export const getFlagEmoji = (countryCode) => {
  if (COUNTRY_MAP[countryCode]?.flag) return COUNTRY_MAP[countryCode].flag;
  if (!countryCode || countryCode.length !== 2) return '🌐';
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return '🌐';
  }
};

// Timezone to Country mapping
const TIMEZONE_TO_COUNTRY = {
  'Asia/Kolkata': { country: 'India', countryCode: 'IN', flag: '🇮🇳', region: 'India' },
  'Asia/Calcutta': { country: 'India', countryCode: 'IN', flag: '🇮🇳', region: 'India' },
  'Australia/Brisbane': { country: 'Australia', countryCode: 'AU', flag: '🇦🇺', region: 'Nationwide' },
  'Australia/Sydney': { country: 'Australia', countryCode: 'AU', flag: '🇦🇺', region: 'New South Wales' },
  'Australia/Melbourne': { country: 'Australia', countryCode: 'AU', flag: '🇦🇺', region: 'Victoria' },
  'Australia/Perth': { country: 'Australia', countryCode: 'AU', flag: '🇦🇺', region: 'Western Australia' },
  'Australia/Adelaide': { country: 'Australia', countryCode: 'AU', flag: '🇦🇺', region: 'South Australia' },
  'Australia/Hobart': { country: 'Australia', countryCode: 'AU', flag: '🇦🇺', region: 'Tasmania' },
  'Australia/Darwin': { country: 'Australia', countryCode: 'AU', flag: '🇦🇺', region: 'Northern Territory' },
  'Pacific/Auckland': { country: 'New Zealand', countryCode: 'NZ', flag: '🇳🇿', region: 'Auckland' },
  'Europe/London': { country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧', region: 'London' },
  'America/New_York': { country: 'United States', countryCode: 'US', flag: '🇺🇸', region: 'New York' },
  'America/Los_Angeles': { country: 'United States', countryCode: 'US', flag: '🇺🇸', region: 'California' },
  'America/Chicago': { country: 'United States', countryCode: 'US', flag: '🇺🇸', region: 'Illinois' }
};

/**
 * Detects visitor country and region from HTTP request headers and IP
 * @param {import('express').Request} req
 */
export const detectCountryFromRequest = (req) => {
  // 1. Cloudflare header (production CDN)
  const cfCountry = req.headers['cf-ipcountry']?.toUpperCase();
  if (cfCountry && cfCountry !== 'XX' && cfCountry !== 'T1') {
    return {
      country: getCountryName(cfCountry),
      countryCode: cfCountry,
      flag: getFlagEmoji(cfCountry),
      region: req.headers['cf-region'] || ''
    };
  }

  // 2. Vercel / Cloud host header
  const vercelCountry = req.headers['x-vercel-ip-country']?.toUpperCase();
  if (vercelCountry) {
    return {
      country: getCountryName(vercelCountry),
      countryCode: vercelCountry,
      flag: getFlagEmoji(vercelCountry),
      region: ''
    };
  }

  // 3. Client Timezone header sent from frontend
  const tz = req.headers['x-client-timezone'];
  if (tz && TIMEZONE_TO_COUNTRY[tz]) {
    return TIMEZONE_TO_COUNTRY[tz];
  }
  if (tz && (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('India'))) {
    return { country: 'India', countryCode: 'IN', flag: '🇮🇳', region: 'India' };
  }
  if (tz && tz.startsWith('Australia/')) {
    const region = tz.replace('Australia/', '');
    return { country: 'Australia', countryCode: 'AU', flag: '🇦🇺', region };
  }

  // 4. Client Locale header (e.g. en-IN, hi-IN -> India)
  const locale = req.headers['x-client-locale'] || '';
  if (locale.toUpperCase().includes('-IN') || locale.toUpperCase() === 'IN') {
    return { country: 'India', countryCode: 'IN', flag: '🇮🇳', region: 'India' };
  }
  if (locale.toUpperCase().includes('-AU') || locale.toUpperCase() === 'AU') {
    return { country: 'Australia', countryCode: 'AU', flag: '🇦🇺', region: 'Australia' };
  }

  // 5. Standard browser Accept-Language header (e.g., "en-IN,en;q=0.9,hi;q=0.8")
  const acceptLang = req.headers['accept-language'] || '';
  const langMatch = acceptLang.match(/[a-zA-Z]{2}-([a-zA-Z]{2})/);
  if (langMatch && langMatch[1]) {
    const code = langMatch[1].toUpperCase();
    return {
      country: getCountryName(code),
      countryCode: code,
      flag: getFlagEmoji(code),
      region: getCountryName(code)
    };
  }

  // Default to Unknown if no geolocation headers or locale found
  return { country: 'Unknown', countryCode: 'UN', flag: '🌐', region: '' };
};

/**
 * Determines whether a view count should be incremented.
 * Prevents double-counting from React StrictMode, rapid refreshes, and admin previews.
 * 
 * @param {import('express').Request} req
 * @param {string} type - 'blog' or 'knowledge'
 * @param {string} slug
 * @returns {boolean}
 */
export const shouldTrackView = (req, type, slug) => {
  // 1. Never increment if previewing from admin panel or explicitly instructed not to track
  if (
    req.query.preview === 'true' ||
    req.query.noTrack === 'true' ||
    req.headers['x-preview-mode'] === 'true'
  ) {
    return false;
  }

  // 2. Identify client by IP
  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    req.ip ||
    'unknown';

  const key = `${clientIp}_${type}_${slug.toLowerCase()}`;
  const now = Date.now();
  const lastViewTime = recentViews.get(key);

  // 3. Debounce window: 60 seconds (60000 ms)
  if (lastViewTime && now - lastViewTime < 60 * 1000) {
    return false;
  }

  recentViews.set(key, now);

  // Clean up old entries periodically
  if (recentViews.size > 5000) {
    for (const [k, timestamp] of recentViews.entries()) {
      if (now - timestamp > 60 * 1000) {
        recentViews.delete(k);
      }
    }
  }

  return true;
};

/**
 * Records a real traffic event in MongoDB TrafficLog
 * @param {import('express').Request} req
 * @param {string} type - 'blog' | 'knowledge' | 'page'
 * @param {string} slug
 * @param {string} title
 */
export const recordTrafficEvent = async (req, type, slug, title = '') => {
  try {
    const geo = detectCountryFromRequest(req);
    const now = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0].trim() ||
      req.socket?.remoteAddress ||
      req.ip ||
      '';

    await TrafficLog.create({
      country: geo.country,
      countryCode: geo.countryCode,
      flag: geo.flag,
      region: geo.region || '',
      ip: clientIp,
      type,
      slug,
      title,
      hour: now.getHours(),
      dayOfWeek: dayNames[now.getDay()],
      timestamp: now
    });
  } catch (err) {
    console.error('Error recording traffic event:', err.message);
  }
};
