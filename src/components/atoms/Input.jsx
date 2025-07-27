import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className = "", 
  type = "text",
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border bg-gray-800 px-4 py-3 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
        error 
          ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
          : "border-gray-600 focus:border-primary-500 focus:ring-primary-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;