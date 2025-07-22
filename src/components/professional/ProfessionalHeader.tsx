
import React from "react";
import { GenericHeader } from "@/components/shared/layout/GenericHeader";
import { professionalHeaderConfig} from "@/utils/navigationConfigs";

const ProfessionalHeader = () => {
  return <GenericHeader config={professionalHeaderConfig} />;
};

export default ProfessionalHeader;
