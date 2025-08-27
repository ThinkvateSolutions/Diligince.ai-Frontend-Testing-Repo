import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
=======
<<<<<<< HEAD
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  Gem,
  Briefcase,
  Building2,
  BadgeCheck,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
>>>>>>> 9b0ce35 (Initial commit)

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise'>('pro');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleSubscribe = () => {
    // In a real app, this would redirect to payment processing
    navigate("/signup");
  };

  const handleContactSales = () => {
    navigate("/contact");
  };

  const handleContactUs = () => {
    navigate("/contact");
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col bg-gray-50">
=======
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
=======
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise'>('pro');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleSubscribe = () => {
    // In a real app, this would redirect to payment processing
    navigate("/signup");
  };

  const handleContactSales = () => {
    navigate("/contact");
  };

  const handleContactUs = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
<<<<<<< HEAD
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Choose the plan that works best for your business needs with our freemium model.
=======
<<<<<<< HEAD
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Simple, Transparent <span className="text-indigo-600">Pricing</span>
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Choose the plan that works best for your business needs with our flexible model.
>>>>>>> 9b0ce35 (Initial commit)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Tier */}
              <Card 
                className={`bg-white border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === 'free' 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'border border-gray-100 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan('free')}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Free</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">₹0</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Basic profile creation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Limited matching capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Access to marketplace</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Basic search functionality</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetStarted();
                    }}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Tier */}
              <Card 
                className={`bg-white border cursor-pointer relative transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === 'pro' 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'border border-gray-100 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan('pro')}
              >
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Pro</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">₹500</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">All Free features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Unlimited matches</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Advanced AI matching</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Detailed analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe();
                    }}
                  >
                    Subscribe Now
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Tier */}
              <Card 
                className={`bg-white border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === 'enterprise' 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'border border-gray-100 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan('enterprise')}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Enterprise</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">Custom</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">All Pro features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Custom integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Customized reporting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">SLA guarantees</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactSales();
                    }}
                  >
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-16 text-center">
<<<<<<< HEAD
=======
              <div className="bg-white rounded-xl p-8 border border-gray-100 shadow max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-3 text-gray-900">Transaction Fee</h2>
                <p className="text-gray-600 text-base">
                  For all successful transactions through our platform, we charge a 5% commission fee. This helps us maintain and improve our services while ensuring fair value for all parties.
=======
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Choose the plan that works best for your business needs with our freemium model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Tier */}
              <Card 
                className={`bg-white border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === 'free' 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'border border-gray-100 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan('free')}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Free</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">₹0</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Basic profile creation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Limited matching capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Access to marketplace</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Basic search functionality</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetStarted();
                    }}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Tier */}
              <Card 
                className={`bg-white border cursor-pointer relative transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === 'pro' 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'border border-gray-100 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan('pro')}
              >
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Pro</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">₹500</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">All Free features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Unlimited matches</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Advanced AI matching</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Detailed analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe();
                    }}
                  >
                    Subscribe Now
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Tier */}
              <Card 
                className={`bg-white border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === 'enterprise' 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'border border-gray-100 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan('enterprise')}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Enterprise</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">Custom</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">All Pro features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Custom integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Customized reporting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">SLA guarantees</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactSales();
                    }}
                  >
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-16 text-center">
>>>>>>> 9b0ce35 (Initial commit)
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Transaction Fee</h2>
                <p className="text-gray-600">
                  For all successful transactions through our platform, we charge a 5% commission fee.
                  This helps us maintain and improve our services while ensuring fair value for all parties.
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Have questions about our pricing?</h3>
<<<<<<< HEAD
=======
<<<<<<< HEAD
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm md:text-base" onClick={handleContactUs}>
=======
>>>>>>> 9b0ce35 (Initial commit)
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleContactUs}
              >
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
