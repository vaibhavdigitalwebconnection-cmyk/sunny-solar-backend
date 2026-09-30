import React, {
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0.92, opacity: 0, y: 12 },
    animate: { scale: 1, opacity: 1, y: 0, originY: 0 },
    exit: { scale: 0.92, opacity: 0, y: -10 },
    transition: { type: 'spring', stiffness: 350, damping: 30 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 2800, ...props }: AnimatedListProps) => {
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );

    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (childrenArray.length <= 1) return;

      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
      }, delay);

      return () => clearInterval(interval);
    }, [delay, childrenArray.length]);

    // Show current item and the previous 2 items in reverse order
    const itemsToShow = useMemo(() => {
      const result: { item: React.ReactNode; id: number }[] = [];
      const total = childrenArray.length;
      if (total === 0) return result;

      const count = Math.min(3, total);
      for (let i = 0; i < count; i++) {
        const itemIdx = (index - i + total) % total;
        result.push({ item: childrenArray[itemIdx], id: itemIdx });
      }
      return result;
    }, [index, childrenArray]);

    return (
      <div
        className={cn('flex flex-col items-center gap-2.5', className)}
        {...props}
      >
        <AnimatePresence mode="popLayout">
          {itemsToShow.map(({ item, id }) => (
            <AnimatedListItem key={id}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = 'AnimatedList';
export default AnimatedList;
