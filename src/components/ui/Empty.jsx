import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data available",
  description = "There's nothing to show right now.",
  actionLabel = "Get Started",
  onAction = null,
  icon = "Inbox",
  className = ""
}) => {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <ApperIcon 
            name={icon} 
            size={64} 
            className="mx-auto text-gray-500 mb-4" 
          />
          <h3 className="text-xl font-semibold text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-400">
            {description}
          </p>
        </div>
        
        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;