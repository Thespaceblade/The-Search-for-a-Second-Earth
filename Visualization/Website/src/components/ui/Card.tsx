import clsx from 'clsx';

export default function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx('card rounded-2xl p-6 md:p-8 card-hover', className)}>
      {children}
    </div>
  );
}

