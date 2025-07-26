import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  image?: string;
  ctaPrimary?: {
    label: string;
    to: string;
  };
  ctaSecondary?: {
    label: string;
    to?: string;
    onClick?: () => void;
  };
};

const HeroSection = ({
  title = "Empowering Industrial Innovation",
  subtitle =
    "Seamlessly connect with vendors, experts and logistics partners across India.",
  image = "/assets/hero-image.jpg",
  ctaPrimary = { label: "Join Now", to: "/signup" },
  ctaSecondary = { label: "Discover More", to: "/learn-more" },
}: HeroSectionProps) => {
  return (
    <section className="relative w-full h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 blur-[2px] brightness-[0.4]"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay Content */}
      <div className="relative z-10 text-center px-6 sm:px-12 max-w-7xl mx-auto">
        <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-xl animate-fade-in">
          {title}
        </h1>
        <p className="text-white/90 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-10 animate-fade-in delay-100">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in delay-200">
          <Link
            to={ctaPrimary.to}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            {ctaPrimary.label}
          </Link>

          {ctaSecondary?.to && (
            <Link
              to={ctaSecondary.to}
              className="px-10 py-4 border border-white/40 text-white text-lg font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 hover:scale-105 transition duration-300"
            >
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
