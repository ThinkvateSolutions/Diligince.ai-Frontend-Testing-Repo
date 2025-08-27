import React from "react";
import { useVendorSpecialization } from "@/contexts/VendorSpecializationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Wrench, Package, Route } from "lucide-react";
import { getSpecializationDisplayName, getSpecializationBadgeColor } from "@/utils/vendorSpecializationMapping";

export const SpecializationFeatures = () => {
  const { specialization, needsRouteOptimizer } = useVendorSpecialization();
  const displayName = getSpecializationDisplayName(specialization);
  const badgeColor = getSpecializationBadgeColor(specialization);

  const getFeaturesBySpecialization = () => {
    switch (specialization) {
      case 'transportation':
      case 'freight-forwarding':
      case 'specialized-transport':
        return {
          primaryFeature: 'Route Optimizer',
          primaryIcon: <Route className="h-5 w-5" />,
          description: 'Optimize delivery routes for maximum efficiency and cost savings',
          secondaryFeatures: [
            'Live GPS Tracking',
            'Driver Communication',
            'Delivery Scheduling',
            'Fuel Optimization'
          ]
        };
      case 'heavy-equipment':
        return {
          primaryFeature: 'Equipment Deployment',
          primaryIcon: <Wrench className="h-5 w-5" />,
          description: 'Manage equipment rentals and deployment schedules',
          secondaryFeatures: [
            'Equipment Tracking',
            'Maintenance Scheduling',
            'Operator Assignment',
            'Utilization Reports'
          ]
        };
      case 'crane-services':
        return {
          primaryFeature: 'Crane Management',
          primaryIcon: <Package className="h-5 w-5" />,
          description: 'Specialized crane operations and scheduling system',
          secondaryFeatures: [
            'Lift Planning',
            'Safety Compliance',
            'Operator Certification',
            'Site Coordination'
          ]
        };
      case 'warehouse':
        return {
          primaryFeature: 'Warehouse Optimizer',
          primaryIcon: <Package className="h-5 w-5" />,
          description: 'Manage inventory, storage, and warehouse operations',
          secondaryFeatures: [
            'Inventory Tracking',
            'Space Optimization',
            'Pick & Pack',
            'Shipping Integration'
          ]
        };
      default:
        return {
          primaryFeature: 'Logistics Management',
          primaryIcon: <MapPin className="h-5 w-5" />,
          description: 'Comprehensive logistics management tools',
          secondaryFeatures: []
        };
    }
  };

  const features = getFeaturesBySpecialization();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Your Specialization</CardTitle>
<<<<<<< HEAD
          <Badge className="bg-[#eb2f96]/10 hover:bg-[#eb2f96]/10 text-black">
=======
<<<<<<< HEAD
          <Badge className={badgeColor}>
=======
          <Badge className="bg-[#eb2f96]/10 hover:bg-[#eb2f96]/10 text-black">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            {displayName}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
<<<<<<< HEAD
        <div className="flex items-center gap-3 p-4 bg-[#eb2f96]/10 rounded-lg">
=======
<<<<<<< HEAD
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
>>>>>>> 9b0ce35 (Initial commit)
          {features.primaryIcon}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">{features.primaryFeature}</h3>
            <p className="text-sm text-gray-500">{features.description}</p>
          </div>
<<<<<<< HEAD
          <Button size="sm" className="bg-[#eb2f96] hover:bg-[#c4257d]">
=======
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
=======
        <div className="flex items-center gap-3 p-4 bg-[#eb2f96]/10 rounded-lg">
          {features.primaryIcon}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">{features.primaryFeature}</h3>
            <p className="text-sm text-gray-500">{features.description}</p>
          </div>
          <Button size="sm" className="bg-[#eb2f96] hover:bg-[#c4257d]">
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
            {needsRouteOptimizer ? 'Open Route Optimizer' : 'Manage Equipment'}
          </Button>
        </div>

        {features.secondaryFeatures.length > 0 && (
          <div>
<<<<<<< HEAD
            <h4 className="text-xl font-bold text-gray-800 mb-1">Available Features:</h4>
            <div className="grid grid-cols-2 gap-2">
              {features.secondaryFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-[#eb2f96] rounded-full" />
=======
<<<<<<< HEAD
            <h4 className="font-medium mb-2">Available Features:</h4>
            <div className="grid grid-cols-2 gap-2">
              {features.secondaryFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
=======
            <h4 className="text-xl font-bold text-gray-800 mb-1">Available Features:</h4>
            <div className="grid grid-cols-2 gap-2">
              {features.secondaryFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-[#eb2f96] rounded-full" />
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  {feature}
                </div>
              ))}
            </div>
          </div>
        )}

<<<<<<< HEAD
        {/* <div className="pt-2 text-xs text-gray-500 border-t">
          Route Optimizer: {needsRouteOptimizer ? 'Available' : 'Not applicable for your specialization'}
        </div> */}
=======
<<<<<<< HEAD
        <div className="pt-2 text-xs text-gray-500 border-t">
          Route Optimizer: {needsRouteOptimizer ? 'Available' : 'Not applicable for your specialization'}
        </div>
=======
        {/* <div className="pt-2 text-xs text-gray-500 border-t">
          Route Optimizer: {needsRouteOptimizer ? 'Available' : 'Not applicable for your specialization'}
        </div> */}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      </CardContent>
    </Card>
  );
};