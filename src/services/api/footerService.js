import footerData from "@/services/mockData/footerLinks.json";

export const footerService = {
  async getFooterLinks() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...footerData];
  }
};