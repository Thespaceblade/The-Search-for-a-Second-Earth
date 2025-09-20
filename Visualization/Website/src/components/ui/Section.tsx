"use client";
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

type Props = {
  id?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, title, className, children }: Props) {
  const prefersReduced = useReducedMotion();
  return (
    <section id={id} aria-labelledby={title ? `${id}-heading` : undefined} className={clsx('py-16', className)}>
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {title && (
          <h2 id={`${id}-heading`} className="text-2xl md:text-3xl font-semibold mb-6">
            {title}
          </h2>
        )}
        {children}
      </motion.div>
    </section>
  );
}
