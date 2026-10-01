import { useState, useEffect } from 'react';

/**
 * Responsive breakpoint hook for animation distance calculation
 * Defaults to 768px (Tailwind 'md')
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const updateMatch = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mql.matches);

    if (mql.addEventListener) {
      mql.addEventListener('change', updateMatch);
      return () => mql.removeEventListener('change', updateMatch);
    } else {
      // Legacy fallback
      mql.addListener(updateMatch);
      return () => mql.removeListener(updateMatch);
    }
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
