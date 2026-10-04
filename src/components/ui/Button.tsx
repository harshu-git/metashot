import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      variant = 'primary', 
      size = 'md', 
      isLoading = false, 
      icon, 
      children, 
      className = '', 
      disabled, 
      ...props 
    }, 
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer select-none active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 will-change-transform';
    
    const variants = {
      primary: 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 border border-indigo-400/30',
      glow: 'bg-gradient-to-r from-indigo-500 via-violet-600 to-indigo-600 text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 border border-white/20 animate-shimmer',
      secondary: 'bg-[#18181f] hover:bg-[#22222b] text-zinc-200 hover:text-white border border-white/10 hover:border-white/20 shadow-sm',
      ghost: 'bg-transparent hover:bg-white/[0.06] text-zinc-400 hover:text-white border border-transparent',
      danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20',
    };

    const sizes = {
      sm: 'text-xs min-h-[36px] px-3.5 py-1.5 gap-1.5',
      md: 'text-sm min-h-[44px] px-4.5 py-2.5 gap-2',
      lg: 'text-base min-h-[48px] px-6 py-3 gap-2.5 font-semibold',
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles} 
          ${variants[variant]} 
          ${sizes[size]} 
          ${className}
        `}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
