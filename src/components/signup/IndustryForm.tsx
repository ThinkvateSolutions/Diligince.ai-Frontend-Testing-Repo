<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
=======
<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useState, useEffect, useRef } from 'react';
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { 
  sendVerificationOtp, 
  confirmVerificationOtp,
  registerIndustryUser 
} from '@/services/AuthServices';
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import { countryCodes, CountryCodeSelectField } from "@/components/ui/CountryCodeSelect";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { industries } from "@/constants/Types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
<<<<<<< HEAD
=======
<<<<<<< HEAD
// UPDATED: Added Check icon for verification success
>>>>>>> 9b0ce35 (Initial commit)
import { Phone, Eye, EyeOff, Lock, Check } from 'lucide-react';
import { PasswordInput } from "@/components/ui/PasswordInput";

// --- HELPER DATA (can be moved to a separate file) ---

// List of disallowed public email domains
const disallowedEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
// Simulated list of already registered organization domains
const registeredOrganizationDomains = ['thinkvate.com'];


// --- NEW 4-DIGIT OTP INPUT COMPONENT ---
interface FourDigitOtpInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const FourDigitOtpInput = ({ value, onChange, disabled }: FourDigitOtpInputProps) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const targetValue = e.target.value.replace(/[^0-9]/g, '');
    const newOtp = value.split('');
    newOtp[index] = targetValue;
    onChange(newOtp.join('').slice(0, 4));

    if (targetValue && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 4);
    if(pastedData){
      onChange(pastedData);
      inputsRef.current[pastedData.length -1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {[...Array(4)].map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength={1}
          inputMode="numeric"
          value={value[index] || ''}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="h-12 w-12 text-center text-lg font-semibold"
          disabled={disabled}
        />
      ))}
    </div>
  );
};


// --- ZOD SCHEMA WITH UPDATED VALIDATIONS ---
const formSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
<<<<<<< HEAD
=======
  email: z.string().email({ message: "Please enter a valid email address" }),
  otp: z.string()
    .min(4, { message: "OTP must be exactly 4 digits" })
    .max(4, { message: "OTP must be exactly 4 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
=======
import { Phone, Eye, EyeOff, Lock, Check } from 'lucide-react';
import { PasswordInput } from "@/components/ui/PasswordInput";

// --- HELPER DATA (can be moved to a separate file) ---

// List of disallowed public email domains
const disallowedEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
// Simulated list of already registered organization domains
const registeredOrganizationDomains = ['thinkvate.com'];


// --- NEW 4-DIGIT OTP INPUT COMPONENT ---
interface FourDigitOtpInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const FourDigitOtpInput = ({ value, onChange, disabled }: FourDigitOtpInputProps) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const targetValue = e.target.value.replace(/[^0-9]/g, '');
    const newOtp = value.split('');
    newOtp[index] = targetValue;
    onChange(newOtp.join('').slice(0, 4));

    if (targetValue && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 4);
    if(pastedData){
      onChange(pastedData);
      inputsRef.current[pastedData.length -1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {[...Array(4)].map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength={1}
          inputMode="numeric"
          value={value[index] || ''}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="h-12 w-12 text-center text-lg font-semibold"
          disabled={disabled}
        />
      ))}
    </div>
  );
};


