import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PricingCard from "@/components/molecules/PricingCard";
import { pricingService } from "@/services/api/pricingService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const PricingSection = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPricing();
  }, []);

  const loadPricing = async () => {
    try {
      setError("");
      const data = await pricingService.getPricingPlans();
      setPlans(data);
    } catch (err) {
      setError("Failed to load pricing plans");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <Loading />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <Error message={error} onRetry={loadPricing} />
        </div>
      </section>
    );
  }

  if (plans.length === 0) {
    return (
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <Empty 
            title="No pricing plans available"
            description="Pricing plans will be displayed here once they're loaded."
            icon="CreditCard"
          />
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
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
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that fits your automation needs. Start free and scale as you grow.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="glass rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                Can I change plans anytime?
              </h4>
              <p className="text-gray-300">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                What happens if I exceed my workflow limit?
              </h4>
              <p className="text-gray-300">
                On the Free plan, you'll be prompted to upgrade once you reach 5 workflows. Pro and Business plans have no limits.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                Do you offer refunds?
              </h4>
              <p className="text-gray-300">
                We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll refund your payment in full.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                Can I export my workflows?
              </h4>
              <p className="text-gray-300">
                Absolutely! All plans include JSON export functionality. Your workflows are portable and can be imported into any n8n instance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 backdrop-blur-sm border border-primary-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need a custom solution?
            </h3>
            <p className="text-gray-300 mb-6">
              Large teams and enterprises can get custom pricing, dedicated support, and additional features.
            </p>
            <button
              onClick={() => window.open("mailto:sales@auton8n.com", "_blank")}
              className="btn-secondary text-primary-400 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Contact Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;