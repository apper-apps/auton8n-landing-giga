import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Logo = ({ className = "", showText = true, size = "md" }) => {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 40, text: "text-2xl" },
    xl: { icon: 48, text: "text-3xl" }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg blur-sm opacity-75"></div>
        <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-lg">
          <ApperIcon 
            name="Zap" 
            size={sizes[size].icon} 
            className="text-white" 
          />
        </div>
      </div>
      
      {showText && (
        <span className={`font-bold gradient-text ${sizes[size].text}`}>
          AutoN8N
        </span>
      )}
    </div>
  );
};

export default Logo;