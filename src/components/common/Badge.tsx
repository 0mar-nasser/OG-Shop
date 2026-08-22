import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'sale' | 'new' | 'outline' | 'bestseller';
  className?: string;
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  let style = 'bg-stone-100 text-stone-700 border-stone-200';

  if (variant === 'sale') {
    style = 'bg-amber-100/90 text-amber-900 border-amber-200/80 font-semibold';
  } else if (variant === 'new') {
    style = 'bg-stone-900 text-white border-stone-800 font-medium';
  } else if (variant === 'bestseller') {
    style = 'bg-[#B89F81]/15 text-[#735A42] border-[#B89F81]/30 font-semibold';
  } else if (variant === 'outline') {
    style = 'bg-transparent text-stone-600 border-stone-300';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border tracking-tight transition-colors ${style} ${className}`}
    >
      {children}
    </span>
  );
}
