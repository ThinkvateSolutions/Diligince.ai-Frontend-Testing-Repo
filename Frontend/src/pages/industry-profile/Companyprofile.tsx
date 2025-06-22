// import React from "react";
// import { useState, useEffect } from "react";
// import { 
//   Building, 
//   FileText, 
//   Users, 
//   CreditCard, 
//   Bell, 
//   Lock,
//   Edit,
//   Upload,
//   Plus,
//   Trash,
//   Mail,
//   Phone,
//   Printer,
//   Smartphone,
//   Globe,
//   Calendar,
//   Save,
//   X,
//   Home,
//   User,
//   Check
// } from "lucide-react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import IndustryProfile from "./IndustryProfile";

// // Constants and Types
// type PhoneType = "Mobile" | "Landline" | "Fax";

// const INDUSTRY_TYPES = [
//   "Chemical Industry",
//   "Construction",
//   "Energy - Oil & Gas",
//   "Energy - Renewable",
//   "Food Processing",
//   "Manufacturing - Automotive",
//   "Manufacturing - Electronics",
//   "Manufacturing - Steel Processing",
//   "Pharmaceuticals",
//   "Textile Industry"
// ] as const;

// const PUBLIC_EMAIL_DOMAINS = [
//   "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com"
// ];

// type CompanyProfileData = {
//   companyName: string;
//   industryType: string;
//   companyDescription: string;
//   gstNumber: string;
//   regNumber: string;
//   email: string;
//   landlineNumber: string;
//   faxNumber: string;
//   phoneNumber: string;
//   registeredAddress: string;
//   plantAddress: string;
//   website: string;
//   yearEstablished: string;
// };

// // Helper functions
// const validateEmail = (email: string): string | null => {
//   if (!email) return "Email is required";
  
//   const domain = email.split("@")[1];
//   if (domain && PUBLIC_EMAIL_DOMAINS.includes(domain.toLowerCase())) {
//     return "Please enter a valid company email address.";
//   }
  
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     return "Please enter a valid email address";
//   }
  
//   return null;
// };

// const getPhoneIcon = (phoneType: PhoneType) => {
//   switch (phoneType) {
//     case "Mobile": return <Smartphone className="w-4 h-4 inline mr-1" />;
//     case "Landline": return <Phone className="w-4 h-4 inline mr-1" />;
//     case "Fax": return <Printer className="w-4 h-4 inline mr-1" />;
//     default: return <Phone className="w-4 h-4 inline mr-1" />;
//   }
// };

// const CompanyProfile = () => {
//   // State management
//   const [formData, setFormData] = useState<CompanyProfileData>({
//     companyName: "",
//     industryType: "Manufacturing - Steel Processing",
//     companyDescription: "",
//     gstNumber: "",
//     regNumber: "",
//     email: "",
//     phoneNumber: "",
//     landlineNumber: "",
//     faxNumber: "",
//     registeredAddress: "",
//     plantAddress: "",
//     website: "",
//     yearEstablished: ""
//   });
  
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [editMode, setEditMode] = useState(false);
//   const [originalData, setOriginalData] = useState<CompanyProfileData | null>(null);
//   const [verificationStatus, setVerificationStatus] = useState({
//     gstNumber: false,
//     regNumber: false,
//     email: false,
//     phoneNumber: false,
//   });
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [currentVerifyingField, setCurrentVerifyingField] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [originalEmail, setOriginalEmail] = useState("");
//   const [originalPhone, setOriginalPhone] = useState("");

//   // Load data from localStorage
//   useEffect(() => {
//     const storedData = localStorage.getItem("companyProfile");
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       setFormData(parsedData);
//       setOriginalEmail(parsedData.email || "");
//       setOriginalPhone(parsedData.phoneNumber || "");
//       if (parsedData.verificationStatus) {
//         setVerificationStatus(parsedData.verificationStatus);
//       }
//     }
//   }, []);

//   // Handlers
//   const handleInputChange = (field: keyof CompanyProfileData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
    
//     // Reset verification status if email or phone is changed
//     if (field === "email" && value !== originalEmail) {
//       setVerificationStatus(prev => ({ ...prev, email: false }));
//     }
//     if (field === "phoneNumber" && value !== originalPhone) {
//       setVerificationStatus(prev => ({ ...prev, phoneNumber: false }));
//     }
    
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: "" }));
//     }
//   };

//   const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     handleInputChange("email", value);
    
//     const emailError = validateEmail(value);
//     if (emailError) {
//       setErrors(prev => ({ ...prev, email: emailError }));
//     } else {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors.email;
//         return newErrors;
//       });
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};
    
//     if (!formData.companyName.trim()) {
//       newErrors.companyName = "Company name is required";
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else {
//       const emailError = validateEmail(formData.email);
//       if (emailError) newErrors.email = emailError;
//     }
    
//     if (!formData.phoneNumber.trim()) {
//       newErrors.phoneNumber = "Phone number is required";
//     } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = "Please enter a valid phone number";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSaveChanges = async () => {
//     setEditMode(false);
//     if (!validateForm()) {
//       toast.error("Please fix all validation errors before saving");
//       return;
//     }

//     setIsSaving(true);
//     const saveToast = toast.loading("Saving changes...");

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 500));

//       // Create the complete data object to save
//       const dataToSave = {
//         ...formData,
//         verificationStatus
//       };

//       // Save to localStorage
//       localStorage.setItem("companyProfile", JSON.stringify(dataToSave));

