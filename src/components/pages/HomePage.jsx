import React from "react";
import Header from "@/components/organisms/Header";
import HeroSection from "@/components/organisms/HeroSection";
import FeaturesSection from "@/components/organisms/FeaturesSection";
import PricingSection from "@/components/organisms/PricingSection";
import Footer from "@/components/organisms/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;