// --- ZOD SCHEMA WITH UPDATED VALIDATIONS ---
const formSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
>>>>>>> 9b0ce35 (Initial commit)
  email: z.string().email({ message: "Please enter a valid email address" })
    .superRefine((email, ctx) => {
      const domain = email.split('@')[1];
      if (disallowedEmailDomains.includes(domain)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please use your organization's email, not a public one (e.g., Gmail, Yahoo).",
        });
      }
      if (registeredOrganizationDomains.includes(domain)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `An account for this organization already exists.`,
        });
      }
    }),
  emailOtp: z.string().length(4, { message: "Email OTP must be 4 digits" }).optional(),
  phoneOtp: z.string().length(4, { message: "Phone OTP must be 4 digits" }).optional(),
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  countryCode: z.string().min(1, { message: "Please select a country code" }),
  phone: z.string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d*$/, { message: "Phone number must contain digits only" }),
  industryType: z.string().min(1, { message: "Industry type is required" }),
  customIndustryType: z.string().optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((v) => v === true, { message: "You must accept the terms and conditions" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
.refine(
  (data) => data.industryType !== "Others" || (data.customIndustryType && data.customIndustryType.trim().length > 0),
  { message: "Please specify your industry type", path: ["customIndustryType"] }
)
.superRefine((data, ctx) => {
  if (data.countryCode && data.phone.trim() !== "") {
    const selectedCountry = countryCodes.find(cc => cc.name === data.countryCode);
    if (!selectedCountry) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid country selected.", path: ["countryCode"] });
      return;
    }
    const fullPhone = `${selectedCountry.value}${data.phone}`;
    try {
      const phoneNumber = parsePhoneNumberFromString(fullPhone);
      if (!phoneNumber || !phoneNumber.isValid()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid phone number for the selected country.", path: ["phone"] });
      }
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone number parsing error.", path: ["phone"] });
    }
  }
});

<<<<<<< HEAD

// --- MAIN INDUSTRY FORM COMPONENT ---
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
export function IndustryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
<<<<<<< HEAD
=======
  const [otpTimer, setOtpTimer] = useState(0);
=======

// --- MAIN INDUSTRY FORM COMPONENT ---
export function IndustryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
>>>>>>> 9b0ce35 (Initial commit)
  
  // State for Email OTP
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [emailOtpTimer, setEmailOtpTimer] = useState(0);

  // State for Phone OTP
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
  const [phoneOtpTimer, setPhoneOtpTimer] = useState(0);
  
  // State for Terms and Conditions
  const [termsClicked, setTermsClicked] = useState(false);
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
<<<<<<< HEAD
    defaultValues: {
      companyName: "",
      email: "",
      emailOtp: "",
      phoneOtp: "",
=======
<<<<<<< HEAD
    defaultValues: JSON.parse(localStorage.getItem("industryForm") || "null") || {
      companyName: "",
      email: "",
      otp: "",
=======
    defaultValues: {
      companyName: "",
      email: "",
      emailOtp: "",
      phoneOtp: "",
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      countryCode: "",
      phone: "",
      industryType: "",
      customIndustryType: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const companyNameValue = form.watch("companyName");
  const emailValue = form.watch("email");
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  const selectedCountry = countryCodes.find(
    (cc) => cc.name === form.watch("countryCode")
  );
  const showCustomIndustryField = form.watch("industryType") === "Others";

<<<<<<< HEAD
  // Timer useEffects
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (emailOtpTimer > 0) {
      interval = setInterval(() => setEmailOtpTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    }
    return () => clearInterval(interval);
  }, [emailOtpTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phoneOtpTimer > 0) {
      interval = setInterval(() => setPhoneOtpTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    }
    return () => clearInterval(interval);
  }, [phoneOtpTimer]);

  // --- Email OTP Handlers ---
  const handleSendEmailOtp = async () => {
    const isEmailValid = await form.trigger("email");
    if (!isEmailValid) {
      toast.error("Please fix the errors with your email address.");
      return;
    }
    if (emailOtpTimer > 0) return;

    setIsSendingEmailOtp(true);
    // Simulate API call
    setTimeout(() => {
      const email = form.getValues("email");
      setEmailOtpSent(true);
      setEmailOtpVerified(false);
      setEmailOtpTimer(30); // 30s timer
      toast.success(`A verification code was sent to ${email}`);
      setIsSendingEmailOtp(false);
    }, 500);
  };

  const handleVerifyEmailOtp = async () => {
    const otp = form.getValues("emailOtp");
    if (otp?.length !== 4) {
        form.setError("emailOtp", { message: "Enter a 4-digit code." });
        return;
    }
    
    setIsVerifyingEmailOtp(true);
    // Simulate API call and check hardcoded OTP
    setTimeout(() => {
      if (otp === "1234") {
        setEmailOtpVerified(true);
        toast.success('Email verified successfully!');
      } else {
        toast.error("Invalid OTP. Please try again.");
        form.setError("emailOtp", { message: "Invalid OTP. Please try again." });
      }
      setIsVerifyingEmailOtp(false);
    }, 500);
  };

  // --- Phone OTP Handlers ---
  const handleSendPhoneOtp = async () => {
    const isPhoneValid = await form.trigger(["countryCode", "phone"]);
    if (!isPhoneValid) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (phoneOtpTimer > 0) return;

    setIsSendingPhoneOtp(true);
    // Simulate API call
    setTimeout(() => {
      const phone = form.getValues("phone");
      setPhoneOtpSent(true);
      setPhoneOtpVerified(false);
      setPhoneOtpTimer(30); // 30s timer
      toast.success(`A verification code was sent to ${phone}`);
      setIsSendingPhoneOtp(false);
    }, 500);
  };

  const handleVerifyPhoneOtp = async () => {
    const otp = form.getValues("phoneOtp");
    if (otp?.length !== 4) {
        form.setError("phoneOtp", { message: "Enter a 4-digit code." });
        return;
    }
    
    setIsVerifyingPhoneOtp(true);
    // Simulate API call and check hardcoded OTP
    setTimeout(() => {
      if (otp === "1234") {
        setPhoneOtpVerified(true);
        toast.success('Phone number verified successfully!');
      } else {
        toast.error("Invalid OTP. Please try again.");
        form.setError("phoneOtp", { message: "Invalid OTP. Please try again." });
      }
      setIsVerifyingPhoneOtp(false);
    }, 500);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
<<<<<<< HEAD
    if (!emailOtpVerified || !phoneOtpVerified) {
      toast.error('Please verify your email and phone number before submitting.');
=======
    if (!otpVerified) {
      toast.error('Please verify your email first');
=======
  // Timer useEffects
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (emailOtpTimer > 0) {
      interval = setInterval(() => setEmailOtpTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    }
    return () => clearInterval(interval);
  }, [emailOtpTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phoneOtpTimer > 0) {
      interval = setInterval(() => setPhoneOtpTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    }
    return () => clearInterval(interval);
  }, [phoneOtpTimer]);

  // --- Email OTP Handlers ---
  const handleSendEmailOtp = async () => {
    const isEmailValid = await form.trigger("email");
    if (!isEmailValid) {
      toast.error("Please fix the errors with your email address.");
      return;
    }
    if (emailOtpTimer > 0) return;

    setIsSendingEmailOtp(true);
    // Simulate API call
    setTimeout(() => {
      const email = form.getValues("email");
      setEmailOtpSent(true);
      setEmailOtpVerified(false);
      setEmailOtpTimer(30); // 30s timer
      toast.success(`A verification code was sent to ${email}`);
      setIsSendingEmailOtp(false);
    }, 500);
  };

  const handleVerifyEmailOtp = async () => {
    const otp = form.getValues("emailOtp");
    if (otp?.length !== 4) {
        form.setError("emailOtp", { message: "Enter a 4-digit code." });
        return;
    }
    
    setIsVerifyingEmailOtp(true);
    // Simulate API call and check hardcoded OTP
    setTimeout(() => {
      if (otp === "1234") {
        setEmailOtpVerified(true);
        toast.success('Email verified successfully!');
      } else {
        toast.error("Invalid OTP. Please try again.");
        form.setError("emailOtp", { message: "Invalid OTP. Please try again." });
      }
      setIsVerifyingEmailOtp(false);
    }, 500);
  };

  // --- Phone OTP Handlers ---
  const handleSendPhoneOtp = async () => {
    const isPhoneValid = await form.trigger(["countryCode", "phone"]);
    if (!isPhoneValid) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (phoneOtpTimer > 0) return;

    setIsSendingPhoneOtp(true);
    // Simulate API call
    setTimeout(() => {
      const phone = form.getValues("phone");
      setPhoneOtpSent(true);
      setPhoneOtpVerified(false);
      setPhoneOtpTimer(30); // 30s timer
      toast.success(`A verification code was sent to ${phone}`);
      setIsSendingPhoneOtp(false);
    }, 500);
  };

  const handleVerifyPhoneOtp = async () => {
    const otp = form.getValues("phoneOtp");
    if (otp?.length !== 4) {
        form.setError("phoneOtp", { message: "Enter a 4-digit code." });
        return;
    }
    
    setIsVerifyingPhoneOtp(true);
    // Simulate API call and check hardcoded OTP
    setTimeout(() => {
      if (otp === "1234") {
        setPhoneOtpVerified(true);
        toast.success('Phone number verified successfully!');
      } else {
        toast.error("Invalid OTP. Please try again.");
        form.setError("phoneOtp", { message: "Invalid OTP. Please try again." });
      }
      setIsVerifyingPhoneOtp(false);
    }, 500);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!emailOtpVerified || !phoneOtpVerified) {
      toast.error('Please verify your email and phone number before submitting.');
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      return;
    }
    
    setIsSubmitting(true);
<<<<<<< HEAD
=======
<<<<<<< HEAD
    try {
      const effectiveIndustryType = values.industryType === "Others" 
        ? values.customIndustryType?.trim() 
        : values.industryType;
      const country = countryCodes.find(cc => cc.name === values.countryCode);
       
      const fullPhone = `${country?.value || ""}${values.phone}`;

      await registerIndustryUser({
        companyName: values.companyName,
        email: values.email,
        phone: fullPhone,
        industryType: effectiveIndustryType!,
        password: values.password,
        type: 'industry'
      });
      
      localStorage.removeItem("industryForm");
      toast.success("Registration successful! Welcome to our platform");
      navigate("/signin?role=industry");
    } catch (error) {
      toast.error("Registration failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCountryCodeSelectionChange = () => {
    form.setValue("phone", "");
    form.clearErrors("phone");
=======
>>>>>>> 9b0ce35 (Initial commit)
    // Simulate final submission
    console.log("Form Submitted:", values);
    setTimeout(() => {
        toast.success("Registration successful! Welcome to our platform");
        navigate("/signin?role=industry");
        setIsSubmitting(false);
    }, 1000);
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
<<<<<<< HEAD
=======
<<<<<<< HEAD
        {/* Company Name */}
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Steel Industries Ltd." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<<<<<<< HEAD
=======
<<<<<<< HEAD
        {/* {companyNameValue?.trim() !== "" && (
          <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
            <p className="text-xs text-muted-foreground">
              Company Name: <span className="font-medium text-foreground">{companyNameValue}</span>
            </p>
          </div>
        )} */}
>>>>>>> 9b0ce35 (Initial commit)

        {/* --- Email & OTP Section --- */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input 
                    placeholder="e.g. your@company.com" 
                    {...field} 
                    disabled={emailOtpSent}
                  />
                </FormControl>
                {!emailOtpVerified ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleSendEmailOtp}
                    disabled={isSendingEmailOtp || emailOtpSent}
                    className="flex-shrink-0"
                  >
                    {isSendingEmailOtp ? "Sending..." : "Verify"}
                  </Button>
                ) : (
                  <span className="flex items-center text-sm font-medium text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    Verified
                  </span>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {emailOtpSent && !emailOtpVerified && (
          <FormItem className="animate-fade-in">
             <FormLabel>Enter 4-Digit OTP for Email</FormLabel>
              <FormField
                control={form.control}
                name="emailOtp"
                render={({ field }) => (
                    <FourDigitOtpInput {...field} disabled={isVerifyingEmailOtp} />
                )}
              />
              <div className="mt-2 flex items-center justify-between">
                <Button
                    type="button"
                    onClick={handleVerifyEmailOtp}
                    disabled={isVerifyingEmailOtp}
                    className="flex-shrink-0"
                >
                    {isVerifyingEmailOtp ? "Verifying..." : "Verify"}
                </Button>
                {emailOtpTimer > 0 ? (
                    <p className="text-xs text-muted-foreground">Resend in {emailOtpTimer}s</p>
                ) : (
                    <Button type="button" variant="link" size="sm" onClick={handleSendEmailOtp} className="text-xs h-auto p-0">Resend</Button>
                )}
              </div>
            <FormMessage />
          </FormItem>
        )}

<<<<<<< HEAD
        {/* --- Phone Number & OTP Section --- */}
=======
    <div className="mt-2 flex items-center justify-between">
      {otpTimer > 0 ? (
        <p className="text-xs text-muted-foreground">
          Resend code in {otpTimer}s
        </p>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleSendOtp}
          disabled={isSendingOtp}
          className="text-xs"
        >
          {isSendingOtp ? "Resending..." : "Resend Code"}
        </Button>
      )}
    </div>
  </>
)}

        {/* === END OF UPDATED SECTION === */}

        {/* Phone Number */}
=======

        {/* --- Email & OTP Section --- */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input 
                    placeholder="e.g. your@company.com" 
                    {...field} 
                    disabled={emailOtpSent}
                  />
                </FormControl>
                {!emailOtpVerified ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleSendEmailOtp}
                    disabled={isSendingEmailOtp || emailOtpSent}
                    className="flex-shrink-0"
                  >
                    {isSendingEmailOtp ? "Sending..." : "Verify"}
                  </Button>
                ) : (
                  <span className="flex items-center text-sm font-medium text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    Verified
                  </span>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {emailOtpSent && !emailOtpVerified && (
          <FormItem className="animate-fade-in">
             <FormLabel>Enter 4-Digit OTP for Email</FormLabel>
              <FormField
                control={form.control}
                name="emailOtp"
                render={({ field }) => (
                    <FourDigitOtpInput {...field} disabled={isVerifyingEmailOtp} />
                )}
              />
              <div className="mt-2 flex items-center justify-between">
                <Button
                    type="button"
                    onClick={handleVerifyEmailOtp}
                    disabled={isVerifyingEmailOtp}
                    className="flex-shrink-0"
                >
                    {isVerifyingEmailOtp ? "Verifying..." : "Verify"}
                </Button>
                {emailOtpTimer > 0 ? (
                    <p className="text-xs text-muted-foreground">Resend in {emailOtpTimer}s</p>
                ) : (
                    <Button type="button" variant="link" size="sm" onClick={handleSendEmailOtp} className="text-xs h-auto p-0">Resend</Button>
                )}
              </div>
            <FormMessage />
          </FormItem>
        )}

        {/* --- Phone Number & OTP Section --- */}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <div className="flex items-start space-x-2">
            <CountryCodeSelectField
              control={form.control}
              name="countryCode"
<<<<<<< HEAD
              onValueChange={() => form.setValue("phone", "")}
=======
<<<<<<< HEAD
              onValueChange={handleCountryCodeSelectionChange}
>>>>>>> 9b0ce35 (Initial commit)
              className="w-1/3 min-w-[120px]"
              triggerPlaceholder="Code"
              disabled={phoneOtpSent}
            />
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                        <FormControl>
                            <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={selectedCountry ? selectedCountry.placeholder : "e.g. 9876543210"}
                                type="tel"
                                className="pl-10"
                                maxLength={selectedCountry?.maxLength}
                                {...field}
                                disabled={phoneOtpSent}
                                onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '');
                                const maxLength = selectedCountry?.maxLength;
                                field.onChange(maxLength && numericValue.length > maxLength ? numericValue.slice(0, maxLength) : numericValue);
                                }}
                            />
                            </div>
                        </FormControl>
                        </FormItem>
                    )}
                    />
                    {!phoneOtpVerified ? (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleSendPhoneOtp}
                            disabled={isSendingPhoneOtp || phoneOtpSent}
                            className="flex-shrink-0"
                        >
                            {isSendingPhoneOtp ? "Sending..." : "Verify"}
                        </Button>
                    ) : (
                        <span className="flex items-center text-sm font-medium text-green-600">
                            <Check className="h-4 w-4 mr-1" />
                            Verified
                        </span>
                    )}
                </div>
                <FormField control={form.control} name="phone" render={()=><FormMessage className="mt-2"/>}/>
            </div>
          </div>
        </FormItem>

