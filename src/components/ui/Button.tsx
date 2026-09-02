import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
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
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]';
    
    const variants = {
      primary: 'bg-indigo-500 hover:bg-indigo-400 text-white border border-transparent',
      secondary: 'bg-[#222] hover:bg-[#2a2a2a] text-white border border-[#333]',
      ghost: 'bg-transparent hover:bg-[#1a1a1a] text-zinc-400 hover:text-white border border-transparent',
      danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20',
    };

    const sizes = {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3 gap-2.5',
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles} 
          ${variants[variant]} 
          ${sizes[size]} 
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} 
          ${className}
        `}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
