import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/atoms/Logo";
import NavigationMenu from "@/components/molecules/NavigationMenu";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { navigationService } from "@/services/api/navigationService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const Header = () => {
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    loadNavigation();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadNavigation = async () => {
    try {
      setError("");
      const data = await navigationService.getNavigationItems();
      setNavItems(data);
    } catch (err) {
      setError("Failed to load navigation");
    } finally {
      setLoading(false);
    }
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileItemClick = () => {
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <header className="fixed w-full top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="h-8 w-32 bg-gray-800 rounded animate-pulse"></div>
            <div className="hidden md:flex space-x-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="h-6 w-16 bg-gray-800 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="h-8 w-8 bg-gray-800 rounded md:hidden animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="fixed w-full top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Error message={error} onRetry={loadNavigation} />
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-800" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu items={navItems} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <ApperIcon 
              name={mobileMenuOpen ? "X" : "Menu"} 
              size={24} 
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800"
            >
              <div className="px-4 py-6">
                <NavigationMenu 
                  items={navItems} 
                  mobile={true}
                  onItemClick={handleMobileItemClick}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;