<<<<<<< HEAD
=======
        {/* Industry Type */}
=======
              onValueChange={() => form.setValue("phone", "")}
              className="w-1/3 min-w-[120px]"
              triggerPlaceholder="Code"
              disabled={phoneOtpSent}
            />
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                        <FormControl>
                            <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={selectedCountry ? selectedCountry.placeholder : "e.g. 9876543210"}
                                type="tel"
                                className="pl-10"
                                maxLength={selectedCountry?.maxLength}
                                {...field}
                                disabled={phoneOtpSent}
                                onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '');
                                const maxLength = selectedCountry?.maxLength;
                                field.onChange(maxLength && numericValue.length > maxLength ? numericValue.slice(0, maxLength) : numericValue);
                                }}
                            />
                            </div>
                        </FormControl>
                        </FormItem>
                    )}
                    />
                    {!phoneOtpVerified ? (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleSendPhoneOtp}
                            disabled={isSendingPhoneOtp || phoneOtpSent}
                            className="flex-shrink-0"
                        >
                            {isSendingPhoneOtp ? "Sending..." : "Verify"}
                        </Button>
                    ) : (
                        <span className="flex items-center text-sm font-medium text-green-600">
                            <Check className="h-4 w-4 mr-1" />
                            Verified
                        </span>
                    )}
                </div>
                <FormField control={form.control} name="phone" render={()=><FormMessage className="mt-2"/>}/>
            </div>
          </div>
        </FormItem>

