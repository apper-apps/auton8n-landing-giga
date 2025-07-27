import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FeatureCard = ({ 
  feature,
  className = "",
  showConnector = false,
  connectorDirection = "right"
}) => {
  if (!feature) return null;

  return (
    <div className="relative">
      <div className={cn(
        "feature-card bg-gray-850 border border-gray-700 rounded-xl p-8 h-full relative overflow-hidden group",
        className
      )}>
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon with glow effect */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary-500 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-4 rounded-xl w-fit">
              <ApperIcon 
                name={feature.icon} 
                size={32} 
                className="text-white" 
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-primary-300 transition-colors duration-300">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {feature.description}
          </p>
        </div>

        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Workflow connector arrow */}
      {showConnector && (
        <div className={cn(
          "absolute top-1/2 -translate-y-1/2 z-20 hidden lg:block",
          connectorDirection === "right" ? "-right-6" : "-left-6"
        )}>
          <div className="workflow-arrow animate bg-primary-500 p-2 rounded-full">
            <ApperIcon 
              name={connectorDirection === "right" ? "ArrowRight" : "ArrowLeft"} 
              size={20} 
              className="text-white" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;