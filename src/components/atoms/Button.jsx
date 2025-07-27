import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  children, 
  className = "", 
  variant = "primary", 
  size = "md",
  icon = null,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "btn-primary text-white focus:ring-primary-500",
    secondary: "btn-secondary text-primary-400 hover:text-white focus:ring-primary-500",
    outline: "border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white bg-transparent",
    ghost: "text-gray-400 hover:text-white hover:bg-gray-800",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={iconSize[size]} 
          className="mr-2 animate-spin" 
        />
      )}
      
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon 
          name={icon} 
          size={iconSize[size]} 
          className="mr-2" 
        />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon 
          name={icon} 
          size={iconSize[size]} 
          className="ml-2" 
        />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;