
import { Users, Wrench, Truck } from "lucide-react";

const ValueProposition = () => {
  const values = [
    {
      icon: <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
      title: "Professionals",
      description: "Find verified experts fast for maintenance, operations, safety inspections, and specialized technical roles across all industrial sectors. Our platform connects you with pre-vetted professionals with proven experience.",
    },
    {
      icon: <Wrench className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
      title: "Vendors",
      description: "Access quality services from verified vendors offering maintenance services, spare parts, equipment repairs, and specialized machinery like cranes, forklifts, and industrial tools for various plant operations.",
    },
    {
      icon: <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
      title: "Logistics",
      description: "Optimize supply chains with logistics providers offering transportation solutions, heavy equipment rentals including trucks, cranes, and bulldozers, and specialized material handling for industrial operations.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">How We Connect The Industrial Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] feature-card"
            >
              {value.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
