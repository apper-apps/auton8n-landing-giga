import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry = null,
  className = ""
}) => {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <ApperIcon 
            name="AlertTriangle" 
            size={64} 
            className="mx-auto text-red-500 mb-4" 
          />
          <h3 className="text-xl font-semibold text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-400">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;