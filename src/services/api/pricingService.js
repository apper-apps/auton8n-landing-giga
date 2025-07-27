import pricingData from "@/services/mockData/pricing.json";

export const pricingService = {
  async getPricingPlans() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...pricingData];
  },

  async getPlanById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return pricingData.find(plan => plan.id === parseInt(id));
  }
};