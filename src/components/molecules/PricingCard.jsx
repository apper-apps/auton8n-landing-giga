import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const PricingCard = ({ plan, className = "" }) => {
  if (!plan) return null;

  return (
    <div className={cn(
      "pricing-card glass rounded-2xl p-8 relative overflow-hidden",
      plan.highlighted && "highlighted scale-105",
      className
    )}>
      {/* Popular badge */}
      {plan.highlighted && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}

      {/* Glow effect for highlighted plan */}
      {plan.highlighted && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-600/10 rounded-2xl"></div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-gray-400 mb-4">{plan.description}</p>
          
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold gradient-text">{plan.price}</span>
            <span className="text-gray-400 ml-1">{plan.period}</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <ApperIcon 
                  name="Check" 
                  size={16} 
                  className="text-green-400" 
                />
              </div>
              <span className="text-gray-300 text-sm leading-relaxed">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant={plan.buttonVariant}
          className="w-full justify-center"
          size="lg"
        >
          {plan.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;