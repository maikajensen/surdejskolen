import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-nordic-brown disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
                    {
                        'bg-nordic-brown text-nordic-white hover:bg-nordic-brown/90':
                            variant === 'primary',
                        'bg-nordic-beige text-nordic-brown hover:bg-nordic-beige/80':
                            variant === 'secondary',
                        'border border-nordic-brown text-nordic-brown hover:bg-nordic-brown/10':
                            variant === 'outline',
                        'hover:bg-nordic-brown/10 text-nordic-brown': variant === 'ghost',
                        'h-9 px-4 text-sm': size === 'sm',
                        'h-11 px-8 text-base': size === 'md',
                        'h-14 px-10 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, cn };
