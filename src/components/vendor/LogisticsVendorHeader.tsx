import React from "react";
import { useLocation } from "react-router-dom";
import { GenericHeader } from "@/components/shared/layout/GenericHeader"; // Make sure this path is correct
import { logisticsVendorHeaderConfig } from "@/utils/navigationConfigs"; // Make sure this path is correct

export const LogisticsVendorHeader = () => {
  const location = useLocation();
  
  const config = {
    ...logisticsVendorHeaderConfig,
    navItems: logisticsVendorHeaderConfig.navItems.map(item => ({
      ...item,
      active: location.pathname === item.href
    }))
  };

  return <GenericHeader config={config} />;
};