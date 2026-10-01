import { Variants, Transition } from 'framer-motion';

/**
 * Centralized Animation Configuration for Home Page
 * All timings, curves, distances, and variants are declared here for quick tweaking.
 */
export const ANIMATION_CONFIG = {
  // Global timings & physics
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],

  // Stagger intervals
  staggerCard: 0.15,
  staggerFormField: 0.10,
  staggerHeroElements: 0.14,

  // Desktop slide distances (px)
  distance: {
    left: -100,
    right: 100,
    up: 80,    // slides upwards from bottom
    down: -80, // slides downwards from top
    form: 200, // enquiry form slides from right
  },

  // Mobile slide distances (px - capped to 40px as requested)
  mobileDistance: {
    left: -40,
    right: 40,
    up: 40,
    down: -40,
    form: 40,
  },

  // Viewport trigger settings for scroll animations
  viewport: {
    once: true,
    amount: 0.25,
  },

  // Card hover lift and soft shadow
  cardHover: {
    y: -6,
    scale: 1.01,
    boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
} as const;

export type RevealDirection = 'left' | 'right' | 'up' | 'down';

/**
 * Generates Reveal Variants for Text & Sections
 */
export function getRevealVariants(
  direction: RevealDirection = 'up',
  isMobile: boolean = false,
  reducedMotion: boolean = false,
  delay: number = 0,
  customDuration?: number
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.4,
          delay,
          ease: 'easeOut',
        },
      },
    };
  }

  const dist = isMobile ? ANIMATION_CONFIG.mobileDistance : ANIMATION_CONFIG.distance;
  let initialX = 0;
  let initialY = 0;

  switch (direction) {
    case 'left':
      initialX = dist.left;
      break;
    case 'right':
      initialX = dist.right;
      break;
    case 'down':
      initialY = dist.down; // from top
      break;
    case 'up':
    default:
      initialY = dist.up; // from bottom
      break;
  }

  return {
    hidden: {
      opacity: 0,
      x: initialX,
      y: initialY,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: customDuration ?? ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
        delay,
      },
    },
  };
}

/**
 * Generates Card Scroll Variants
 * Fade + slide + slight scale (0.95 -> 1)
 */
export function getCardVariants(
  direction: RevealDirection = 'up',
  isMobile: boolean = false,
  reducedMotion: boolean = false,
  delay: number = 0
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.4,
          delay,
        },
      },
    };
  }

  const dist = isMobile ? ANIMATION_CONFIG.mobileDistance : ANIMATION_CONFIG.distance;
  let initialX = 0;
  let initialY = 0;

  switch (direction) {
    case 'left':
      initialX = dist.left;
      break;
    case 'right':
      initialX = dist.right;
      break;
    case 'down':
      initialY = dist.down;
      break;
    case 'up':
    default:
      initialY = dist.up;
      break;
  }

  return {
    hidden: {
      opacity: 0,
      scale: 0.95,
      x: initialX,
      y: initialY,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
        delay,
      },
    },
  };
}

/**
 * Hero Section Form entrance variants
 * Enquiry form slides in from far right (x: 200 -> 0, opacity 0 -> 1) and settles
 */
export function getHeroFormVariants(
  isMobile: boolean = false,
  reducedMotion: boolean = false
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.4 },
      },
    };
  }

  const formX = isMobile ? ANIMATION_CONFIG.mobileDistance.form : ANIMATION_CONFIG.distance.form;

  return {
    hidden: {
      opacity: 0,
      x: formX,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: ANIMATION_CONFIG.ease,
      },
    },
  };
}

/**
 * Form fields container - staggers children sequentially AFTER the form lands
 */
export const formFieldsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.7, // wait for form container to land and settle
      staggerChildren: ANIMATION_CONFIG.staggerFormField,
    },
  },
};

/**
 * Individual form field entrance item
 */
export const formFieldItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: ANIMATION_CONFIG.ease,
    },
  },
};