//       // Update all relevant states in one go
//       setFormData(dataToSave);
//       setOriginalData(dataToSave);
//       setOriginalEmail(formData.email);
//       setOriginalPhone(formData.phoneNumber);
      

//       toast.success("Profile updated successfully!", { id: saveToast });
//     } catch (error) {
//       console.error("Save failed:", error);
//       toast.error("Failed to save changes. Please try again.", { id: saveToast });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const enableEditMode = () => {
//     // Create a deep copy to avoid reference issues
//     setOriginalData(JSON.parse(JSON.stringify(formData)));
//     setEditMode(true);
//   };

//   const handleCancel = () => {
//     if (originalData) {
//       setFormData(originalData);
//       setVerificationStatus({
//         ...verificationStatus,
//         email: originalData.email === formData.email ? verificationStatus.email : false,
//         phoneNumber: originalData.phoneNumber === formData.phoneNumber ? verificationStatus.phoneNumber : false
//       });
//       setErrors({});
//     }
//     setEditMode(false);
//   };

//   const handleStartVerification = (field: keyof typeof verificationStatus) => {
//     if (field === 'email') {
//       if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
//         setErrors({ ...errors, email: 'Please enter a valid email address' });
//         return;
//       }
//       setCurrentVerifyingField(field);
//       setShowOtpModal(true);
//       // In a real app, send OTP to email here
//       toast.info("OTP sent to your email");
//     } else if (field === 'phoneNumber') {
//       if (!formData.phoneNumber || !/^[0-9+\-\s]{10,15}$/.test(formData.phoneNumber)) {
//         setErrors({ ...errors, phoneNumber: 'Please enter a valid phone number' });
//         return;
//       }
//       setCurrentVerifyingField(field);
//       setShowOtpModal(true);
//       // In a real app, send OTP to phone here
//       toast.info("OTP sent to your phone");
//     } else {
//       // For other fields (GST, Reg Number)
//       handleDirectVerification(field);
//     }
//   };

//   const handleDirectVerification = (field: keyof typeof verificationStatus) => {
//     toast.success(`${field.replace(/([A-Z])/g, ' $1')} verified successfully`);
//     setVerificationStatus(prev => ({ ...prev, [field]: true }));
//   };

//   const handleOtpVerification = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (otp.length === 4 && currentVerifyingField) {
//       // Update verification status
//       setVerificationStatus(prev => ({ ...prev, [currentVerifyingField]: true }));
      
//       toast.success(`${currentVerifyingField === 'email' ? 'Email' : 'Phone number'} verified successfully`);
//       setShowOtpModal(false);
//       setOtp('');
//       setCurrentVerifyingField(null);
//     }
//   };

//   const closeOtpModal = () => {
//     setShowOtpModal(false);
//     setOtp('');
//     setCurrentVerifyingField(null);
//   };

//   // Determine if verify button should be shown for email
//   const showEmailVerify = editMode && formData.email && 
//     (!verificationStatus.email || formData.email !== originalEmail);

//   // Determine if verify button should be shown for phone
//   const showPhoneVerify = editMode && formData.phoneNumber && 
//     (!verificationStatus.phoneNumber || formData.phoneNumber !== originalPhone);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800">Company Profile</h2>
//         {!editMode && (
//           <Button onClick={enableEditMode} variant="outline" size="sm">
//             <Edit className="w-4 h-4 mr-2" /> Edit
//           </Button>
//         )}
//       </div>
      
//       <hr className="mb-6" />
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-grey-700 mb-1">
//             Company Name
//           </label>
//           <Input
//             value={formData.companyName}
//             onChange={(e) => handleInputChange("companyName", e.target.value)}
//             className="w-full border-gray-400"
//             disabled={!editMode}
//             placeholder="e.g Steel Plant Ltd."
//           />
//           {errors.companyName && (
//             <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
//           )}
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Industry Type
//           </label>
//           <select 
//             value={formData.industryType}
//             onChange={(e) => handleInputChange("industryType", e.target.value)}
//             disabled={!editMode}
//             className="w-full border-gray-400 h-10 px-3 py-2 rounded-md border border-input bg-background text-base md:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//           >
//             {INDUSTRY_TYPES.map(type => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>
//       </div>
      
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Company Description
//         </label>
//         <Textarea
//           value={formData.companyDescription}
//           onChange={(e) => handleInputChange("companyDescription", e.target.value)}
//           className="w-full min-h-[100px] border-gray-400"
//           placeholder="Sample company description (50-200 words)"
//           disabled={!editMode}
//         />
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             GST Number
//           </label>
//           <div className="relative">
//             <Input
//               value={formData.gstNumber}
//               onChange={(e) => handleInputChange("gstNumber", e.target.value)}
//               className="w-full border-gray-400 pr-20"
//               disabled={!editMode}
//               placeholder="e.g 22ABCDE1234F1Z5"
//             />
//             {editMode && formData.gstNumber && !verificationStatus.gstNumber && (
//               <Button
//                 type="button"
//                 variant="secondary"
//                 size="sm"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
//                 onClick={() => handleStartVerification("gstNumber")}
//               >
//                 Verify
//               </Button>
//             )}
//             {verificationStatus.gstNumber && (
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
//                 <Check className="w-4 h-4 mr-1" />
//                 <span className="text-xs">Verified</span>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Registration Number
//           </label>
//           <div className="relative">
//             <Input
//               value={formData.regNumber}
//               onChange={(e) => handleInputChange("regNumber", e.target.value)}
//               className="w-full border-gray-400 pr-20"
//               disabled={!editMode}
//               placeholder="e.g U27100MH2000PLC123456"
//             />
//             {editMode && formData.regNumber && !verificationStatus.regNumber && (
//               <Button
//                 type="button"
//                 variant="secondary"
//                 size="sm"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
//                 onClick={() => handleStartVerification("regNumber")}
//               >
//                 Verify
//               </Button>
//             )}
//             {verificationStatus.regNumber && (
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
//                 <Check className="w-4 h-4 mr-1" />
//                 <span className="text-xs">Verified</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Mail className="w-4 h-4 inline mr-1" /> Email
//           </label>
//           <div className="relative">
//             <Input
//               type="email"
//               value={formData.email}
//               onChange={handleEmailInputChange}
//               className="w-full border-gray-400 pr-20"
//               disabled={!editMode}
//               placeholder="e.g contact@company.com"
//             />
//             {showEmailVerify && (
//               <Button
//                 type="button"
//                 variant="secondary"
//                 size="sm"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
//                 onClick={() => handleStartVerification("email")}
//               >
//                 Verify
//               </Button>
//             )}
//             {verificationStatus.email && formData.email === originalEmail && (
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
//                 <Check className="w-4 h-4 mr-1" />
//                 <span className="text-xs">Verified</span>
//               </div>
//             )}
//           </div>
//           {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Smartphone className="w-4 h-4 inline mr-1" /> Mobile Contact
//           </label>
//           <div className="relative">
//             <Input
//               value={formData.phoneNumber}
//               onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//               className="w-full border-gray-400 pr-20"
//               disabled={!editMode}
//               placeholder="e.g +91 9876543210"
//             />
//             {showPhoneVerify && (
//               <Button
//                 type="button"
//                 variant="secondary"
//                 size="sm"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
//                 onClick={() => handleStartVerification("phoneNumber")}
//               >
//                 Verify
//               </Button>
//             )}
//             {verificationStatus.phoneNumber && formData.phoneNumber === originalPhone && (
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
//                 <Check className="w-4 h-4 mr-1" />
//                 <span className="text-xs">Verified</span>
//               </div>
//             )}
//           </div>
//           {errors.phoneNumber && (
//             <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Phone className="w-4 h-4 inline mr-1" /> Landline
//           </label>
//           <Input
//             value={formData.landlineNumber}
//             onChange={(e) => handleInputChange("landlineNumber", e.target.value)}
//             className="w-full border-gray-400"
//             disabled={!editMode}
//             placeholder="e.g +91 22 12345678"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Printer className="w-4 h-4 inline mr-1" /> Fax
//           </label>
//           <Input
//             value={formData.faxNumber}
//             onChange={(e) => handleInputChange("faxNumber", e.target.value)}
//             className="w-full border-gray-400"
//             disabled={!editMode}
//             placeholder="e.g +91 22 1234567"
//           />
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Home className="w-4 h-4 inline mr-1" /> Registered Address
//           </label>
//           <Textarea
//             value={formData.registeredAddress}
//             onChange={(e) => handleInputChange("registeredAddress", e.target.value)}
//             className="w-full min-h-[80px] border-gray-400"
//             placeholder="e.g. 123 Registered Office Lane, City, State - 400001"
//             disabled={!editMode}
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Building className="w-4 h-4 inline mr-1" /> Plant Address
//           </label>
//           <Textarea
//             value={formData.plantAddress}
//             onChange={(e) => handleInputChange("plantAddress", e.target.value)}
//             className="w-full min-h-[80px] border-gray-400"
//             placeholder="e.g. Plot 45, Industrial Zone, City, State - 400002"
//             disabled={!editMode}
//           />
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Globe className="w-4 h-4 inline mr-1" /> Website
//           </label>
//           <Input
//             type="url"
//             value={formData.website}
//             onChange={(e) => handleInputChange("website", e.target.value)}
//             className="w-full border-gray-400"
//             disabled={!editMode}
//             placeholder="e.g www.companywebsite.com"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Calendar className="w-4 h-4 inline mr-1" /> Established Year 
//           </label>
//           <Input
//             value={formData.yearEstablished}
//             onChange={(e) => handleInputChange("yearEstablished", e.target.value)}
//             className="w-full border-gray-400"
//             disabled={!editMode}
//             placeholder="e.g 2000"
//           />
//         </div>
//       </div>
      
//       <div className="flex justify-end gap-4">
//         {editMode && (
//           <>
//             <Button onClick={handleSaveChanges} type="button" disabled={isSaving}>
//               <Save className="w-4 h-4 mr-2" /> Save 
//             </Button>
//             <Button onClick={handleCancel} variant="outline">
//               <X className="w-4 h-4 mr-2" /> Cancel
//             </Button>
//           </>
//         )}
//       </div>
      
//       {/* OTP Verification Modal */}
//       {showOtpModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//             <button 
//               onClick={closeOtpModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <X className="w-5 h-5" />
//             </button>
            
//             <h3 className="text-lg font-medium mb-4">
//               Verify your {currentVerifyingField === 'email' ? 'email' : 'phone number'}
//             </h3>
//             <p className="text-sm text-gray-600 mb-4">
//               We've sent a 4-digit OTP to {currentVerifyingField === 'email' ? formData.email : formData.phoneNumber}. 
//               Please enter it below.
//             </p>
            
//             <form onSubmit={handleOtpVerification}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Enter OTP
//                 </label>
//                 <Input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
//                   className="w-full border-gray-400"
//                   placeholder="1234"
//                   maxLength={4}
//                   autoFocus
//                 />
//               </div>
              
