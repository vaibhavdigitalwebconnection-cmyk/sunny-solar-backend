import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollToOptions {
  offset?: number;
  immediate?: boolean;
  lock?: boolean;
  duration?: number;
  easing?: (t: number) => number;
  lerp?: number;
  onStart?: () => void;
  onComplete?: () => void;
  force?: boolean;
  userData?: Record<string, unknown>;
}

export interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: number | string | HTMLElement, options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

// Export useLenis alias for official compatibility
export const useLenis = useSmoothScroll;

export interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Accessibility: Check user's motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = reducedMotionQuery.matches;

    // Initialize Lenis instance with production-grade settings
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false, // Essential: maintains natural, hardware-accelerated touch physics on mobile
      infinite: false,
      autoRaf: true, // Clean internal RAF loop managed by Lenis lifecycle
      anchors: false, // Disabled: custom handleGlobalClick below handles #anchor scrolling
      autoToggle: true, // Automatically pauses Lenis during modal/drawer overflow locks
      stopInertiaOnNavigate: false, // Disabled: ScrollToTop component handles scroll reset on route change
      respectReducedMotion: true, // Live accessibility support
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Connect Lenis scroll events directly to GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Refresh ScrollTrigger and sync Lenis dimensions upon window resize
    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Listen for OS reduced-motion preference changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        lenis.options.duration = 0;
        lenis.options.smoothWheel = false;
      } else {
        lenis.options.duration = 1.2;
        lenis.options.smoothWheel = true;
      }
    };
    reducedMotionQuery.addEventListener('change', handleMotionChange);

    // Global delegated click listener for buttons and custom elements with anchor targets
    const handleGlobalClick = (e: MouseEvent) => {
      const targetElement = (e.target as Element)?.closest<HTMLElement>(
        'a[href^="#"], [data-scroll-to]'
      );

      if (!targetElement) return;

      let target: string | null = null;

      if (targetElement.hasAttribute('data-scroll-to')) {
        target = targetElement.getAttribute('data-scroll-to');
      } else if (targetElement instanceof HTMLAnchorElement) {
        const href = targetElement.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          target = href;
        }
      }

      if (!target) return;

      if (target === 'top' || target === '#top') {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
      } else if (target.startsWith('#')) {
        const id = target.slice(1);
        const destination = document.getElementById(id);
        if (destination) {
          e.preventDefault();
          if (window.history.pushState) {
            window.history.pushState(null, '', target);
          }
          lenis.scrollTo(destination, { duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('resize', handleResize);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Handle cross-page and in-route hash scrolling
  useEffect(() => {
    if (!lenisRef.current) return;

    if (location.hash) {
      const id = location.hash.slice(1);
      // Brief delay to allow new route DOM and layout elements to render
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element && lenisRef.current) {
          lenisRef.current.scrollTo(element, { duration: 1.2 });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  // Refresh ScrollTrigger upon route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const scrollTo = useCallback(
    (target: number | string | HTMLElement, options?: ScrollToOptions) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      } else if (typeof window !== 'undefined') {
        if (typeof target === 'number') {
          window.scrollTo({
            top: target,
            behavior: options?.immediate ? 'instant' : 'smooth',
          });
        } else if (typeof target === 'string') {
          const el = target.startsWith('#')
            ? document.getElementById(target.slice(1))
            : document.querySelector(target);
          el?.scrollIntoView({
            behavior: options?.immediate ? 'instant' : 'smooth',
          });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({
            behavior: options?.immediate ? 'instant' : 'smooth',
          });
        }
      }
    },
    []
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const contextValue = useMemo(
    () => ({
      lenis: lenisInstance,
      scrollTo,
      stop,
      start,
    }),
    [lenisInstance, scrollTo, stop, start]
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScroll;
