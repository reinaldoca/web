'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  initial?: string;
  animate?: string;
  amount?: number;
  once?: boolean;
};

export function AnimatedSection({ 
  children, 
  className,
  variants,
  initial = "hidden",
  animate = "visible",
  amount = 0.2,
  once = true
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={ref}
      variants={variants || defaultVariants}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{ duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