//               <Button
//                 type="submit"
//                 className="w-full"
//                 disabled={otp.length !== 4}
//               >
//                 Verify OTP
//               </Button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyProfile;



// import React from "react";
// import { useState, useEffect } from "react";
// import { 
//   Building, 
//   FileText, 
//   Users, 
//   CreditCard, 
//   Bell, 
//   Lock,
//   Edit,
//   Upload,
//   Plus,
//   Trash,
//   Mail,
//   Phone,
//   Printer,
//   Smartphone,
//   Globe,
//   Calendar,
//   Save,
//   X,
//   Home,
//   User,
//   Check
// } from "lucide-react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// type PhoneType = "Mobile" | "Landline" | "Fax";

// const INDUSTRY_TYPES = [
//   "Chemical Industry",
//   "Construction",
//   "Energy - Oil & Gas",
//   "Energy - Renewable",
//   "Food Processing",
//   "Manufacturing - Automotive",
//   "Manufacturing - Electronics",
//   "Manufacturing - Steel Processing",
//   "Pharmaceuticals",
//   "Textile Industry"
// ] as const;

// const PUBLIC_EMAIL_DOMAINS = [
//   "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com"
// ];

// type CompanyProfileData = {
//   companyName: string;
//   industryType: string;
//   companyDescription: string;
//   gstNumber: string;
//   regNumber: string;
//   email: string;
//   landlineNumber: string;
//   faxNumber: string;
//   phoneNumber: string;
//   registeredAddress: string;
//   plantAddress: string;
//   website: string;
//   yearEstablished: string;
// };

// const validateEmail = (email: string): string | null => {
//   if (!email) return "Email is required";
  
//   const domain = email.split("@")[1];
//   if (domain && PUBLIC_EMAIL_DOMAINS.includes(domain.toLowerCase())) {
//     return "Please enter a valid company email address.";
//   }
  
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     return "Please enter a valid email address";
//   }
  
//   return null;
// };

// const getPhoneIcon = (phoneType: PhoneType) => {
//   switch (phoneType) {
//     case "Mobile": return <Smartphone className="w-4 h-4 inline mr-1" />;
//     case "Landline": return <Phone className="w-4 h-4 inline mr-1" />;
//     case "Fax": return <Printer className="w-4 h-4 inline mr-1" />;
//     default: return <Phone className="w-4 h-4 inline mr-1" />;
//   }
// };

// const CompanyProfile = () => {
//   const [formData, setFormData] = useState<CompanyProfileData>({
//     companyName: "",
//     industryType: "Manufacturing - Steel Processing",
//     companyDescription: "",
//     gstNumber: "",
//     regNumber: "",
//     email: "",
//     phoneNumber: "",
//     landlineNumber: "",
//     faxNumber: "",
//     registeredAddress: "",
//     plantAddress: "",
//     website: "",
//     yearEstablished: ""
//   });
  
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [editMode, setEditMode] = useState(false);
//   const [originalData, setOriginalData] = useState<CompanyProfileData | null>(null);
//   const [verificationStatus, setVerificationStatus] = useState({
//     gstNumber: false,
//     regNumber: false,
//     email: false,
//     phoneNumber: false,
//   });
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [currentVerifyingField, setCurrentVerifyingField] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [originalEmail, setOriginalEmail] = useState("");
//   const [originalPhone, setOriginalPhone] = useState("");

//   useEffect(() => {
//     const storedData = localStorage.getItem("companyProfile");
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       setFormData(parsedData);
//       setOriginalEmail(parsedData.email || "");
//       setOriginalPhone(parsedData.phoneNumber || "");
//       if (parsedData.verificationStatus) {
//         setVerificationStatus(parsedData.verificationStatus);
//       }
//     }
//   }, []);

//   const handleInputChange = (field: keyof CompanyProfileData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
    
//     if (field === "email" && value !== originalEmail) {
//       setVerificationStatus(prev => ({ ...prev, email: false }));
//     }
//     if (field === "phoneNumber" && value !== originalPhone) {
//       setVerificationStatus(prev => ({ ...prev, phoneNumber: false }));
//     }
    
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: "" }));
//     }
//   };

//   const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     handleInputChange("email", value);
    
//     const emailError = validateEmail(value);
//     if (emailError) {
//       setErrors(prev => ({ ...prev, email: emailError }));
//     } else {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors.email;
//         return newErrors;
//       });
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};
    
