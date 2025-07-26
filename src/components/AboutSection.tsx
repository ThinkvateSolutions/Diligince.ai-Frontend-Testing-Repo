import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const cardData = [
  {
    title: "Our Vision",
    content:
      "To create the most intelligent and efficient industrial services marketplace in India, making it seamless to connect plant owners with the services they need.",
  },
  {
    title: "Pricing",
    content:
      "Freemium model: Free tier for basic matching. Pro tier: ₹500/month for unlimited matches, analytics and priority support. 5% commission on transactions.",
  },
  {
    title: "Contact",
    content: (
      <>
        Reach us at: Visakhapatnam, Andhra Pradesh, India.<br />
        Phone: <a href="tel:+919848756956" className="text-blue-500 underline hover:text-blue-700 transition">+91 9848756956</a><br />
        Email: <a href="mailto:support@diligince.ai" className="text-blue-500 underline hover:text-blue-700 transition">support@diligince.ai</a>
      </>
    ),
  },
];

const AboutSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f4f7fa] to-[#e8edf3] text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-gray-900">
            About <span className="text-blue-600">Diligince.ai</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            We're an AI-powered platform connecting industrial plants with Vendors, Professionals, and Logistics. Launching in 2025, our mission is to revolutionize how industries discover and work with service providers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map(({ title, content }, idx) => (
            <Card
              key={idx}
              className="bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-blue-700">
                  {title}
                </h3>
                <div className="text-gray-700 text-base leading-relaxed">
                  {content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
