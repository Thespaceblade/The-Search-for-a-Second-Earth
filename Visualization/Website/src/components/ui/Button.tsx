import clsx from 'clsx';
import Link from 'next/link';

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'ghost';
};

export default function Button({ href, onClick, children, className, variant = 'primary' }: Props) {
  const base = clsx(
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition',
    variant === 'primary' && 'border border-accent/40 bg-accent/20 text-accent hover:bg-accent/30',
    variant === 'ghost' && 'border border-white/15 bg-white/5 text-white/90 hover:bg-white/10',
    className,
  );
  if (href) return <Link href={href} className={base}>{children}</Link>;
  return <button className={base} onClick={onClick}>{children}</button>;
}

