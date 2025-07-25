import { Users, Wrench, Truck } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const ValueProposition = () => {
  const values = [
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "Professionals",
      description:
        "Find verified experts fast for maintenance, operations, safety inspections, and specialized technical roles across all industrial sectors. Our platform connects you with pre-vetted professionals with proven experience.",
    },
    {
      icon: <Wrench className="h-10 w-10 text-blue-600" />,
      title: "Vendors",
      description:
        "Access quality services from verified vendors offering maintenance services, spare parts, equipment repairs, and specialized machinery like cranes, forklifts, and industrial tools for various plant operations.",
    },
    {
      icon: <Truck className="h-10 w-10 text-blue-600" />,
      title: "Logistics",
      description:
        "Optimize supply chains with logistics providers offering transportation solutions, heavy equipment rentals including trucks, cranes, and bulldozers, and specialized material handling for industrial operations.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gray-900">
            Connecting the <span className="text-blue-600">Industrial Ecosystem</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Built to seamlessly connect professionals, vendors, and logistics
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <Card
              key={index}
              className="relative bg-gray-50 border border-gray-200 shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-[1.02] rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 group-hover:opacity-100 transition-opacity duration-300 opacity-75"></div>
              <CardHeader className="text-center py-6 px-4">
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