>>>>>>> 9b0ce35 (Initial commit)
        {phoneOtpSent && !phoneOtpVerified && (
          <FormItem className="animate-fade-in">
             <FormLabel>Enter 4-Digit OTP for Mobile</FormLabel>
              <FormField
                control={form.control}
                name="phoneOtp"
                render={({ field }) => (
                    <FourDigitOtpInput {...field} disabled={isVerifyingPhoneOtp} />
                )}
              />
              <div className="mt-2 flex items-center justify-between">
                <Button
                    type="button"
                    onClick={handleVerifyPhoneOtp}
                    disabled={isVerifyingPhoneOtp}
                    className="flex-shrink-0"
                >
                    {isVerifyingPhoneOtp ? "Verifying..." : "Verify"}
                </Button>
                {phoneOtpTimer > 0 ? (
                    <p className="text-xs text-muted-foreground">Resend in {phoneOtpTimer}s</p>
                ) : (
                    <Button type="button" variant="link" size="sm" onClick={handleSendPhoneOtp} className="text-xs h-auto p-0">Resend</Button>
                )}
              </div>
            <FormMessage />
          </FormItem>
        )}
        
        {/* --- Other Fields --- */}
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <FormField
          control={form.control}
          name="industryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry Type</FormLabel>
<<<<<<< HEAD
              <Select onValueChange={field.onChange} value={field.value}>
