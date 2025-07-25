
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ValueProposition from "../components/ValueProposition";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Diligence.ai - AI-Powered Procurement Platform</title>
        <meta name="description" content="Streamline your procurement process with AI-powered vendor matching, requirement management, and workflow automation." />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ValueProposition />
        <AboutSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
