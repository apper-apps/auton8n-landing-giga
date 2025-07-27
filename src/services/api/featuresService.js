import featuresData from "@/services/mockData/features.json";

export const featuresService = {
  async getFeatures() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...featuresData];
  },

  async getFeatureById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return featuresData.find(feature => feature.id === parseInt(id));
  }
};