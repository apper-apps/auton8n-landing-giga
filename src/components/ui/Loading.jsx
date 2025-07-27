import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-gray-800 rounded"></div>
          <div className="flex space-x-4">
            <div className="h-6 w-16 bg-gray-800 rounded"></div>
            <div className="h-6 w-16 bg-gray-800 rounded"></div>
            <div className="h-6 w-16 bg-gray-800 rounded"></div>
          </div>
        </div>

        {/* Hero skeleton */}
        <div className="text-center space-y-4 py-20">
          <div className="h-12 w-3/4 bg-gray-800 rounded mx-auto"></div>
          <div className="h-6 w-2/3 bg-gray-800 rounded mx-auto"></div>
          <div className="flex justify-center space-x-4 mt-8">
            <div className="h-12 w-32 bg-gray-800 rounded"></div>
            <div className="h-12 w-32 bg-gray-800 rounded"></div>
          </div>
        </div>

        {/* Features skeleton */}
        <div className="grid md:grid-cols-3 gap-8 py-16">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="h-12 w-12 bg-gray-700 rounded"></div>
              <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-700 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing skeleton */}
        <div className="grid md:grid-cols-3 gap-8 py-16">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-800 rounded-lg p-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="h-6 w-16 bg-gray-700 rounded mx-auto"></div>
                <div className="h-8 w-20 bg-gray-700 rounded mx-auto"></div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((feature) => (
                  <div key={feature} className="h-4 w-full bg-gray-700 rounded"></div>
                ))}
              </div>
              <div className="h-12 w-full bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;