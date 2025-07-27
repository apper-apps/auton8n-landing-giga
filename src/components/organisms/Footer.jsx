import React, { useState, useEffect } from "react";
import Logo from "@/components/atoms/Logo";
import NewsletterForm from "@/components/molecules/NewsletterForm";
import ApperIcon from "@/components/ApperIcon";
import { footerService } from "@/services/api/footerService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const Footer = () => {
  const [footerSections, setFooterSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFooterData();
  }, []);

  const loadFooterData = async () => {
    try {
      setError("");
      const data = await footerService.getFooterLinks();
      setFooterSections(data);
    } catch (err) {
      setError("Failed to load footer data");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = (href, e) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (loading) {
    return (
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <div className="h-8 w-32 bg-gray-800 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-800 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-800 rounded"></div>
                </div>
              </div>
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <div className="h-6 w-20 bg-gray-800 rounded mb-4"></div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((link) => (
                      <div key={link} className="h-4 w-16 bg-gray-800 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <Error message={error} onRetry={loadFooterData} />
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-950 border-t border-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2">
            <Logo size="lg" className="mb-6" />
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              AutoN8N makes workflow automation accessible to everyone. Transform your ideas into production-ready n8n workflows using the power of natural language processing.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-400 mb-4 text-sm">
                Get the latest features, tips, and automation insights delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/auton8n"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200 hover:scale-105"
              >
                <ApperIcon name="Twitter" size={20} />
              </a>
              <a
                href="https://github.com/auton8n"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200 hover:scale-105"
              >
                <ApperIcon name="Github" size={20} />
              </a>
              <a
                href="https://linkedin.com/company/auton8n"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200 hover:scale-105"
              >
                <ApperIcon name="Linkedin" size={20} />
              </a>
              <a
                href="https://discord.gg/auton8n"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200 hover:scale-105"
              >
                <ApperIcon name="MessageCircle" size={20} />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.href, e)}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AutoN8N. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <ApperIcon name="Shield" size={16} />
                <span>Security & Privacy</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;