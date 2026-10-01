import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '../useIsMobile';
import {
  ANIMATION_CONFIG,
  RevealDirection,
  getRevealVariants,
} from '../animationConfig';

export interface RevealProps {
  /**
   * Slide direction:
   * - 'left': slides in from the left (x: -100 on desktop, -40 on mobile)
   * - 'right': slides in from the right (x: 100 on desktop, 40 on mobile)
   * - 'up': slides upwards from the bottom (y: 80 on desktop, 40 on mobile)
   * - 'down': slides downwards from the top (y: -80 on desktop, -40 on mobile)
   * Default is 'up'.
   */
  direction?: RevealDirection;
  /**
   * Additional delay before animating in seconds. Default is 0.
   */
  delay?: number;
  /**
   * Optional custom duration in seconds. Default is 0.8s.
   */
  duration?: number;
  /**
   * Optional custom viewport threshold (0 to 1). Default is 0.25.
   */
  viewportAmount?: number;
  /**
   * Tailwind or custom CSS classes.
   */
  className?: string;
  /**
   * Child elements (headings, paragraphs, labels, or containers).
   */
  children: React.ReactNode;
  /**
   * HTML tag to render as (e.g. 'div', 'h2', 'p', 'span'). Default is 'div'.
   */
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'section';
}

export const Reveal: React.FC<RevealProps> = ({
  direction = 'up',
  delay = 0,
  duration,
  viewportAmount = ANIMATION_CONFIG.viewport.amount,
  className = '',
  children,
  as = 'div',
}) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const variants = getRevealVariants(
    direction,
    isMobile,
    Boolean(prefersReducedMotion),
    delay,
    duration
  );

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: ANIMATION_CONFIG.viewport.once,
        amount: viewportAmount,
      }}
      variants={variants}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default Reveal;