=======
<<<<<<< HEAD
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value !== "Others") {
                    form.setValue("customIndustryType", "");
                    form.clearErrors("customIndustryType");
                  }
                }}
                value={field.value}
              >
=======
              <Select onValueChange={field.onChange} value={field.value}>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry type" />
                  </SelectTrigger>
                </FormControl>
<<<<<<< HEAD
                <SelectContent>
=======
<<<<<<< HEAD
                <SelectContent className="max-h-60 overflow-y-auto">
=======
                <SelectContent>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
<<<<<<< HEAD
        
=======
<<<<<<< HEAD

        {/* Custom Industry if Others */}
=======
        
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        {showCustomIndustryField && (
          <FormField
            control={form.control}
            name="customIndustryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specify Industry Type</FormLabel>
                <FormControl>
                  <Input placeholder="Please specify your industry type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
<<<<<<< HEAD
        
        <FormField control={form.control} name="password" render={({ field }) => (<PasswordInput field={field} />)} />
        
=======
<<<<<<< HEAD

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <PasswordInput field={field} />
          )}
        />

        {/* Confirm Password */}
=======
        
        <FormField control={form.control} name="password" render={({ field }) => (<PasswordInput field={field} />)} />
        
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    {...field}
                  />
<<<<<<< HEAD
                  <button type="button" tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
