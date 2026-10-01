import React from 'react';
import { motion, useReducedMotion, TargetAndTransition } from 'framer-motion';
import { useIsMobile } from '../useIsMobile';
import {
  ANIMATION_CONFIG,
  RevealDirection,
  getCardVariants,
} from '../animationConfig';

export interface AnimatedCardProps {
  /**
   * Slide direction:
   * - 'left': left card comes from left
   * - 'right': right card comes from right
   * - 'up': comes upwards from bottom
   * - 'down': comes downwards from top
   * Default is 'up'.
   */
  direction?: RevealDirection;
  /**
   * Explicit delay in seconds. If not provided and `index` is passed,
   * delay is automatically computed as `index * 0.15s` (stagger 0.15s).
   */
  delay?: number;
  /**
   * Item index in the card list (used for automatic 0.15s stagger calculation).
   */
  index?: number;
  /**
   * Optional custom hover animation override. Default is lift 6px + soft shadow.
   */
  customHover?: TargetAndTransition;
  /**
   * Optional disable hover effect.
   */
  disableHover?: boolean;
  /**
   * Viewport trigger threshold. Default is 0.25.
   */
  viewportAmount?: number;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Children inside the card.
   */
  children: React.ReactNode;
  /**
   * HTML wrapper tag. Default is 'div'.
   */
  as?: 'div' | 'article' | 'li';
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  direction = 'up',
  delay,
  index,
  customHover,
  disableHover = false,
  viewportAmount = ANIMATION_CONFIG.viewport.amount,
  className = '',
  children,
  as = 'div',
}) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // Compute stagger delay (0.15s interval)
  const computedDelay =
    typeof delay === 'number'
      ? delay
      : typeof index === 'number'
      ? index * ANIMATION_CONFIG.staggerCard
      : 0;

  const variants = getCardVariants(
    direction,
    isMobile,
    Boolean(prefersReducedMotion),
    computedDelay
  );

  const hoverEffect =
    disableHover || prefersReducedMotion
      ? undefined
      : customHover || {
          y: ANIMATION_CONFIG.cardHover.y,
          boxShadow: ANIMATION_CONFIG.cardHover.boxShadow,
          transition: ANIMATION_CONFIG.cardHover.transition,
        };

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      whileHover={hoverEffect}
      viewport={{
        once: ANIMATION_CONFIG.viewport.once,
        amount: viewportAmount,
      }}
      variants={variants}
      style={{ willChange: 'transform, opacity' }}
      className={`transition-shadow duration-300 ${className}`}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedCard;
