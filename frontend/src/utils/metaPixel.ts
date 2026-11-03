/**
 * Utility to fire custom or standard Meta Pixel conversion events.
 * e.g., trackPixel('Lead', { content_name: 'Solar Assessment Request' })
 */
export const trackPixel = (
  eventName: string,
  parameters?: Record<string, any>
): void => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (parameters) {
      window.fbq('track', eventName, parameters);
    } else {
      window.fbq('track', eventName);
    }
  }
};

