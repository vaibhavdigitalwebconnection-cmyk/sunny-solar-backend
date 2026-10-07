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
import type Lenis from 'lenis';

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
  const scrollTriggerRef = useRef<any>(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    let cleanupFn: (() => void) | null = null;

    const init = async () => {
      try {
        const [{ default: LenisClass }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);

        if (!isMounted) return;

        if (typeof window !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger);
          scrollTriggerRef.current = ScrollTrigger;
        }

        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const prefersReducedMotion = reducedMotionQuery.matches;

        const lenis = new LenisClass({
          duration: prefersReducedMotion ? 0 : 0.85,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: !prefersReducedMotion,
          wheelMultiplier: 1.1,
          touchMultiplier: 1.2,
          syncTouch: false,
          infinite: false,
          autoRaf: true,
          anchors: false,
          autoToggle: true,
          stopInertiaOnNavigate: false,
          respectReducedMotion: true,
        });

        lenisRef.current = lenis;
        setLenisInstance(lenis);
        (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

        const handleScroll = () => {
          ScrollTrigger.update();
        };
        lenis.on('scroll', handleScroll);

        const handleResize = () => {
          lenis.resize();
          ScrollTrigger.refresh();
        };
        window.addEventListener('resize', handleResize);

        const handleMotionChange = (e: MediaQueryListEvent) => {
          if (e.matches) {
            lenis.options.duration = 0;
            lenis.options.smoothWheel = false;
          } else {
            lenis.options.duration = 0.85;
            lenis.options.smoothWheel = true;
          }
        };
        reducedMotionQuery.addEventListener('change', handleMotionChange);

        cleanupFn = () => {
          reducedMotionQuery.removeEventListener('change', handleMotionChange);
          window.removeEventListener('resize', handleResize);
          lenis.off('scroll', handleScroll);
          lenis.destroy();
          lenisRef.current = null;
          setLenisInstance(null);
          delete (window as unknown as { __lenis?: Lenis }).__lenis;
        };
      } catch (e) {
        console.warn('Smooth scroll deferred init:', e);
      }
    };

    let idleId: number | null = null;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    if ('requestIdleCallback' in window) {
      idleId = (window as any).requestIdleCallback(init, { timeout: 2000 });
    } else {
      timerId = setTimeout(init, 300);
    }

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
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (target.startsWith('#')) {
        const id = target.slice(1);
        const destination = document.getElementById(id);
        if (destination) {
          e.preventDefault();
          if (window.history.pushState) {
            window.history.pushState(null, '', target);
          }
          if (lenisRef.current) {
            lenisRef.current.scrollTo(destination, { duration: 1.2 });
          } else {
            destination.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      isMounted = false;
      if (idleId !== null && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timerId !== null) {
        clearTimeout(timerId);
      }
      document.removeEventListener('click', handleGlobalClick);
      if (cleanupFn) cleanupFn();
    };
  }, []);

  // Handle cross-page and in-route hash scrolling
  useEffect(() => {
    if (!lenisRef.current) return;

    if (location.hash) {
      const id = location.hash.slice(1);
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
      scrollTriggerRef.current?.refresh();
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
