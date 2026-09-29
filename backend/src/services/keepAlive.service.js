/**
 * Render Auto-Health & Keep-Alive Service
 *
 * Render.com free instances sleep after 15 minutes of inactivity.
 * This service pings the public Render URL every 14 minutes to ensure
 * incoming HTTP traffic passes through Render's reverse proxy,
 * resetting the inactivity timer and keeping the server alive 24/7.
 */

const PING_INTERVAL_MINUTES = parseInt(process.env.AUTO_HEALTH_INTERVAL_MINUTES || '14', 10);
const PING_INTERVAL_MS = PING_INTERVAL_MINUTES * 60 * 1000;

export const initKeepAlive = () => {
  // Determine target URL for external ping
  const targetBaseUrl =
    process.env.RENDER_EXTERNAL_URL ||
    process.env.BACKEND_PUBLIC_URL ||
    (process.env.NODE_ENV === 'production' ? 'https://sunny-solar-backend.onrender.com' : null);

  if (!targetBaseUrl) {
    console.log(`ℹ️ [Keep-Alive] Auto-health self-ping idle in local dev (RENDER_EXTERNAL_URL not set).`);
    return null;
  }

  const cleanBase = targetBaseUrl.replace(/\/+$/, '');
  const healthUrl = `${cleanBase}/api/health`;

  console.log(`🩺 [Keep-Alive] Initialized auto-health pings every ${PING_INTERVAL_MINUTES}m to: ${healthUrl}`);

  const ping = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const startTime = Date.now();
      const response = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'SunnySolar-KeepAlive/1.0',
          'X-Render-Ping': 'auto-health-14m'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const duration = Date.now() - startTime;
      if (response.ok) {
        console.log(`✅ [Keep-Alive] 14m Auto-health check OK: ${response.status} (${duration}ms) at ${new Date().toLocaleTimeString()}`);
      } else {
        console.warn(`⚠️ [Keep-Alive] Health check returned status: ${response.status} (${duration}ms)`);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.warn(`⏳ [Keep-Alive] Health check timed out after 10s at ${new Date().toLocaleTimeString()}`);
      } else {
        console.warn(`⚠️ [Keep-Alive] Health check ping warning: ${err.message}`);
      }
    }
  };

  // Run the first ping after a short 1-minute delay to allow the server to fully bind
  const initialTimeout = setTimeout(ping, 60 * 1000);

  // Set recurring interval every 14 minutes
  const intervalId = setInterval(ping, PING_INTERVAL_MS);

  // Do not let interval prevent Node process exit
  if (intervalId.unref) intervalId.unref();
  if (initialTimeout.unref) initialTimeout.unref();

  return { intervalId, initialTimeout };
};
