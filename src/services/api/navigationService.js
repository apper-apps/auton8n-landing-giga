import navigationData from "@/services/mockData/navigation.json";

export const navigationService = {
  async getNavigationItems() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...navigationData];
  }
};