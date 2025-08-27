<<<<<<< HEAD
=======
<<<<<<< HEAD
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
>>>>>>> 9b0ce35 (Initial commit)

import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">About Diligince.ai</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We are an AI powered platform connecting industrial plants with Vendors, Professionals and Logistics. 
            Launching in 2025, our mission is to revolutionize how industries find and collaborate with service providers.
          </p>
        </div>

<<<<<<< HEAD
=======
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
=======

import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">About Diligince.ai</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We are an AI powered platform connecting industrial plants with Vendors, Professionals and Logistics. 
            Launching in 2025, our mission is to revolutionize how industries find and collaborate with service providers.
          </p>
        </div>

>>>>>>> 9b0ce35 (Initial commit)
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Our Vision</h3>
              <p className="text-gray-600">
                To create the most intelligent and efficient industrial services marketplace in India, 
                making it seamless to connect plant owners with the services they need.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Pricing</h3>
              <p className="text-gray-600">
                Freemium model: Free tier for basic matching. Pro tier: ₹500/month for unlimited matches, 
                analytics and priority support. 5% commission on transactions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Contact</h3>
              <p className="text-gray-600">
                Reach us at: Visakhapatnam, Andhra Pradesh, India. 
                Phone: +91 9848756956. Email: support@diligince.ai.
              </p>
            </CardContent>
          </Card>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
