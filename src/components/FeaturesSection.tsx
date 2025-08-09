import { BrainCircuit, Workflow, ShieldCheck, LineChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: <BrainCircuit className="h-10 w-10 text-blue-600" />,
      title: "AI Matching",
      description:
        "Our intelligent system analyzes requirements and capabilities to connect industries with the perfect service providers, considering expertise, location, availability and past performance.",
    },
    {
      icon: <Workflow className="h-10 w-10 text-blue-600" />,
      title: "Project Management",
      description:
        "Track requirements, schedules and payments seamlessly with our comprehensive industrial project management tools, customized dashboards, and automated milestone tracking.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
      title: "Quality Control",
      description:
        "Verify services with real feedback and ratings from other industries, ensuring reliability through our transparent verification system and performance history tracking.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-blue-600" />,
      title: "Real-Time Tools",
      description:
        "Make data-driven decisions with live analytics on service performance, costs and timelines, giving you actionable insights into your industrial operations and vendor relationships.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f9fbfc] to-[#eef3f8] text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gray-900">
            Why Choose <span className="text-blue-600">Diligince.ai</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Industrial-grade AI. Built for performance. Designed for trust.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative bg-white border border-gray-200 shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-[1.02] rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 group-hover:opacity-100 transition-opacity duration-300 opacity-75"></div>
              <CardHeader className="text-center py-6 px-4">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
