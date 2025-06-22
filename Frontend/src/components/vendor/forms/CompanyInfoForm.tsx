import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { CheckCircle2, XCircle, AlertTriangle, Loader2, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";
import { Checkbox } from "@/components/ui/checkbox";

// Regex for Indian GSTIN format
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// --- MODIFICATION 1: Stricter and more robust phone number validation ---
const phoneCharRegex = /^\+?[\d\s-()]*$/; // Allows digits, space, -, (, ), +
const phoneValidation = z.string().optional().refine(
  (value) => {
    if (!value) return true; // Optional field is valid if empty
    if (!phoneCharRegex.test(value)) return false; // Must match allowed characters
    const digits = value.replace(/\D/g, ''); // Extract only digits
    return digits.length >= 7 && digits.length <= 15; // Must have a plausible number of digits
  },
  { message: "Please enter a valid number with 7 to 15 digits." }
);

const formSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  industryFocus: z.array(z.string()).min(1, { message: "Select at least one industry" }),
  companyDescription: z.string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(500, { message: "Description cannot exceed 500 characters." }),
  gstNumber: z.string().optional().refine(
    (value) => !value || gstRegex.test(value),
    { message: "Invalid GST Number format. Please check and try again." }
  ),
  registrationNumber: z.string().min(1, { message: "Registration number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  telephone: phoneValidation,
  mobile: phoneValidation,
  fax: phoneValidation,
  address1: z.string().min(5, { message: "Address Line 1 must be at least 5 characters" }),
  address2: z.string().optional(),
  companySize: z.string().min(1, { message: "Company size is required" }),
  yearEstablished: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year (e.g., 2010)" }),
});


type FormValues = z.infer<typeof formSchema>;

const industryOptions = [
  { label: "Manufacturing", value: "manufacturing" }, { label: "Oil & Gas", value: "oil-gas" }, { label: "Construction", value: "construction" }, { label: "Mining", value: "mining" }, { label: "Pharmaceuticals", value: "pharmaceuticals" }, { label: "Automotive", value: "automotive" }, { label: "Chemical", value: "chemical" }, { label: "Food Processing", value: "food-processing" }, { label: "Aerospace", value: "aerospace" }, { label: "Energy", value: "energy" }, { label: "Textile", value: "textile" }, { label: "Logistics", value: "logistics" },
];

const companySizes = [
  { label: "1-10 employees", value: "1-10" }, { label: "11-50 employees", value: "11-50" }, { label: "51-200 employees", value: "51-200" }, { label: "201-500 employees", value: "201-500" }, { label: "501-1000 employees", value: "501-1000" }, { label: "1000+ employees", value: "1000+" },
];

const phoneTypes = [
  { id: 'telephone', label: 'Telephone' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'fax', label: 'Fax' },
] as const;

// --- DUMMY DEFAULT VALUES ---
const defaultValues: FormValues = {
  companyName: "TechServe Solutions",
  industryFocus: ["manufacturing", "oil-gas"],
  companyDescription: "We provide advanced industrial automation solutions focused on optimizing manufacturing processes and improving operational efficiency.",
  gstNumber: "29ABCDE1234F1Z5",
  registrationNumber: "U12345AB2020PTC123456",
  email: "contact@techservesolutions.com",
  mobile: "9876543210",
  telephone: undefined,
  fax: undefined,
  address1: "123 Tech Park, Industrial Area",
  address2: "Bangalore - 560100",
  companySize: "51-200",
  yearEstablished: "2015",
};

// --- NEW OTP INPUT COMPONENT ---
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
    // Only allow a single digit
    if (/^\d$/.test(entry) || entry === "") {
      const newOtp = value.split('');
      newOtp[index] = entry;
      onChange(newOtp.join('').slice(0, length));

      // Move focus to the next input if a digit was entered
      if (entry && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move focus to the previous input on backspace if current is empty
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, length);
      
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
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
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


const CompanyInfoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // GST State
  const [isVerifyingGst, setIsVerifyingGst] = useState(false);
  const [gstVerificationStatus, setGstVerificationStatus] = useState<'idle' | 'success' | 'not_found' | 'error'>('idle');
  const [verifiedGstData, setVerifiedGstData] = useState<{ legalName: string } | null>(null);

  // Registration Number State
  const [isVerifyingRegNo, setIsVerifyingRegNo] = useState(false);
  const [regNoVerificationStatus, setRegNoVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Email OTP State
  const [emailVerified, setEmailVerified] = useState(true); // Assume verified on load
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);
  const [showEmailOtpInput, setShowEmailOtpInput] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailTimer, setEmailTimer] = useState(0); // --- MODIFICATION 2: State for email OTP timer

  // Mobile OTP State
  const [mobileVerified, setMobileVerified] = useState(true); // Assume verified on load
  const [isSendingMobileOtp, setIsSendingMobileOtp] = useState(false);
  const [isVerifyingMobileOtp, setIsVerifyingMobileOtp] = useState(false);
  const [showMobileOtpInput, setShowMobileOtpInput] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [mobileTimer, setMobileTimer] = useState(0); // --- MODIFICATION 2: State for mobile OTP timer


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });

  // --- MODIFICATION 3: useEffect hooks to manage OTP countdown timers ---
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

      // --- MODIFICATION 4: Reset verification status and timers on field change ---
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
        setEmailTimer(0); // Reset timer
      }
      if (name === 'mobile') {
        setMobileVerified(false);
        setShowMobileOtpInput(false);
        setMobileOtp("");
        setMobileTimer(0); // Reset timer
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
        setVerifiedGstData({ legalName: 'DUMMY TECH SOLUTIONS PVT LTD' });
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

    setIsVerifyingRegNo(true);
    setRegNoVerificationStatus('idle');
    setTimeout(() => {
      setRegNoVerificationStatus('success');
      toast.success("Registration Number verified!");
      setIsVerifyingRegNo(false);
    }, 1500);
  };

  // --- MODIFICATION 5: Update handleSendOtp to start timers ---
  const handleSendOtp = async (type: 'email' | 'mobile') => {
    const fieldIsValid = await form.trigger(type);
    if (!fieldIsValid) return;

    if (type === 'email') {
      setIsSendingEmailOtp(true);
      setTimeout(() => {
        setIsSendingEmailOtp(false);
        setShowEmailOtpInput(true);
        setEmailTimer(30); // Start timer
        toast.success(`OTP sent to ${form.getValues("email")}`);
      }, 1000);
    } else {
      setIsSendingMobileOtp(true);
      setTimeout(() => {
        setIsSendingMobileOtp(false);
        setShowMobileOtpInput(true);
        setMobileTimer(30); // Start timer
        toast.success(`OTP sent to ${form.getValues("mobile")}`);
      }, 1000);
    }
  };

  const handleVerifyOtp = async (type: 'email' | 'mobile') => {
    if (type === 'email') {
      setIsVerifyingEmailOtp(true);
      setTimeout(() => {
        if (emailOtp === '1234') { // Dummy correct OTP
          setEmailVerified(true);
          setShowEmailOtpInput(false);
          toast.success("Email verified successfully!");
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
        setIsVerifyingEmailOtp(false);
      }, 1000);
    } else {
      setIsVerifyingMobileOtp(true);
      setTimeout(() => {
        if (mobileOtp === '1234') { // Dummy correct OTP
          setMobileVerified(true);
          setShowMobileOtpInput(false);
          toast.success("Mobile number verified successfully!");
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
        setIsVerifyingMobileOtp(false);
      }, 1000);
    }
  };

  const onSubmit = (values: FormValues) => {
    if (isEditing && (!emailVerified || !mobileVerified)) {
      toast.error("Please verify your new email and mobile number before saving.");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form values:", values);
      setIsSubmitting(false);
      setIsEditing(false);
      toast.success("Company information updated successfully!");
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
  }

  const handlePhoneTypeChange = (type: 'telephone' | 'mobile' | 'fax', checked: boolean) => {
    if (checked) {
      form.setValue(type, form.getValues(type) || '');
    } else {
      form.setValue(type, undefined);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-800">Company Information</CardTitle>
          <CardDescription>
            {isEditing ? "Update your company details." : "View your company details."}
          </CardDescription>
        </div>
        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ... other form fields ... */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearEstablished"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Established</FormLabel>
                    <FormControl>
                      <Input placeholder="YYYY" {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="industryFocus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Focus</FormLabel>
                  <div className={!isEditing ? "pointer-events-none opacity-50" : ""}>
                    <FormControl>
                      <MultiSelect
                        placeholder="Select industries"
                        options={industryOptions}
                        selected={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your company, services and expertise..." className="h-32 resize-none" {...field} disabled={!isEditing} />
                  </FormControl>
                  <div className="text-right text-sm text-muted-foreground"> {field.value.length} / 500 </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="gstNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                        GST Number (Optional)
                        {gstVerificationStatus === 'success' && <CheckCircle2 className="h-4 w-4 ml-2 text-green-600" />}
                    </FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input placeholder="Enter GST number" {...field} value={field.value ?? ""} disabled={!isEditing} />
                      </FormControl>
                      {/* --- MODIFICATION 6: Hide Verify button on success --- */}
                      {isEditing && gstVerificationStatus !== 'success' && (
                        <Button type="button" className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleVerifyGst} disabled={isVerifyingGst || !field.value} >
                          {isVerifyingGst ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                        </Button>
                      )}
                    </div>
                    <div className="mt-2 text-sm">
                      {gstVerificationStatus === 'success' && verifiedGstData && (
                        <div className="flex items-center text-green-600">
                           <CheckCircle2 className="h-4 w-4 mr-2" />
                           <span>Verified as: {verifiedGstData.legalName}</span>
                        </div>
                      )}
                      {gstVerificationStatus === 'not_found' && (
                        <div className="flex items-center text-yellow-600">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          <span>This GSTIN could not be found.</span>
                        </div>
                      )}
                      {gstVerificationStatus === 'error' && (
                        <div className="flex items-center text-red-600">
                          <XCircle className="h-4 w-4 mr-2" />
                          <span>Verification failed. Please try again later.</span>
                        </div>
                      )}
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
                    <FormLabel className="flex items-center">
                      Registration Number
                      {regNoVerificationStatus === 'success' && <CheckCircle2 className="h-4 w-4 ml-2 text-green-600" />}
                    </FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input placeholder="Enter registration number" {...field} disabled={!isEditing} />
                      </FormControl>
                       {/* --- MODIFICATION 6: Hide Verify button on success --- */}
                      {isEditing && regNoVerificationStatus !== 'success' && (
                        <Button type="button" className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleVerifyRegNo} disabled={isVerifyingRegNo || !field.value}>
                          {isVerifyingRegNo ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
               {/* Contact Numbers Section */}
               <FormLabel>Contact Numbers</FormLabel>
              <div className="flex items-center space-x-4 pt-2">
                {phoneTypes.map((phone) => (
                  <div key={phone.id} className="flex items-center space-x-2">
                    <Checkbox id={phone.id} checked={form.watch(phone.id) !== undefined} onCheckedChange={(checked) => handlePhoneTypeChange(phone.id, !!checked)} disabled={!isEditing} />
                    <label htmlFor={phone.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {phone.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="rounded-md border p-4 space-y-4">
                {form.watch('telephone') !== undefined && (
                  <FormField control={form.control} name="telephone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landline</FormLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="01145678901" {...field} value={field.value ?? ""} disabled={!isEditing} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}
                {form.watch('mobile') !== undefined && (
                  <FormField control={form.control} name="mobile" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Mobile
                        {mobileVerified && <CheckCircle2 className="h-4 w-4 ml-2 text-green-600" />}
                      </FormLabel>
                      <div className="flex items-center space-x-2">
                        <div className="relative flex-grow">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input placeholder="9876543210" {...field} value={field.value ?? ""} disabled={!isEditing || showMobileOtpInput} className="pl-10" />
                          </FormControl>
                        </div>
                         {/* --- MODIFICATION 7: Dynamic OTP button with timer and resend logic --- */}
                        {isEditing && !mobileVerified && (
                          <Button 
                            type="button" 
                            className="bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap" 
                            onClick={() => handleSendOtp('mobile')} 
                            disabled={isSendingMobileOtp || mobileTimer > 0 || !field.value || !!form.getFieldState('mobile').error}
                          >
                            {isSendingMobileOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : 
                             mobileTimer > 0 ? `Resend in ${mobileTimer}s` : 
                             showMobileOtpInput ? 'Resend OTP' : 'Send OTP'}
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                      {showMobileOtpInput && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-md border space-y-2">
                          <FormLabel>Enter 4-Digit OTP for Mobile</FormLabel>
                           <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                             <OtpInput value={mobileOtp} onChange={setMobileOtp} length={4} disabled={isVerifyingMobileOtp} />
                            <Button type="button" className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto" onClick={() => handleVerifyOtp('mobile')} disabled={isVerifyingMobileOtp || mobileOtp.length !== 4}>
                              {isVerifyingMobileOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </FormItem>
                  )} />
                )}
                {form.watch('fax') !== undefined && (
                  <FormField control={form.control} name="fax" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fax</FormLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="Enter fax number" {...field} value={field.value ?? ""} disabled={!isEditing} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}
              </div>
            </div>
             {/* ... Address fields ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input placeholder="Plot 123, Sector 44" {...field} disabled={!isEditing} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Gurugram, Haryana" {...field} value={field.value ?? ""} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Email Address
                      {emailVerified && <CheckCircle2 className="h-4 w-4 ml-2 text-green-600" />}
                    </FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input placeholder="Enter email address" type="email" {...field} disabled={!isEditing || showEmailOtpInput} />
                      </FormControl>
                       {/* --- MODIFICATION 7: Dynamic OTP button with timer and resend logic --- */}
                      {isEditing && !emailVerified && (
                        <Button 
                          type="button" 
                          className="bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap" 
                          onClick={() => handleSendOtp('email')} 
                          disabled={isSendingEmailOtp || emailTimer > 0 || !!form.getFieldState('email').error}
                        >
                           {isSendingEmailOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : 
                           emailTimer > 0 ? `Resend in ${emailTimer}s` :
                           showEmailOtpInput ? 'Resend OTP' : 'Send OTP'}
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                    {showEmailOtpInput && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-md border space-y-2">
                        <FormLabel>Enter 4-Digit OTP for Email</FormLabel>
                         <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                           <OtpInput value={emailOtp} onChange={setEmailOtp} length={4} disabled={isVerifyingEmailOtp} />
                          <Button type="button" className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto" onClick={() => handleVerifyOtp('email')} disabled={isVerifyingEmailOtp || emailOtp.length !== 4}>
                            {isVerifyingEmailOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isEditing}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companySizes.map((size) => (<SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isEditing && (
              <div className="flex justify-end space-x-4 pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
                <Button variant="outline" type="button" onClick={handleCancel} disabled={isSubmitting}>
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoForm;