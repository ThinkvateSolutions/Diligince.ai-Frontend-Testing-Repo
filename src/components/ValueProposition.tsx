<<<<<<< HEAD

import { Users, Wrench, Truck } from "lucide-react";
=======
<<<<<<< HEAD
import { Users, Wrench, Truck } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
=======

import { Users, Wrench, Truck } from "lucide-react";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

const ValueProposition = () => {
  const values = [
    {
<<<<<<< HEAD
      icon: <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
=======
<<<<<<< HEAD
      icon: <Users className="h-10 w-10 text-blue-600" />,
>>>>>>> 9b0ce35 (Initial commit)
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
<<<<<<< HEAD
      description: "Optimize supply chains with logistics providers offering transportation solutions, heavy equipment rentals including trucks, cranes, and bulldozers, and specialized material handling for industrial operations.",
=======
      description:
        "Optimize supply chains with logistics providers offering transportation solutions, heavy equipment rentals including trucks, cranes, and bulldozers, and specialized material handling for industrial operations.",
=======
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
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    },
  ];

  return (
<<<<<<< HEAD
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">How We Connect The Industrial Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
=======
<<<<<<< HEAD
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
>>>>>>> 9b0ce35 (Initial commit)
          {values.map((value, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] feature-card"
            >
<<<<<<< HEAD
=======
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
=======
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">How We Connect The Industrial Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] feature-card"
            >
>>>>>>> 9b0ce35 (Initial commit)
              {value.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
