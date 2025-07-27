import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FeatureCard from "@/components/molecules/FeatureCard";
import { featuresService } from "@/services/api/featuresService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const FeaturesSection = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      setError("");
      const data = await featuresService.getFeatures();
      setFeatures(data);
    } catch (err) {
      setError("Failed to load features");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <Loading />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <Error message={error} onRetry={loadFeatures} />
        </div>
      </section>
    );
  }

  if (features.length === 0) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <Empty 
            title="No features available"
            description="Features will be displayed here once they're loaded."
            icon="Layers"
          />
        </div>
      </section>
    );
  }

  return (
    <section id="features" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/5 via-transparent to-primary-600/5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into working automation workflows in three simple steps
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                feature={feature}
                showConnector={index < features.length - 1}
                connectorDirection="right"
              />
            </motion.div>
          ))}

          {/* Step Numbers */}
          {features.map((_, index) => (
            <div
              key={`step-${index}`}
              className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block"
              style={{
                left: `${(index + 1) * 33.33 - 16.67}%`
              }}
            >
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to automate your workflows?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of users who are already building powerful automations with natural language.
            </p>
            <button
              onClick={() => {
                const pricingSection = document.querySelector("#pricing");
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="btn-primary text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
            >
              Get Started Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;