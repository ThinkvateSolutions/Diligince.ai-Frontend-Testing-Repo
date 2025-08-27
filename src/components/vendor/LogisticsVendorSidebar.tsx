<<<<<<< HEAD
import React from "react";
import { User, Truck, MapPin, Package, Users, CreditCard, Settings } from "lucide-react";
import { BaseSidebar } from "./shared/BaseSidebar";// Make sure this path to BaseSidebar is correct
import { VendorData } from "@/types/vendor-sidebar";
import { useVendorSpecialization } from "@/contexts/VendorSpecializationContext";
import { getSpecializationDisplayName } from "@/utils/vendorSpecializationMapping";

type LogisticsMenuSection = 
=======
<<<<<<< HEAD

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyInfoForm } from "@/components/vendor/logistics/CompanyInfoForm";
import { FleetEquipmentSection } from "@/components/vendor/logistics/FleetEquipmentSection";
import { ServiceAreasSection } from "@/components/vendor/logistics/ServiceAreasSection";
import { LicensesPermitsSection } from "@/components/vendor/logistics/LicensesPermitsSection";
import { DriversPersonnelSection } from "@/components/vendor/logistics/DriversPersonnelSection";
import PaymentSettingsForm from "@/components/vendor/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/forms/AccountSettingsForm";
import { LogisticsVendorSidebar as StandardizedLogisticsVendorSidebar } from "@/components/vendor/logistics/LogisticsVendorSidebar";
import { SpecializationFeatures } from "@/components/vendor/logistics/SpecializationFeatures";
import { useUser } from "@/contexts/UserContext";

type MenuSection = 
=======
import React from "react";
import { User, Truck, MapPin, Package, Users, CreditCard, Settings } from "lucide-react";
import { BaseSidebar } from "./shared/BaseSidebar";// Make sure this path to BaseSidebar is correct
import { VendorData } from "@/types/vendor-sidebar";
import { useVendorSpecialization } from "@/contexts/VendorSpecializationContext";
import { getSpecializationDisplayName } from "@/utils/vendorSpecializationMapping";

type LogisticsMenuSection = 
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  | "company-info" 
  | "fleet-equipment" 
  | "service-areas" 
  | "licenses-permits"
  | "drivers-personnel"
  | "payment-settings"
  | "account-settings";

<<<<<<< HEAD
interface LogisticsVendorSidebarProps {
  activeSection: LogisticsMenuSection;
  onSectionChange: (section: LogisticsMenuSection) => void;
  vendorData: VendorData;
  profileCompletion: number;
}
=======
<<<<<<< HEAD
export const LogisticsVendorSidebar = () => {
  const [activeSection, setActiveSection] = useState<MenuSection>("company-info");
  const { user } = useUser();
  const profileCompletion = 65;
>>>>>>> 9b0ce35 (Initial commit)

export const LogisticsVendorSidebar = ({
  activeSection,
  onSectionChange,
  vendorData,
  profileCompletion
}: LogisticsVendorSidebarProps) => {
  const { specialization } = useVendorSpecialization();

  const menuItems = [
    { id: "company-info", label: "Company Info", icon: <User className="h-5 w-5" /> },
    { 
      id: "fleet-equipment", 
      label: specialization === 'heavy-equipment' || specialization === 'crane-services' 
        ? 'Equipments & Fleet' 
        : 'Fleet & Equipments',
      icon: <Truck className="h-5 w-5" />
    },
    { id: "service-areas", label: "Service Areas", icon: <MapPin className="h-5 w-5" /> },
    { id: "licenses-permits", label: "Licenses & Permits", icon: <Package className="h-5 w-5" /> },
    { 
      id: "drivers-personnel", 
      label: specialization === 'heavy-equipment' || specialization === 'crane-services'
        ? 'Operators & Personnel'
        : 'Drivers & Personnel',
      icon: <Users className="h-5 w-5" />
    },
    { id: "payment-settings", label: "Payment Settings", icon: <CreditCard className="h-5 w-5" /> },
    { id: "account-settings", label: "Account Settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const enhancedVendorData = {
    ...vendorData,
    specialization: getSpecializationDisplayName(specialization)
  };

  return (
    <BaseSidebar
      activeSection={activeSection}
      onSectionChange={onSectionChange}
      vendorData={enhancedVendorData}
      profileCompletion={profileCompletion}
      menuItems={menuItems}
      vendorType="logistics"
    />
  );
<<<<<<< HEAD
};
=======
};
=======
interface LogisticsVendorSidebarProps {
  activeSection: LogisticsMenuSection;
  onSectionChange: (section: LogisticsMenuSection) => void;
  vendorData: VendorData;
  profileCompletion: number;
}

export const LogisticsVendorSidebar = ({
  activeSection,
  onSectionChange,
  vendorData,
  profileCompletion
}: LogisticsVendorSidebarProps) => {
  const { specialization } = useVendorSpecialization();

  const menuItems = [
    { id: "company-info", label: "Company Info", icon: <User className="h-5 w-5" /> },
    { 
      id: "fleet-equipment", 
      label: specialization === 'heavy-equipment' || specialization === 'crane-services' 
        ? 'Equipments & Fleet' 
        : 'Fleet & Equipments',
      icon: <Truck className="h-5 w-5" />
    },
    { id: "service-areas", label: "Service Areas", icon: <MapPin className="h-5 w-5" /> },
    { id: "licenses-permits", label: "Licenses & Permits", icon: <Package className="h-5 w-5" /> },
    { 
      id: "drivers-personnel", 
      label: specialization === 'heavy-equipment' || specialization === 'crane-services'
        ? 'Operators & Personnel'
        : 'Drivers & Personnel',
      icon: <Users className="h-5 w-5" />
    },
    { id: "payment-settings", label: "Payment Settings", icon: <CreditCard className="h-5 w-5" /> },
    { id: "account-settings", label: "Account Settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const enhancedVendorData = {
    ...vendorData,
    specialization: getSpecializationDisplayName(specialization)
  };

  return (
    <BaseSidebar
      activeSection={activeSection}
      onSectionChange={onSectionChange}
      vendorData={enhancedVendorData}
      profileCompletion={profileCompletion}
      menuItems={menuItems}
      vendorType="logistics"
    />
  );
};
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
