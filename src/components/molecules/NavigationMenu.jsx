import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavigationMenu = ({ 
  items = [], 
  className = "",
  mobile = false,
  onItemClick = () => {}
}) => {
  const handleItemClick = (item, e) => {
    if (item.isComingSoon) {
      e.preventDefault();
      return;
    }
    
    onItemClick(item);
    
    // Handle anchor links
    if (item.href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={cn(
      mobile ? "flex flex-col space-y-4" : "flex items-center space-x-8",
      className
    )}>
      {items.map((item, index) => (
        <div key={index} className="relative">
          <NavLink
            to={item.href}
            onClick={(e) => handleItemClick(item, e)}
            className={cn(
              "font-medium transition-colors duration-200 flex items-center space-x-2",
              mobile 
                ? "text-gray-300 hover:text-white py-2 px-4 rounded-lg hover:bg-gray-800" 
                : "text-gray-300 hover:text-white",
              item.isComingSoon && "cursor-not-allowed opacity-75"
            )}
          >
            <span>{item.label}</span>
            {item.isComingSoon && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-600 text-white ml-2">
                Coming Soon
              </span>
            )}
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default NavigationMenu;