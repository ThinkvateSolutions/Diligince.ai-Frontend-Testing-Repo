import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Building, Mail, Phone, Calendar, MapPin, CheckCircle2, XCircle, Loader2, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";

// Regex for GST (India)
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// Robust phone number validation
const phoneCharRegex = /^\+?[\d\s-()]*$/; // Allows digits, space, -, (, ), +
const phoneValidation = z.string().optional().or(z.literal("")).refine(
    (value) => {
      if (!value) return true; // Optional field is valid if empty
      if (!phoneCharRegex.test(value)) return false; // Must match allowed characters
      const digits = value.replace(/\D/g, ''); // Extract only digits
      return digits.length >= 7 && digits.length <= 15; // Must have a plausible number of digits
    },
    { message: "Please enter a valid number with 7 to 15 digits." }
  );

// OTP Input Component
interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length: number;
  disabled?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, length, disabled }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const entry = e.target.value;
    if (/^\d$/.test(entry) || entry === "") {
      const newOtp = value.split('');
      newOtp[index] = entry;
      onChange(newOtp.join('').slice(0, length));
      if (entry && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().slice(0, length);
    if (/^\d+$/.test(pastedData)) {
      onChange(pastedData);
      const nextFocusIndex = Math.min(pastedData.length, length - 1);
      setTimeout(() => inputRefs.current[nextFocusIndex]?.focus(), 0);
    }
  };
  
  return (
    <div className="flex items-center space-x-2" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="tel" inputMode="numeric" maxLength={1} value={value[index] || ""}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg font-semibold"
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

const companySchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  industryFocus: z.array(z.string()).min(1, { message: "At least one industry focus is required" }),
  companyDescription: z.string().min(10, { message: "Company description must be at least 10 characters" }).max(500, { message: "Company description cannot exceed 500 characters" }),
  gstNumber: z.string().optional().or(z.literal("")).refine((val) => val === "" || !val || gstRegex.test(val), { message: "Invalid GST number format" }),
  registrationNumber: z.string().min(1, { message: "Registration number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  telephone: phoneValidation,
  mobile: phoneValidation,
  fax: phoneValidation,
  address1: z.string().min(1, { message: "Address line 1 is required" }),
  address2: z.string().optional(),
  warehouseLocations: z.array(z.string()),
  yearEstablished: z.string().min(4, { message: "Please enter a valid year" }),
  productCategories: z.array(z.string()).min(1, { message: "At least one product category is required" }),
}).refine(data => data.telephone || data.mobile || data.fax, { message: "At least one phone number (Telephone, Mobile, or Fax) is required.", path: ["telephone"] });

type FormValues = z.infer<typeof companySchema>;

const industryOptions = [ { label: "Sugar Mill", value: "sugar_mill" }, { label: "Cement Plant", value: "cement_plant" }, { label: "Steel Plant", value: "steel_plant" }, { label: "Pharmaceutical", value: "pharmaceutical" }, { label: "Food Processing", value: "food_processing" }, { label: "Automotive", value: "automotive" }, { label: "Chemical", value: "chemical" }, { label: "Textile", value: "textile" }, { label: "Refinery", value: "refinery" }, { label: "Power Plant", value: "power_plant" }, { label: "Paper Mill", value: "paper_mill" }, { label: "Mining", value: "mining" }, ];
const productCategoryOptions = [ { label: "Electrical Components", value: "electrical" }, { label: "Mechanical Parts", value: "mechanical" }, { label: "Pneumatic Systems", value: "pneumatic" }, { label: "Hydraulic Components", value: "hydraulic" }, { label: "Safety Equipment", value: "safety" }, { label: "Instrumentation", value: "instrumentation" }, { label: "Process Control", value: "process_control" }, { label: "Pumps & Valves", value: "pumps_valves" }, { label: "Motors & Drives", value: "motors_drives" }, { label: "Maintenance Tools", value: "maintenance_tools" }, { label: "Laboratory Equipment", value: "laboratory" }, { label: "Raw Materials", value: "raw_materials" }, ];
const phoneTypes = [ { id: "telephone", label: "Telephone" }, { id: "mobile", label: "Mobile" }, { id: "fax", label: "Fax" }, ];

const defaultValues: FormValues = {
  companyName: "Innovatech Solutions", industryFocus: ["pharmaceutical", "food_processing"], companyDescription: "A leading provider of industrial automation and control systems, specializing in the pharmaceutical and food processing sectors.", gstNumber: "29AAAAA0000A1Z5", registrationNumber: "U74999DL2010PTC201234", email: "contact@innovatech.com", telephone: "01145678901", mobile: "9876543210", fax: "", address1: "Plot 123, Sector 44", address2: "Gurugram, Haryana", warehouseLocations: ["Mumbai", "Chennai"], yearEstablished: "2010", productCategories: ["process_control", "instrumentation"],
};


const CompanyInfoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [isVerifyingGst, setIsVerifyingGst] = useState(false);
  const [gstVerificationStatus, setGstVerificationStatus] = useState<'idle' | 'success' | 'not_found' | 'error'>('idle');
  const [verifiedGstData, setVerifiedGstData] = useState<{ legalName: string } | null>(null);

  const [isVerifyingRegNo, setIsVerifyingRegNo] = useState(false);
  const [regNoVerificationStatus, setRegNoVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [emailVerified, setEmailVerified] = useState(true);
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);
  const [showEmailOtpInput, setShowEmailOtpInput] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailTimer, setEmailTimer] = useState(0);

  const [mobileVerified, setMobileVerified] = useState(true);
  const [isSendingMobileOtp, setIsSendingMobileOtp] = useState(false);
  const [isVerifyingMobileOtp, setIsVerifyingMobileOtp] = useState(false);
  const [showMobileOtpInput, setShowMobileOtpInput] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [mobileTimer, setMobileTimer] = useState(0);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(companySchema),
    defaultValues,
  });

  useEffect(() => {
    if (emailTimer <= 0) return;
    const interval = setInterval(() => setEmailTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [emailTimer]);

  useEffect(() => {
    if (mobileTimer <= 0) return;
    const interval = setInterval(() => setMobileTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [mobileTimer]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (!isEditing) return;

      if (name === 'gstNumber') {
        setGstVerificationStatus('idle');
        setVerifiedGstData(null);
      }
      if (name === 'registrationNumber') {
        setRegNoVerificationStatus('idle');
      }
      if (name === 'email') {
        setEmailVerified(false);
        setShowEmailOtpInput(false);
        setEmailOtp("");
        setEmailTimer(0);
      }
      if (name === 'mobile') {
        setMobileVerified(false);
        setShowMobileOtpInput(false);
        setMobileOtp("");
        setMobileTimer(0);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, isEditing]);

  const handleVerifyGst = async () => {
    const isFormatValid = await form.trigger("gstNumber");
    if (!isFormatValid) {
        toast.error("Please enter a valid GSTIN format before verifying.");
        return;
    }
    const gstValue = form.getValues("gstNumber");
    if (!gstValue) return;

    setIsVerifyingGst(true);
    setGstVerificationStatus('idle');
    setVerifiedGstData(null);

    setTimeout(() => {
        if (gstValue.endsWith('Z5')) {
            setGstVerificationStatus('success');
            setVerifiedGstData({ legalName: 'DUMMY INNOVATECH SOLUTIONS' });
            toast.success("GSTIN verified successfully!");
        } else if (gstValue.endsWith('Z4')) {
            setGstVerificationStatus('not_found');
            toast.warning("GSTIN not found in the official registry.");
        } else { 
            setGstVerificationStatus('error');
            toast.error("An error occurred during verification.");
        }
        setIsVerifyingGst(false);
    }, 1500);
  };

  const handleVerifyRegNo = async () => {
    const isFormatValid = await form.trigger("registrationNumber");
    if (!isFormatValid) return;
    
    const regNoValue = form.getValues("registrationNumber");
    if (!regNoValue) return;

    setIsVerifyingRegNo(true);
    setRegNoVerificationStatus('idle');
    setTimeout(() => {
      // Mock logic: for this example, let's say any non-empty valid string succeeds
      if (regNoValue.toUpperCase().includes('FAIL')) {
        setRegNoVerificationStatus('error');
        toast.error("Registration Number could not be verified.");
      } else {
        setRegNoVerificationStatus('success');
        toast.success("Registration Number verified successfully!");
      }
      setIsVerifyingRegNo(false);
    }, 1500);
  };
  
  const handleSendOtp = async (type: 'email' | 'mobile') => {
    const fieldIsValid = await form.trigger(type);
    if (!fieldIsValid) return;

    if (type === 'email') {
      setIsSendingEmailOtp(true);
      setTimeout(() => {
        setIsSendingEmailOtp(false);
        setShowEmailOtpInput(true);
        setEmailTimer(30);
        toast.success(`OTP sent to ${form.getValues("email")}`);
      }, 1000);
    } else {
      setIsSendingMobileOtp(true);
      setTimeout(() => {
        setIsSendingMobileOtp(false);
        setShowMobileOtpInput(true);
        setMobileTimer(30);
        toast.success(`OTP sent to ${form.getValues("mobile")}`);
      }, 1000);
    }
  };

  const handleVerifyOtp = async (type: 'email' | 'mobile') => {
    const otpValue = type === 'email' ? emailOtp : mobileOtp;
    if (otpValue !== '1234') { 
        toast.error("Invalid OTP. Please try again.");
        return;
    }
    if (type === 'email') {
      setIsVerifyingEmailOtp(true);
      setTimeout(() => {
          setEmailVerified(true);
          setShowEmailOtpInput(false);
          toast.success("Email verified successfully!");
          setIsVerifyingEmailOtp(false);
      }, 1000);
    } else {
      setIsVerifyingMobileOtp(true);
      setTimeout(() => {
          setMobileVerified(true);
          setShowMobileOtpInput(false);
          toast.success("Mobile number verified successfully!");
          setIsVerifyingMobileOtp(false);
      }, 1000);
    }
  };

  const onSubmit = (values: FormValues) => {
    if (isEditing && (!emailVerified || (form.getValues("mobile") && !mobileVerified))) {
      toast.error("Please verify your email and mobile number before saving.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form values:", values);
      setIsSubmitting(false);
      setIsEditing(false);
      toast.success("Company information updated successfully!");
      form.reset(values);
    }, 1000);
  };
  
  const handleCancel = () => {
    form.reset(defaultValues);
    setIsEditing(false);
    setGstVerificationStatus('idle');
    setVerifiedGstData(null);
    setRegNoVerificationStatus('idle');
    setEmailVerified(true);
    setShowEmailOtpInput(false);
    setEmailOtp("");
    setEmailTimer(0);
    setMobileVerified(true);
    setShowMobileOtpInput(false);
    setMobileOtp("");
    setMobileTimer(0);
  };
  
  const onFormError = (errors: any) => {
    console.error("Form validation errors:", errors);
    toast.error("Please correct the highlighted errors before saving.");
  };

  const [newWarehouseLocation, setNewWarehouseLocation] = useState("");
  const addWarehouseLocation = () => {
    if (newWarehouseLocation.trim() === "") return;
    const currentLocations = form.getValues("warehouseLocations") || [];
    form.setValue("warehouseLocations", [...currentLocations, newWarehouseLocation.trim()]);
    setNewWarehouseLocation("");
  };
  const removeWarehouseLocation = (index: number) => {
    const currentLocations = form.getValues("warehouseLocations") || [];
    form.setValue("warehouseLocations", currentLocations.filter((_, i) => i !== index));
  };
  
  const [selectedPhoneTypes, setSelectedPhoneTypes] = useState<string[]>([]);
  useEffect(() => {
    const initialData = form.getValues();
    const activePhoneTypes = [];
    if (initialData.telephone) activePhoneTypes.push("telephone");
    if (initialData.mobile) activePhoneTypes.push("mobile");
    if (initialData.fax) activePhoneTypes.push("fax");
    setSelectedPhoneTypes(activePhoneTypes.length > 0 ? activePhoneTypes : ["telephone"]);
  }, []);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">Company Information</CardTitle>
            <CardDescription>{isEditing ? "Update your company details." : "View your company details."}</CardDescription>
          </div>
          {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit</Button>}
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="companyName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                            <Input placeholder="Enter company name" className="pl-10" {...field} disabled={!isEditing} />
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
              )} />
              <FormField control={form.control} name="yearEstablished" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Established</FormLabel>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                            <Input placeholder="e.g., 2010" className="pl-10" {...field} disabled={!isEditing} />
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="industryFocus" render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Focus</FormLabel>
                   <FormControl>
                    {isEditing ? (
                      <MultiSelect options={industryOptions} selected={field.value} onChange={field.onChange} placeholder="Select industries you serve" />
                    ) : (
                      <div className="flex flex-wrap gap-2 min-h-[40px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm">
                        {field.value.length > 0 ? (
                          field.value.map((val) => {
                            const option = industryOptions.find((opt) => opt.value === val);
                            return ( <div key={val} className="flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm"> {option ? option.label : val} </div> );
                          })
                        ) : ( <span className="text-muted-foreground">No industries selected</span> )}
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )} />

            <FormField control={form.control} name="companyDescription" render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your company, specialization, and value proposition" className="min-h-32" {...field} maxLength={500} disabled={!isEditing} />
                  </FormControl>
                  <FormDescription className="text-right">{field.value?.length || 0} / 500</FormDescription>
                  <FormMessage />
                </FormItem>
            )} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="gstNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST Number (Optional)</FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input placeholder="Enter GST number" {...field} value={field.value ?? ""} disabled={!isEditing} />
                      </FormControl>
                      {isEditing && (
                        <Button type="button"  onClick={handleVerifyGst} disabled={isVerifyingGst || !field.value} >
                            {isVerifyingGst ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                        </Button>
                      )}
                    </div>
                    
                    <div className="mt-2 text-sm min-h-[20px]">
                      {gstVerificationStatus === 'success' && verifiedGstData && ( <div className="flex items-center text-green-600"> <CheckCircle2 className="h-4 w-4 mr-2" /> <span>Verified: <strong>{verifiedGstData.legalName}</strong></span> </div> )}
                      {gstVerificationStatus === 'not_found' && ( <div className="flex items-center text-yellow-600"> <AlertTriangle className="h-4 w-4 mr-2" /> <span>This GSTIN could not be found.</span> </div> )}
                      {gstVerificationStatus === 'error' && ( <div className="flex items-center text-red-600"> <XCircle className="h-4 w-4 mr-2" /> <span>Verification failed. Please try again later.</span> </div> )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input placeholder="Enter registration number" {...field} disabled={!isEditing} />
                      </FormControl>
                      {isEditing && (
                        <Button type="button"  onClick={handleVerifyRegNo} disabled={isVerifyingRegNo || !field.value} >
                            {isVerifyingRegNo ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                        </Button>
                      )}
                    </div>
                    <div className="mt-2 text-sm min-h-[20px]">
                      {regNoVerificationStatus === 'success' && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          <span>Verified successfully.</span>
                        </div>
                      )}
                      {regNoVerificationStatus === 'error' && (
                        <div className="flex items-center text-red-600">
                          <XCircle className="h-4 w-4 mr-2" />
                          <span>Verification failed. Please try again.</span>
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">Business Email {emailVerified && <CheckCircle2 className="h-4 w-4 ml-2 text-green-600" />}</FormLabel>
                   <div className="flex items-center space-x-2">
                     <div className="relative flex-grow">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="Enter business email" className="pl-10" {...field} disabled={!isEditing || showEmailOtpInput} />
                        </FormControl>
                      </div>
                      {isEditing && !emailVerified && <Button type="button" variant="secondary" onClick={() => handleSendOtp('email')} disabled={isSendingEmailOtp || emailTimer > 0 || !!form.getFieldState('email').error}>
                          {isSendingEmailOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : 
                          emailTimer > 0 ? `Resend in ${emailTimer}s` :
                          showEmailOtpInput ? 'Resend OTP' : 'Send OTP'}
                      </Button>}
                   </div>
                  <FormMessage />
                  {showEmailOtpInput && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md border space-y-2">
                      <FormLabel>Enter 4-Digit OTP for Email</FormLabel>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                        <OtpInput value={emailOtp} onChange={setEmailOtp} length={4} disabled={isVerifyingEmailOtp} />
                        <Button type="button" onClick={() => handleVerifyOtp('email')} disabled={isVerifyingEmailOtp || emailOtp.length !== 4}>
                          {isVerifyingEmailOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                        </Button>
                      </div>
                    </div>
                  )}
                </FormItem>
            )} />

            <div className="space-y-4 rounded-md border p-4">
               <FormLabel className="text-base">Business Phone Numbers</FormLabel>
               <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                 {phoneTypes.map((item) => ( <div key={item.id} className="flex items-center space-x-2"> <Checkbox id={item.id} checked={selectedPhoneTypes.includes(item.id)} onCheckedChange={(checked) => setSelectedPhoneTypes((prev) => checked ? [...prev, item.id] : prev.filter((v) => v !== item.id))} disabled={!isEditing}/> <label htmlFor={item.id} className="text-sm font-medium">{item.label}</label> </div> ))}
               </div>
               <div className="space-y-6 pt-2">
                 {selectedPhoneTypes.includes("telephone") && ( <FormField control={form.control} name="telephone" render={({ field }) => ( <FormItem> <FormLabel>Landline</FormLabel> <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="Enter telephone number" className="pl-10" {...field} value={field.value ?? ""} disabled={!isEditing} /></FormControl></div> <FormMessage /> </FormItem> )} /> )}
                 {selectedPhoneTypes.includes("mobile") && ( <FormField control={form.control} name="mobile" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center">Mobile {mobileVerified && <CheckCircle2 className="h-4 w-4 ml-2 text-green-600" />}</FormLabel> <div className="flex items-center space-x-2"><div className="relative flex-grow"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="Enter mobile number" className="pl-10" {...field} value={field.value ?? ""} disabled={!isEditing || showMobileOtpInput} /></FormControl></div>{isEditing && !mobileVerified && (<Button type="button" variant="secondary" onClick={() => handleSendOtp('mobile')} disabled={isSendingMobileOtp || mobileTimer > 0 || !field.value || !!form.getFieldState('mobile').error}>{isSendingMobileOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : mobileTimer > 0 ? `Resend in ${mobileTimer}s` : showMobileOtpInput ? 'Resend OTP' : 'Send OTP'}</Button>)}</div> <FormMessage /> {showMobileOtpInput && (<div className="mt-2 p-3 bg-gray-50 rounded-md border space-y-2"><FormLabel>Enter 4-Digit OTP for Mobile</FormLabel><div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0"><OtpInput value={mobileOtp} onChange={setMobileOtp} length={4} disabled={isVerifyingMobileOtp} /><Button type="button" onClick={() => handleVerifyOtp('mobile')} disabled={isVerifyingMobileOtp || mobileOtp.length !== 4}>{isVerifyingMobileOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}</Button></div></div>)} </FormItem> )} /> )}
                 {selectedPhoneTypes.includes("fax") && ( <FormField control={form.control} name="fax" render={({ field }) => ( <FormItem> <FormLabel>Fax</FormLabel> <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="Enter fax number" className="pl-10" {...field} value={field.value ?? ""} disabled={!isEditing} /></FormControl></div> <FormMessage /> </FormItem> )} /> )}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="address1" render={({ field }) => ( <FormItem> <FormLabel>Address Line 1</FormLabel> <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="Street, P.O. box, company name" className="pl-10" {...field} disabled={!isEditing} /></FormControl></div> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="address2" render={({ field }) => ( <FormItem> <FormLabel>Address Line 2 (Optional)</FormLabel> <FormControl><Input placeholder="Apartment, suite, unit, building, floor, etc." {...field} value={field.value ?? ""} disabled={!isEditing} /></FormControl> <FormMessage /> </FormItem> )}/>
            </div>

            <FormItem>
              <FormLabel>Warehouse Locations</FormLabel>
              <div className="space-y-3">
                {isEditing && ( <div className="flex items-center gap-2"> <Input placeholder="Add warehouse location" value={newWarehouseLocation} onChange={(e) => setNewWarehouseLocation(e.target.value)} className="flex-1" /> <Button type="button" onClick={addWarehouseLocation} size="sm">Add</Button> </div> )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.getValues("warehouseLocations")?.map((location, index) => ( <div key={index} className="flex items-center bg-yellow-50 text-yellow-700 rounded-full pl-3 pr-1 py-1 text-sm"> <span>{location}</span> {isEditing && ( <Button type="button" variant="ghost" size="icon" className="h-5 w-5 ml-1 hover:bg-yellow-100" onClick={() => removeWarehouseLocation(index)} aria-label="Remove warehouse location"><span className="text-xs" aria-hidden="true">×</span></Button> )} </div> ))}
                </div>
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="productCategories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Categories</FormLabel>
                  <FormControl>
                    {isEditing ? (
                      <MultiSelect
                        options={productCategoryOptions}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select product categories you supply"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2 min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        {field.value.length > 0 ? (
                          field.value.map((val) => {
                            const option = productCategoryOptions.find((opt) => opt.value === val);
                            return (
                              <div key={val} className="flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">
                                {option ? option.label : val}
                              </div>
                            );
                          })
                        ) : (
                          <span className="text-muted-foreground">No product categories selected</span>
                        )}
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter className="flex justify-end gap-2 border-t bg-gray-50/50 px-6 py-4">
              <Button type="submit" disabled={isSubmitting} className="bg-yellow-600 hover:bg-yellow-700">
                {isSubmitting ? ( <span className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</span> ) : ( "Save Changes" )}
              </Button>
              <Button variant="outline" type="button" disabled={isSubmitting} onClick={handleCancel}>Cancel</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CompanyInfoForm;