//     if (!formData.companyName.trim()) {
//       newErrors.companyName = "Company name is required";
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else {
//       const emailError = validateEmail(formData.email);
//       if (emailError) newErrors.email = emailError;
//     }
    
//     if (!formData.phoneNumber.trim()) {
//       newErrors.phoneNumber = "Phone number is required";
//     } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = "Please enter a valid phone number";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSaveChanges = async () => {
//     setEditMode(false);
//     if (!validateForm()) {
//       toast.error("Please fix all validation errors before saving");
//       return;
//     }

//     setIsSaving(true);
//     const saveToast = toast.loading("Saving changes...");

//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));

//       const dataToSave = {
//         ...formData,
//         verificationStatus
//       };

//       localStorage.setItem("companyProfile", JSON.stringify(dataToSave));

//       setFormData(dataToSave);
//       setOriginalData(dataToSave);
//       setOriginalEmail(formData.email);
//       setOriginalPhone(formData.phoneNumber);
      

//       toast.success("Profile updated successfully!", { id: saveToast });
//     } catch (error) {
//       console.error("Save failed:", error);
//       toast.error("Failed to save changes. Please try again.", { id: saveToast });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const enableEditMode = () => {
//     setOriginalData(JSON.parse(JSON.stringify(formData)));
//     setEditMode(true);
//   };

//   const handleCancel = () => {
//     if (originalData) {
//       setFormData(originalData);
//       setVerificationStatus({
//         ...verificationStatus,
//         email: originalData.email === formData.email ? verificationStatus.email : false,
//         phoneNumber: originalData.phoneNumber === formData.phoneNumber ? verificationStatus.phoneNumber : false
//       });
//       setErrors({});
//     }
//     setEditMode(false);
//   };

//   const handleStartVerification = (field: keyof typeof verificationStatus) => {
//     if (field === 'email') {
//       if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
//         setErrors({ ...errors, email: 'Please enter a valid email address' });
//         return;
//       }
//       setCurrentVerifyingField(field);
//       setShowOtpModal(true);
//       toast.info("OTP sent to your email");
//     } else if (field === 'phoneNumber') {
//       if (!formData.phoneNumber || !/^[0-9+\-\s]{10,15}$/.test(formData.phoneNumber)) {
//         setErrors({ ...errors, phoneNumber: 'Please enter a valid phone number' });
//         return;
//       }
//       setCurrentVerifyingField(field);
//       setShowOtpModal(true);
//       toast.info("OTP sent to your phone");
//     } else {
//       handleDirectVerification(field);
//     }
//   };

//   const handleDirectVerification = (field: keyof typeof verificationStatus) => {
//     toast.success(`${field.replace(/([A-Z])/g, ' $1')} verified successfully`);
//     setVerificationStatus(prev => ({ ...prev, [field]: true }));
//   };

//   const handleOtpVerification = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (otp.length === 4 && currentVerifyingField) {
//       setVerificationStatus(prev => ({ ...prev, [currentVerifyingField]: true }));
      
//       if (currentVerifyingField === 'email') {
//         setOriginalEmail(formData.email);
//       } else if (currentVerifyingField === 'phoneNumber') {
//         setOriginalPhone(formData.phoneNumber);
//       }
      
//       toast.success(`${currentVerifyingField === 'email' ? 'Email' : 'Phone number'} verified successfully`);
//       setShowOtpModal(false);
//       setOtp('');
//       setCurrentVerifyingField(null);
//     }
//   };

//   const closeOtpModal = () => {
//     setShowOtpModal(false);
//     setOtp('');
//     setCurrentVerifyingField(null);
//   };

//   const showEmailVerify = editMode && formData.email && 
//     (!verificationStatus.email || formData.email !== originalEmail);

//   const showPhoneVerify = editMode && formData.phoneNumber && 
//     (!verificationStatus.phoneNumber || formData.phoneNumber !== originalPhone);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-gray-800">Company Profile</h2>
//         {!editMode && (
//           <Button onClick={enableEditMode} variant="outline" size="sm">
//             <Edit className="w-4 h-4 mr-2" /> Edit
//           </Button>
//         )}
//       </div>
      
//       <hr className="mb-6" />
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-grey-700 mb-1">
//             Company Name
//           </label>
//           <Input
//             value={formData.companyName}
//             onChange={(e) => handleInputChange("companyName", e.target.value)}
//             className="w-full border-gray-400"
//             disabled={!editMode}
//             placeholder="e.g Steel Plant Ltd."
//           />
//           {errors.companyName && (
//             <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
//           )}
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Industry Type
//           </label>
//           <select 
//             value={formData.industryType}
//             onChange={(e) => handleInputChange("industryType", e.target.value)}
//             disabled={!editMode}
//             className="w-full border-gray-400 h-10 px-3 py-2 rounded-md border border-input bg-background text-base md:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//           >
//             {INDUSTRY_TYPES.map(type => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//         </div>
//       </div>
      
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Company Description
//         </label>
//         <Textarea
//           value={formData.companyDescription}
//           onChange={(e) => handleInputChange("companyDescription", e.target.value)}
//           className="w-full min-h-[100px] border-gray-400"
//           placeholder="Sample company description (50-200 words)"
//           disabled={!editMode}
//         />
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             GST Number
//           </label>
//           <div className="relative">
//             <Input
//               value={formData.gstNumber}
//               onChange={(e) => handleInputChange("gstNumber", e.target.value)}
//               className="w-full border-gray-400 pr-20"
//               disabled={!editMode}
//               placeholder="e.g 22ABCDE1234F1Z5"
//             />
//             {editMode && formData.gstNumber && !verificationStatus.gstNumber && (
//               <Button
//                 type="button"
//                 variant="secondary"
//                 size="sm"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
//                 onClick={() => handleStartVerification("gstNumber")}
//               >
//                 Verify
//               </Button>
//             )}
//             {verificationStatus.gstNumber && (
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
//                 <Check className="w-4 h-4 mr-1" />
//                 <span className="text-xs">Verified</span>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Registration Number
//           </label>
//           <div className="relative">
//             <Input
//               value={formData.regNumber}
//               onChange={(e) => handleInputChange("regNumber", e.target.value)}
//               className="w-full border-gray-400 pr-20"
//               disabled={!editMode}
//               placeholder="e.g U27100MH2000PLC123456"
//             />
//             {editMode && formData.regNumber && !verificationStatus.regNumber && (
//               <Button
//                 type="button"
//                 variant="secondary"
//                 size="sm"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
//                 onClick={() => handleStartVerification("regNumber")}
//               >
//                 Verify
//               </Button>
//             )}
//             {verificationStatus.regNumber && (
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
//                 <Check className="w-4 h-4 mr-1" />
//                 <span className="text-xs">Verified</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Mail className="w-4 h-4 inline mr-1" /> Email
//           </label>
//           <div className="relative">
//             <Input
//               type="email"
//               value={formData.email}
//               onChange={handleEmailInputChange}
//               className="w-full border-gray-400 pr-20"
//               disabled={!editMode}
//               placeholder="e.g contact@company.com"
//             />
//             {showEmailVerify ? (
//               <Button
//                 type="button"
//                 variant="secondary"
//                 size="sm"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
//                 onClick={() => handleStartVerification("email")}
//               >
//                 Verify
//               </Button>
//             ) : verificationStatus.email && formData.email === originalEmail ? (
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
//                 <Check className="w-4 h-4 mr-1" />
//                 <span className="text-xs">Verified</span>
//               </div>
//             ) : null}
//           </div>
//           {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Smartphone className="w-4 h-4 inline mr-1" /> Mobile Contact
//           </label>
//           <div className="relative">
//             <Input
//               value={formData.phoneNumber}
//               onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
//               className="w-full border-gray-400 pr-20"
//               disabled={!editMode}
//               placeholder="e.g +91 9876543210"
//             />
//             {showPhoneVerify ? (
//               <Button
//                 type="button"
//                 variant="secondary"
//                 size="sm"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
//                 onClick={() => handleStartVerification("phoneNumber")}
//               >
//                 Verify
//               </Button>
//             ) : verificationStatus.phoneNumber && formData.phoneNumber === originalPhone ? (
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
//                 <Check className="w-4 h-4 mr-1" />
//                 <span className="text-xs">Verified</span>
//               </div>
//             ) : null}
//           </div>
//           {errors.phoneNumber && (
//             <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Phone className="w-4 h-4 inline mr-1" /> Landline
//           </label>
//           <Input
//             value={formData.landlineNumber}
//             onChange={(e) => handleInputChange("landlineNumber", e.target.value)}
//             className="w-full border-gray-400"
//             disabled={!editMode}
//             placeholder="e.g +91 22 12345678"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Printer className="w-4 h-4 inline mr-1" /> Fax
//           </label>
//           <Input
//             value={formData.faxNumber}
//             onChange={(e) => handleInputChange("faxNumber", e.target.value)}
//             className="w-full border-gray-400"
//             disabled={!editMode}
//             placeholder="e.g +91 22 1234567"
//           />
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Home className="w-4 h-4 inline mr-1" /> Registered Address
//           </label>
//           <Textarea
//             value={formData.registeredAddress}
//             onChange={(e) => handleInputChange("registeredAddress", e.target.value)}
//             className="w-full min-h-[80px] border-gray-400"
//             placeholder="e.g. 123 Registered Office Lane, City, State - 400001"
//             disabled={!editMode}
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Building className="w-4 h-4 inline mr-1" /> Plant Address
//           </label>
//           <Textarea
//             value={formData.plantAddress}
//             onChange={(e) => handleInputChange("plantAddress", e.target.value)}
//             className="w-full min-h-[80px] border-gray-400"
//             placeholder="e.g. Plot 45, Industrial Zone, City, State - 400002"
//             disabled={!editMode}
//           />
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Globe className="w-4 h-4 inline mr-1" /> Website
//           </label>
//           <Input
//             type="url"
//             value={formData.website}
//             onChange={(e) => handleInputChange("website", e.target.value)}
//             className="w-full border-gray-400"
//             disabled={!editMode}
//             placeholder="e.g www.companywebsite.com"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <Calendar className="w-4 h-4 inline mr-1" /> Established Year 
//           </label>
//           <Input
//             value={formData.yearEstablished}
//             onChange={(e) => handleInputChange("yearEstablished", e.target.value)}
//             className="w-full border-gray-400"
//             disabled={!editMode}
//             placeholder="e.g 2000"
//           />
//         </div>
//       </div>
      
//       <div className="flex justify-end gap-4">
//         {editMode && (
//           <>
//             <Button onClick={handleSaveChanges} type="button" disabled={isSaving}>
//               <Save className="w-4 h-4 mr-2" /> Save 
//             </Button>
//             <Button onClick={handleCancel} variant="outline">
//               <X className="w-4 h-4 mr-2" /> Cancel
//             </Button>
//           </>
//         )}
//       </div>
      
//       {showOtpModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
//             <button 
//               onClick={closeOtpModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <X className="w-5 h-5" />
//             </button>
            
//             <h3 className="text-lg font-medium mb-4">
//               Verify your {currentVerifyingField === 'email' ? 'email' : 'phone number'}
//             </h3>
//             <p className="text-sm text-gray-600 mb-4">
//               We've sent a 4-digit OTP to {currentVerifyingField === 'email' ? formData.email : formData.phoneNumber}. 
//               Please enter it below.
//             </p>
            
//             <form onSubmit={handleOtpVerification}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Enter OTP
//                 </label>
//                 <Input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
//                   className="w-full border-gray-400"
//                   placeholder="1234"
//                   maxLength={4}
//                   autoFocus
//                 />
//               </div>
              
//               <Button
//                 type="submit"
//                 className="w-full"
//                 disabled={otp.length !== 4}
//               >
//                 Verify OTP
//               </Button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyProfile;



import React from "react";
import { useState, useEffect } from "react";
import { 
  Building, 
  FileText, 
  Users, 
  CreditCard, 
  Bell, 
  Lock,
  Edit,
  Upload,
  Plus,
  Trash,
  Mail,
  Phone,
  Printer,
  Smartphone,
  Globe,
  Calendar,
  Save,
  X,
  Home,
  User,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type PhoneType = "Mobile" | "Landline" | "Fax";

const INDUSTRY_TYPES = [
  "Chemical Industry",
  "Construction",
  "Energy - Oil & Gas",
  "Energy - Renewable",
  "Food Processing",
  "Manufacturing - Automotive",
  "Manufacturing - Electronics",
  "Manufacturing - Steel Processing",
  "Pharmaceuticals",
  "Textile Industry"
] as const;

const PUBLIC_EMAIL_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com"
];

type CompanyProfileData = {
  companyName: string;
  industryType: string;
  companyDescription: string;
  gstNumber: string;
  regNumber: string;
  email: string;
  landlineNumber: string;
  faxNumber: string;
  phoneNumber: string;
  registeredAddress: string;
  plantAddress: string;
  website: string;
  yearEstablished: string;
};

const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  
  const domain = email.split("@")[1];
  if (domain && PUBLIC_EMAIL_DOMAINS.includes(domain.toLowerCase())) {
    return "Please enter a valid company email address.";
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address";
  }
  
  return null;
};

