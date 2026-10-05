import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * LazyMotion wrapper that tree-shakes framer-motionotion to only load
 * the domAnimation feature set (~17KB instead of ~45KB).
 * Wrap your app or section roots with this instead of importing
 * full Framer Motion feature set everywhere.
 */
export const LazyMotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LazyMotion features={domAnimation} strict>
    {children}
  </LazyMotion>
);

export default LazyMotionProvider;
