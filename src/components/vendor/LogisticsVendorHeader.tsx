<<<<<<< HEAD
import React from "react";
import { useLocation } from "react-router-dom";
import { GenericHeader } from "@/components/shared/layout/GenericHeader"; // Make sure this path is correct
import { logisticsVendorHeaderConfig } from "@/utils/navigationConfigs"; // Make sure this path is correct
=======
<<<<<<< HEAD

import React from "react";
import { useLocation } from "react-router-dom";
import { GenericHeader } from "@/components/shared/layout/GenericHeader";
import { logisticsVendorHeaderConfig } from "@/utils/navigationConfigs";
=======
import React from "react";
import { useLocation } from "react-router-dom";
import { GenericHeader } from "@/components/shared/layout/GenericHeader"; // Make sure this path is correct
import { logisticsVendorHeaderConfig } from "@/utils/navigationConfigs"; // Make sure this path is correct
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

export const LogisticsVendorHeader = () => {
  const location = useLocation();
  
<<<<<<< HEAD
=======
<<<<<<< HEAD
  // Update nav items to reflect current active state
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  const config = {
    ...logisticsVendorHeaderConfig,
    navItems: logisticsVendorHeaderConfig.navItems.map(item => ({
      ...item,
      active: location.pathname === item.href
    }))
  };

  return <GenericHeader config={config} />;
<<<<<<< HEAD
};
=======
<<<<<<< HEAD
};
=======
};
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
