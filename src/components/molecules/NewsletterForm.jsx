import React, { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const NewsletterForm = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Thanks for subscribing! You'll hear from us soon.");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      
      <Button
        type="submit"
        variant="primary"
        loading={loading}
        disabled={loading}
        className="w-full"
      >
        Subscribe to Updates
      </Button>
    </form>
  );
};

export default NewsletterForm;