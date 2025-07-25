import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
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

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<'freemium' | 'pro' | 'enterprise'>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'sixmonth' | 'yearly'>('monthly');
  const navigate = useNavigate();

  const handleGetStarted = () => navigate("/signup");
  const handleSubscribe = () => navigate("/signup");
  const handleContactSales = () => navigate("/contact");
  const handleContactUs = () => navigate("/contact");

  const getPrice = (plan: string) => {
    const prices: Record<string, Record<string, string>> = {
      freemium: {
        monthly: '₹0',
        sixmonth: '₹0',
        yearly: '₹0',
      },
      pro: {
        monthly: '₹500',
        sixmonth: '₹2700',
        yearly: '₹5000',
      },
      enterprise: {
        monthly: 'Custom',
        sixmonth: 'Custom',
        yearly: 'Custom',
      },
    };
    return prices[plan][billingCycle];
  };

  const icons: Record<string, JSX.Element> = {
    freemium: <Gem className="h-8 w-8 text-indigo-500" />,
    pro: <Briefcase className="h-8 w-8 text-indigo-500" />,
    enterprise: <Building2 className="h-8 w-8 text-indigo-500" />,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Simple, Transparent <span className="text-indigo-600">Pricing</span>
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Choose the plan that works best for your business needs with our flexible model.
              </p>
            </div>

            <div className="flex justify-center gap-6 mb-12 flex-wrap">
              {['monthly', 'sixmonth', 'yearly'].map((cycle) => (
                <label key={cycle} className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm md:text-base">
                  <input
                    type="radio"
                    name="billingCycle"
                    value={cycle}
                    checked={billingCycle === cycle}
                    onChange={(e) => setBillingCycle(e.target.value as any)}
                  />
                  {cycle === 'monthly' && 'Monthly'}
                  {cycle === 'sixmonth' && '6 Months'}
                  {cycle === 'yearly' && 'Yearly (Save 20%)'}
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {["freemium", "pro", "enterprise"].map((plan) => (
                <Card
                  key={plan}
                  className={`bg-white border cursor-pointer relative rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                    selectedPlan === plan ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-gray-100'
                  }`}
                  onClick={() => setSelectedPlan(plan as any)}
                >
                  {plan === "pro" && (
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-xl rounded-tr-2xl">
                      Most Popular
                    </div>
                  )}
                  {plan === "freemium" && (
                    <div className="absolute top-0 left-0 bg-gray-200 text-gray-700 px-3 py-1 text-xs font-semibold rounded-tr-xl rounded-bl-2xl">
                      Forever Free
                    </div>
                  )}
                  <div>
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-3">{icons[plan]}</div>
                      <CardTitle className="text-2xl font-bold text-gray-900 capitalize">
                        {plan}
                      </CardTitle>
                      <div className="mt-3">
                        <span className="text-3xl font-extrabold text-gray-900">{getPrice(plan)}</span>
                        {plan !== 'enterprise' && (
                          <span className="text-gray-500 ml-1 text-sm">/{billingCycle}</span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {(
                          plan === "freemium" ? [
                            "Basic profile creation",
                            "Limited matching capabilities",
                            "Access to marketplace",
                            "Basic search functionality",
                            "Upgrade anytime to Pro",
                          ] :
                          plan === "pro" ? [
                            "All Freemium features",
                            "Unlimited matches",
                            "Advanced AI matching",
                            "Detailed analytics",
                            "Priority support",
                            ...(billingCycle === 'yearly' ? ["Free onboarding"] : []),
                          ] :
                          [
                            "All Pro features",
                            "Custom integration",
                            "Dedicated account manager",
                            "Customized reporting",
                            "SLA guarantees",
                            ...(billingCycle !== 'monthly' ? ["Custom onboarding"] : []),
                          ]
                        ).map((item, i) => (
                          <li key={i} className="flex items-start">
                            <BadgeCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span className="text-gray-700 text-sm md:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                  <CardFooter className="mt-auto px-6 pb-6">
                    <Button
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm md:text-base"
                      onClick={(e) => {
                        e.stopPropagation();
                        plan === "enterprise" ? handleContactSales() : handleSubscribe();
                      }}
                    >
                      {plan === "freemium" ? "Start for Free" : plan === "pro" ? "Subscribe Now" : "Contact Sales"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-white rounded-xl p-8 border border-gray-100 shadow max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-3 text-gray-900">Transaction Fee</h2>
                <p className="text-gray-600 text-base">
                  For all successful transactions through our platform, we charge a 5% commission fee. This helps us maintain and improve our services while ensuring fair value for all parties.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Have questions about our pricing?</h3>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm md:text-base" onClick={handleContactUs}>
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