const CompanyProfile = () => {
  const [formData, setFormData] = useState<CompanyProfileData>({
    companyName: "",
    industryType: "Manufacturing - Steel Processing",
    companyDescription: "",
    gstNumber: "",
    regNumber: "",
    email: "",
    phoneNumber: "",
    landlineNumber: "",
    faxNumber: "",
    registeredAddress: "",
    plantAddress: "",
    website: "",
    yearEstablished: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editMode, setEditMode] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({
    gstNumber: false,
    regNumber: false,
    email: false,
    phoneNumber: false,
  });
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [currentVerifyingField, setCurrentVerifyingField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("companyProfile");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
      if (parsedData.verificationStatus) {
        setVerificationStatus(parsedData.verificationStatus);
      }
    }
  }, []);

  const handleInputChange = (field: keyof CompanyProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset verification status when field changes
    if (field === "email" || field === "phoneNumber" || 
        field === "gstNumber" || field === "regNumber") {
      setVerificationStatus(prev => ({ ...prev, [field]: false }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleInputChange("email", value);
    
    const emailError = validateEmail(value);
    if (emailError) {
      setErrors(prev => ({ ...prev, email: emailError }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    setEditMode(false);
    if (!validateForm()) {
      toast.error("Please fix all validation errors before saving");
      return;
    }

    setIsSaving(true);
    const saveToast = toast.loading("Saving changes...");

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Reset all verification statuses when saving
      const dataToSave = {
        ...formData,
        verificationStatus: {
          gstNumber: false,
          regNumber: false,
          email: false,
          phoneNumber: false
        }
      };

      localStorage.setItem("companyProfile", JSON.stringify(dataToSave));

      setFormData(dataToSave);
      setVerificationStatus({
        gstNumber: false,
        regNumber: false,
        email: false,
        phoneNumber: false
      });
      

      toast.success("Profile updated successfully!", { id: saveToast });
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save changes. Please try again.", { id: saveToast });
    } finally {
      setIsSaving(false);
    }
  };

  const enableEditMode = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    const storedData = localStorage.getItem("companyProfile");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
      if (parsedData.verificationStatus) {
        setVerificationStatus(parsedData.verificationStatus);
      }
    }
    setEditMode(false);
  };

  const handleStartVerification = (field: keyof typeof verificationStatus) => {
    if (field === 'email') {
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        setErrors({ ...errors, email: 'Please enter a valid email address' });
        return;
      }
      setCurrentVerifyingField(field);
      setShowOtpModal(true);
      toast.info("OTP sent to your email");
    } else if (field === 'phoneNumber') {
      if (!formData.phoneNumber || !/^[0-9+\-\s]{10,15}$/.test(formData.phoneNumber)) {
        setErrors({ ...errors, phoneNumber: 'Please enter a valid phone number' });
        return;
      }
      setCurrentVerifyingField(field);
      setShowOtpModal(true);
      toast.info("OTP sent to your phone");
    } else {
      handleDirectVerification(field);
    }
  };

  const handleDirectVerification = (field: keyof typeof verificationStatus) => {
    toast.success(`${field.replace(/([A-Z])/g, ' $1')} verified successfully`);
    setVerificationStatus(prev => ({ ...prev, [field]: true }));
  };

  const handleOtpVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4 && currentVerifyingField) {
      setVerificationStatus(prev => ({ ...prev, [currentVerifyingField]: true }));
      toast.success(`${currentVerifyingField === 'email' ? 'Email' : 'Phone number'} verified successfully`);
      setShowOtpModal(false);
      setOtp('');
      setCurrentVerifyingField(null);
    }
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
    setOtp('');
    setCurrentVerifyingField(null);
  };

  const showVerifyButton = (field: keyof typeof verificationStatus) => {
    return editMode && formData[field] && !verificationStatus[field];
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Company Profile</h2>
        {!editMode && (
          <Button onClick={enableEditMode} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
        )}
      </div>
      
      <hr className="mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-1">
            Company Name
          </label>
          <Input
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            className="w-full border-gray-400"
            disabled={!editMode}
            placeholder="e.g Steel Plant Ltd."
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry Type
          </label>
          <select 
            value={formData.industryType}
            onChange={(e) => handleInputChange("industryType", e.target.value)}
            disabled={!editMode}
            className="w-full border-gray-400 h-10 px-3 py-2 rounded-md border border-input bg-background text-base md:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {INDUSTRY_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Description
        </label>
        <Textarea
          value={formData.companyDescription}
          onChange={(e) => handleInputChange("companyDescription", e.target.value)}
          className="w-full min-h-[100px] border-gray-400"
          placeholder="Sample company description (50-200 words)"
          disabled={!editMode}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GST Number
          </label>
          <div className="relative">
            <Input
              value={formData.gstNumber}
              onChange={(e) => handleInputChange("gstNumber", e.target.value)}
              className="w-full border-gray-400 pr-20"
              disabled={!editMode}
              placeholder="e.g 22ABCDE1234F1Z5"
            />
            {showVerifyButton("gstNumber") && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
                onClick={() => handleStartVerification("gstNumber")}
              >
                Verify
              </Button>
            )}
            {verificationStatus.gstNumber && editMode && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
                <Check className="w-4 h-4 mr-1" />
                <span className="text-xs">Verified</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registration Number
          </label>
          <div className="relative">
            <Input
              value={formData.regNumber}
              onChange={(e) => handleInputChange("regNumber", e.target.value)}
              className="w-full border-gray-400 pr-20"
              disabled={!editMode}
              placeholder="e.g U27100MH2000PLC123456"
            />
            {showVerifyButton("regNumber") && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
                onClick={() => handleStartVerification("regNumber")}
              >
                Verify
              </Button>
            )}
            {verificationStatus.regNumber && editMode && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
                <Check className="w-4 h-4 mr-1" />
                <span className="text-xs">Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Mail className="w-4 h-4 inline mr-1" /> Email
          </label>
          <div className="relative">
            <Input
              type="email"
              value={formData.email}
              onChange={handleEmailInputChange}
              className="w-full border-gray-400 pr-20"
              disabled={!editMode}
              placeholder="e.g contact@company.com"
            />
            {showVerifyButton("email") && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
                onClick={() => handleStartVerification("email")}
              >
                Verify
              </Button>
            )}
            {verificationStatus.email && editMode && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
                <Check className="w-4 h-4 mr-1" />
                <span className="text-xs">Verified</span>
              </div>
            )}
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Smartphone className="w-4 h-4 inline mr-1" /> Mobile Contact
          </label>
          <div className="relative">
            <Input
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-full border-gray-400 pr-20"
              disabled={!editMode}
              placeholder="e.g +91 9876543210"
            />
            {showVerifyButton("phoneNumber") && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
                onClick={() => handleStartVerification("phoneNumber")}
              >
                Verify
              </Button>
            )}
            {verificationStatus.phoneNumber && editMode && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600">
                <Check className="w-4 h-4 mr-1" />
                <span className="text-xs">Verified</span>
              </div>
            )}
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Phone className="w-4 h-4 inline mr-1" /> Landline
          </label>
          <Input
            value={formData.landlineNumber}
            onChange={(e) => handleInputChange("landlineNumber", e.target.value)}
            className="w-full border-gray-400"
            disabled={!editMode}
            placeholder="e.g +91 22 12345678"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Printer className="w-4 h-4 inline mr-1" /> Fax
          </label>
          <Input
            value={formData.faxNumber}
            onChange={(e) => handleInputChange("faxNumber", e.target.value)}
            className="w-full border-gray-400"
            disabled={!editMode}
            placeholder="e.g +91 22 1234567"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Home className="w-4 h-4 inline mr-1" /> Registered Address
          </label>
          <Textarea
            value={formData.registeredAddress}
            onChange={(e) => handleInputChange("registeredAddress", e.target.value)}
            className="w-full min-h-[80px] border-gray-400"
            placeholder="e.g. 123 Registered Office Lane, City, State - 400001"
            disabled={!editMode}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Building className="w-4 h-4 inline mr-1" /> Plant Address
          </label>
          <Textarea
            value={formData.plantAddress}
            onChange={(e) => handleInputChange("plantAddress", e.target.value)}
            className="w-full min-h-[80px] border-gray-400"
            placeholder="e.g. Plot 45, Industrial Zone, City, State - 400002"
            disabled={!editMode}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Globe className="w-4 h-4 inline mr-1" /> Website
          </label>
          <Input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className="w-full border-gray-400"
            disabled={!editMode}
            placeholder="e.g www.companywebsite.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-4 h-4 inline mr-1" /> Established Year 
          </label>
          <Input
            value={formData.yearEstablished}
            onChange={(e) => handleInputChange("yearEstablished", e.target.value)}
            className="w-full border-gray-400"
            disabled={!editMode}
            placeholder="e.g 2000"
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
        {editMode && (
          <>
            <Button onClick={handleSaveChanges} type="button" disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" /> Save 
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
          </>
        )}
      </div>
      
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button 
              onClick={closeOtpModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-lg font-medium mb-4">
              Verify your {currentVerifyingField === 'email' ? 'email' : 'phone number'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              We've sent a 4-digit OTP to {currentVerifyingField === 'email' ? formData.email : formData.phoneNumber}. 
              Please enter it below.
            </p>
            
            <form onSubmit={handleOtpVerification}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full border-gray-400"
                  placeholder="1234"
                  maxLength={4}
                  autoFocus
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={otp.length !== 4}
              >
                Verify OTP
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;