=======
<<<<<<< HEAD
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
=======
                  <button type="button" tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<<<<<<< HEAD
        {/* --- Terms and Conditions --- */}
=======
<<<<<<< HEAD
        {/* Accept Terms */}
=======
        {/* --- Terms and Conditions --- */}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="acceptTerms"
<<<<<<< HEAD
                  disabled={!termsClicked}
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="acceptTerms" className={!termsClicked ? 'text-muted-foreground' : ''}>
                  I accept the
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1" onClick={() => setTermsClicked(true)}>
                    terms and conditions
                  </a>
                </FormLabel>
<<<<<<< HEAD
                {!termsClicked && <p className="text-xs text-muted-foreground">Kindly click the link to read our Terms and Conditions, then enable the checkbox to continue.

</p>}
=======
=======
                  disabled={!termsClicked}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="acceptTerms" className={!termsClicked ? 'text-muted-foreground' : ''}>
                  I accept the
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1" onClick={() => setTermsClicked(true)}>
                    terms and conditions
                  </a>
                </FormLabel>
                {!termsClicked && <p className="text-xs text-muted-foreground">Kindly click the link to read our Terms and Conditions, then enable the checkbox to continue.

</p>}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

<<<<<<< HEAD
        <Button type="submit" className="w-full" disabled={isSubmitting || !emailOtpVerified || !phoneOtpVerified}>
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
=======
<<<<<<< HEAD
        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150"
          disabled={isSubmitting || !otpVerified}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>

        {!otpVerified && (
          <p className="text-center text-sm text-muted-foreground">
            Please verify your email to create an account.
          </p>
        )}
=======
        <Button type="submit" className="w-full" disabled={isSubmitting || !emailOtpVerified || !phoneOtpVerified}>
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      </form>
    </Form>
  );
}

export default IndustryForm;