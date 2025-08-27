<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
=======
<<<<<<< HEAD
import { useState, useCallback, useEffect } from "react";
=======
import { useState, useEffect, useRef } from "react";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
<<<<<<< HEAD
import { Eye, EyeOff, Lock, Phone, Check } from "lucide-react";
=======
<<<<<<< HEAD
import { Eye, EyeOff, Lock, Phone ,Check} from "lucide-react";
=======
import { Eye, EyeOff, Lock, Phone, Check } from "lucide-react";
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';

import { countryCodes, CountryCodeSelectField } from "@/components/ui/CountryCodeSelect";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { vendorCategories, specializations } from "@/constants/Types";
<<<<<<< HEAD
// Note: Simulating auth services for this example
// import { 
//   sendVerificationOtp, 
//   confirmVerificationOtp,
//   registerVendorUser
// } from '@/services/AuthServices';

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
    if (pastedData) {
      onChange(pastedData);
      inputsRef.current[pastedData.length - 1]?.focus();
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
=======
<<<<<<< HEAD
import { 
  sendVerificationOtp, 
  confirmVerificationOtp,
  registerVendorUser
} from '@/services/AuthServices';
import { otppayload } from '@/services/AuthServices';
import axios from 'axios';
>>>>>>> 9b0ce35 (Initial commit)


// --- ZOD SCHEMA ---
const formSchema = z.object({
  businessName: z.string().min(1, { message: "Business name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
<<<<<<< HEAD
  emailOtp: z.string().optional(),
  phoneOtp: z.string().optional(),
=======
=======
// Note: Simulating auth services for this example
// import { 
//   sendVerificationOtp, 
//   confirmVerificationOtp,
//   registerVendorUser
// } from '@/services/AuthServices';

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
    if (pastedData) {
      onChange(pastedData);
      inputsRef.current[pastedData.length - 1]?.focus();
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


// --- ZOD SCHEMA ---
const formSchema = z.object({
  businessName: z.string().min(1, { message: "Business name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  emailOtp: z.string().optional(),
  phoneOtp: z.string().optional(),
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  countryCode: z.string().min(1, { message: "Please select a country code" }),
  phone: z.string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d*$/, { message: "Phone number must contain digits only" }),
<<<<<<< HEAD
=======
<<<<<<< HEAD
    otp: z.string()
        .min(4, { message: "OTP must be exactly 4 digits" })
        .max(4, { message: "OTP must be exactly 4 digits" })
        .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  vendorCategory: z.string().min(1, { message: "Vendor category is required" }),
  specialization: z.string().min(1, { message: "Specialization is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((value) => value === true, { message: "You must accept the terms and conditions" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
.superRefine((data, ctx) => {
<<<<<<< HEAD
  if (data.countryCode && data.phone.trim() !== "") {
    const selectedCountry = countryCodes.find(cc => cc.name === data.countryCode);
    if (!selectedCountry) {
=======
<<<<<<< HEAD
  if (data.countryCode && data.phone && data.phone.trim() !== "") {
    const selectedCountryObject = countryCodes.find(cc => cc.name === data.countryCode);
    if (!selectedCountryObject) {
>>>>>>> 9b0ce35 (Initial commit)
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid country selected.", path: ["countryCode"] });
      return;
    }
    const fullPhone = `${selectedCountry.value}${data.phone}`;
    try {
      const phoneNumber = parsePhoneNumberFromString(fullPhone);
      if (!phoneNumber || !phoneNumber.isValid()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid phone number for the selected country.", path: ["phone"] });
      }
<<<<<<< HEAD
    } catch {
=======
    } catch (error) {
=======
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
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone number parsing error.", path: ["phone"] });
    }
  }
});

<<<<<<< HEAD
// --- MAIN VENDOR FORM COMPONENT ---
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
export function VendorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

<<<<<<< HEAD
=======
=======
// --- MAIN VENDOR FORM COMPONENT ---
export function VendorForm() {
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
      businessName: "",
      email: "",
      emailOtp: "",
      phoneOtp: "",
      countryCode: "",
=======
<<<<<<< HEAD
    defaultValues: JSON.parse(localStorage.getItem("vendorForm") || "null") || {
      businessName: "", 
      email: "", 
      countryCode: "", 
>>>>>>> 9b0ce35 (Initial commit)
      phone: "",
      vendorCategory: "",
      specialization: "",
      password: "",
<<<<<<< HEAD
      confirmPassword: "",
=======
      confirmPassword: "", 
=======
    defaultValues: {
      businessName: "",
      email: "",
      emailOtp: "",
      phoneOtp: "",
      countryCode: "",
      phone: "",
      vendorCategory: "",
      specialization: "",
      password: "",
      confirmPassword: "",
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      acceptTerms: false,
    },
  });

<<<<<<< HEAD
=======
<<<<<<< HEAD
  // Persist form data to localStorage
  useEffect(() => {
    const sub = form.watch((values) => {
      localStorage.setItem("vendorForm", JSON.stringify(values));
    });
    return () => sub.unsubscribe();
  }, [form]);
  
 useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

   const handleSendOtp = async () => {
    const email = form.getValues("email");
    const isEmailValid = await form.trigger("email");
    
    if (!isEmailValid) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (otpTimer > 0) {
      toast.warning(`Please wait ${otpTimer} seconds before requesting a new OTP`);
      return;
    }
   

  if (otpTimer > 0) {
    toast.warning(`Please wait ${otpTimer} seconds before requesting a new OTP`);
    return;
  }
  
  setIsSendingOtp(true);
    try {
      const otpPayload: otppayload = { email: email };
      await sendVerificationOtp(otpPayload);
      
      setOtpSent(true);
      setOtpVerified(false); // Reset verification status
      setOtpTimer(60);
      toast.success(`OTP sent to ${email}`);
      form.setFocus("otp");
    } catch (error) {
      let errorMessage = "Failed to send OTP";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsSendingOtp(false);
    }
  };
  const verifyOtp = async () => {
    const email = form.getValues("email");
    const otp = form.getValues("otp");
    
    try {
      await confirmVerificationOtp(email, otp);
      setOtpVerified(true);
      toast.success('Email verified successfully!');
    } catch (error) {
      setOtpVerified(false);
      toast.error(error instanceof Error ? error.message : "Invalid OTP");
    }
  };

  const handleVerifyOtp = async () => {
    const isOtpValid = await form.trigger("otp");
    if (!isOtpValid) return;

    const email = form.getValues("email");
    const otp = form.getValues("otp");
    
    setIsVerifyingOtp(true);
    try {
      await confirmVerificationOtp(email, otp);
      setOtpVerified(true);
      toast.success('Email verified successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid or expired OTP.";
      setOtpVerified(false);
      toast.error("Verification Failed", { description: errorMessage });
      form.setError("otp", { type: "manual", message: errorMessage });
    } finally {
        setIsVerifyingOtp(false);
    }
  };
  const handleEditEmail = () => {
  setOtpSent(false);
  setOtpVerified(false);
  setOtpTimer(0);
  form.setValue("otp", "");
  form.clearErrors("otp");
  form.setFocus("email");
};

>>>>>>> 9b0ce35 (Initial commit)
  const selectedVendorCategory = form.watch("vendorCategory");
  const selectedCountry = countryCodes.find(cc => cc.name === form.watch("countryCode"));
  
  const currentSpecializations = (
    selectedVendorCategory && specializations[selectedVendorCategory as keyof typeof specializations]
      ? specializations[selectedVendorCategory as keyof typeof specializations]
      : []
  ).sort();

  // Timers
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (emailOtpTimer > 0) interval = setInterval(() => setEmailOtpTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [emailOtpTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phoneOtpTimer > 0) interval = setInterval(() => setPhoneOtpTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [phoneOtpTimer]);

  // --- OTP Handlers ---
  const handleSendEmailOtp = async () => {
    if (!(await form.trigger("email")) || emailOtpTimer > 0) return;
    setIsSendingEmailOtp(true);
    setTimeout(() => {
      setEmailOtpSent(true); setEmailOtpTimer(30);
      toast.success(`OTP (1234) sent to ${form.getValues("email")}`);
      setIsSendingEmailOtp(false);
    }, 500);
  };

  const handleVerifyEmailOtp = async () => {
    const otp = form.getValues("emailOtp");
    if (!otp || otp.length !== 4) return;
    setIsVerifyingEmailOtp(true);
    setTimeout(() => {
      if (otp === "1234") {
        setEmailOtpVerified(true); toast.success('Email verified!');
      } else {
        toast.error("Invalid Email OTP."); form.setError("emailOtp", { message: "Invalid OTP" });
      }
      setIsVerifyingEmailOtp(false);
    }, 500);
  };

  const handleSendPhoneOtp = async () => {
    if (!(await form.trigger(["countryCode", "phone"])) || phoneOtpTimer > 0) return;
    setIsSendingPhoneOtp(true);
    setTimeout(() => {
      setPhoneOtpSent(true); setPhoneOtpTimer(30);
      toast.success(`OTP (1234) sent to ${form.getValues("phone")}`);
      setIsSendingPhoneOtp(false);
    }, 500);
  };

  const handleVerifyPhoneOtp = async () => {
    const otp = form.getValues("phoneOtp");
    if (!otp || otp.length !== 4) return;
    setIsVerifyingPhoneOtp(true);
    setTimeout(() => {
      if (otp === "1234") {
        setPhoneOtpVerified(true); toast.success('Phone verified!');
      } else {
        toast.error("Invalid Phone OTP."); form.setError("phoneOtp", { message: "Invalid OTP" });
      }
      setIsVerifyingPhoneOtp(false);
    }, 500);
  };

  // --- Form Submit ---
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!emailOtpVerified || !phoneOtpVerified) {
      toast.error('Please verify both email and phone number.');
      return;
    }
    setIsSubmitting(true);
    console.log("Form Submitted:", values);
    setTimeout(() => {
      toast.success("Registration successful! Welcome.");
      navigate("/signin?role=vendor");
      setIsSubmitting(false);
<<<<<<< HEAD
    }, 1000);
=======
    }
=======
  const selectedVendorCategory = form.watch("vendorCategory");
  const selectedCountry = countryCodes.find(cc => cc.name === form.watch("countryCode"));
  
  const currentSpecializations = (
    selectedVendorCategory && specializations[selectedVendorCategory as keyof typeof specializations]
      ? specializations[selectedVendorCategory as keyof typeof specializations]
      : []
  ).sort();

  // Timers
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (emailOtpTimer > 0) interval = setInterval(() => setEmailOtpTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [emailOtpTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phoneOtpTimer > 0) interval = setInterval(() => setPhoneOtpTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [phoneOtpTimer]);

  // --- OTP Handlers ---
  const handleSendEmailOtp = async () => {
    if (!(await form.trigger("email")) || emailOtpTimer > 0) return;
    setIsSendingEmailOtp(true);
    setTimeout(() => {
      setEmailOtpSent(true); setEmailOtpTimer(30);
      toast.success(`OTP (1234) sent to ${form.getValues("email")}`);
      setIsSendingEmailOtp(false);
    }, 500);
  };

  const handleVerifyEmailOtp = async () => {
    const otp = form.getValues("emailOtp");
    if (!otp || otp.length !== 4) return;
    setIsVerifyingEmailOtp(true);
    setTimeout(() => {
      if (otp === "1234") {
        setEmailOtpVerified(true); toast.success('Email verified!');
      } else {
        toast.error("Invalid Email OTP."); form.setError("emailOtp", { message: "Invalid OTP" });
      }
      setIsVerifyingEmailOtp(false);
    }, 500);
  };

  const handleSendPhoneOtp = async () => {
    if (!(await form.trigger(["countryCode", "phone"])) || phoneOtpTimer > 0) return;
    setIsSendingPhoneOtp(true);
    setTimeout(() => {
      setPhoneOtpSent(true); setPhoneOtpTimer(30);
      toast.success(`OTP (1234) sent to ${form.getValues("phone")}`);
      setIsSendingPhoneOtp(false);
    }, 500);
  };

  const handleVerifyPhoneOtp = async () => {
    const otp = form.getValues("phoneOtp");
    if (!otp || otp.length !== 4) return;
    setIsVerifyingPhoneOtp(true);
    setTimeout(() => {
      if (otp === "1234") {
        setPhoneOtpVerified(true); toast.success('Phone verified!');
      } else {
        toast.error("Invalid Phone OTP."); form.setError("phoneOtp", { message: "Invalid OTP" });
      }
      setIsVerifyingPhoneOtp(false);
    }, 500);
  };

  // --- Form Submit ---
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!emailOtpVerified || !phoneOtpVerified) {
      toast.error('Please verify both email and phone number.');
      return;
    }
    setIsSubmitting(true);
    console.log("Form Submitted:", values);
    setTimeout(() => {
      toast.success("Registration successful! Welcome.");
      navigate("/signin?role=vendor");
      setIsSubmitting(false);
    }, 1000);
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Coastal Services Ltd." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<<<<<<< HEAD
=======
<<<<<<< HEAD
        {businessNameValue && businessNameValue.trim() !== "" && (
          <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
            <p className="text-xs text-muted-foreground">
              Business Name: <span className="font-medium text-foreground">{businessNameValue}</span>
            </p>
          </div>
        )}
  {/* email Field*/}
  <FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <div className="flex items-center gap-2">
        <FormControl>
          <Input 
            placeholder="your@company.com" 
            {...field} 
            disabled={otpSent}
          />
        </FormControl>

        {!otpSent ? (
          <Button
            type="button"
            variant="secondary"
            onClick={handleSendOtp}
            disabled={isSendingOtp || !emailValue.trim()}
            className="flex-shrink-0"
          >
            {isSendingOtp ? "Sending..." : "Verify"}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="link"
              className="p-1 h-auto flex-shrink-0 text-sm"
              onClick={handleEditEmail}
            >
              Change
            </Button>
            {otpVerified && (
              <span className="flex items-center text-sm font-medium text-green-600">
                <Check className="h-4 w-4 mr-1" />
                Verified
              </span>
            )}
          </div>
        )}
      </div>

      {emailValue.trim() !== "" && (
        <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
          <p className="text-xs text-muted-foreground">
            Email: <span className="font-medium text-foreground">{emailValue}</span>
          </p>
        </div>
      )}

      {otpTimer > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          Resend code in {otpTimer}s
        </p>
      )}

      <FormMessage />
    </FormItem>
  )}
/>

{/* OTP Input shown only after OTP is sent */}
{otpSent && !otpVerified &&(
  <>
    <FormField
      control={form.control}
      name="otp"
      render={({ field }) => (
        <FormItem className="animate-fade-in">
          <FormLabel>Verification Code</FormLabel>
          <div className="flex gap-2 items-center">
            <FormControl>
              <Input
                placeholder="Enter 4-digit code"
                maxLength={4}
                {...field}
                onChange={(e) => {
                  const otp = e.target.value.replace(/\D/g, '').slice(0, 4);
                  field.onChange(otp);
                }}
              />
            </FormControl>
            <Button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isVerifyingOtp}
              className="flex-shrink-0"
            >
              {isVerifyingOtp ? "Verifying..." : "Verify"}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />

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

>>>>>>> 9b0ce35 (Initial commit)
        
        {/* Email & OTP */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input placeholder="your@company.com" {...field} disabled={emailOtpSent} />
                </FormControl>
                {!emailOtpVerified ? (
                  <Button type="button" variant="secondary" onClick={handleSendEmailOtp} disabled={isSendingEmailOtp || emailOtpSent}>
                    {isSendingEmailOtp ? "Sending..." : "Verify"}
                  </Button>
                ) : (
                  <span className="flex items-center text-sm font-medium text-green-600"><Check className="h-4 w-4 mr-1" />Verified</span>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {emailOtpSent && !emailOtpVerified && (
          <FormItem className="animate-fade-in">
            <FormLabel>Enter 4-Digit OTP for Email</FormLabel>
            <FormField control={form.control} name="emailOtp" render={({ field }) => <FourDigitOtpInput {...field} disabled={isVerifyingEmailOtp} />} />
            <div className="mt-2 flex items-center justify-between">
              <Button type="button" onClick={handleVerifyEmailOtp} disabled={isVerifyingEmailOtp}>{isVerifyingEmailOtp ? "Verifying..." : "Verify"}</Button>
              {emailOtpTimer > 0 ? (
                <p className="text-xs text-muted-foreground">Resend in {emailOtpTimer}s</p>
              ) : (
                <Button type="button" variant="link" size="sm" onClick={handleSendEmailOtp} className="text-xs h-auto p-0">Resend</Button>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
        
        {/* Phone & OTP */}
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <div className="flex items-start space-x-2">
            <CountryCodeSelectField control={form.control} name="countryCode" onValueChange={() => form.setValue("phone", "")} className="w-1/3" disabled={phoneOtpSent} />
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
                          <Input placeholder={selectedCountry?.placeholder || "9876543210"} type="tel" className="pl-10" {...field} disabled={phoneOtpSent} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {!phoneOtpVerified ? (
                  <Button type="button" variant="secondary" onClick={handleSendPhoneOtp} disabled={isSendingPhoneOtp || phoneOtpSent}>
                    {isSendingPhoneOtp ? "Sending..." : "Verify"}
                  </Button>
                ) : (
                  <span className="flex items-center text-sm font-medium text-green-600"><Check className="h-4 w-4 mr-1" />Verified</span>
                )}
              </div>
              <FormField control={form.control} name="phone" render={() => <FormMessage className="mt-2" />} />
            </div>
          </div>
        </FormItem>
        {phoneOtpSent && !phoneOtpVerified && (
          <FormItem className="animate-fade-in">
            <FormLabel>Enter 4-Digit OTP for Mobile</FormLabel>
            <FormField control={form.control} name="phoneOtp" render={({ field }) => <FourDigitOtpInput {...field} disabled={isVerifyingPhoneOtp} />} />
            <div className="mt-2 flex items-center justify-between">
              <Button type="button" onClick={handleVerifyPhoneOtp} disabled={isVerifyingPhoneOtp}>{isVerifyingPhoneOtp ? "Verifying..." : "Verify"}</Button>
              {phoneOtpTimer > 0 ? (
                <p className="text-xs text-muted-foreground">Resend in {phoneOtpTimer}s</p>
              ) : (
                <Button type="button" variant="link" size="sm" onClick={handleSendPhoneOtp} className="text-xs h-auto p-0">Resend</Button>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
        
<<<<<<< HEAD
        {/* Category & Specialization */}
=======
=======
        
        {/* Email & OTP */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input placeholder="your@company.com" {...field} disabled={emailOtpSent} />
                </FormControl>
                {!emailOtpVerified ? (
                  <Button type="button" variant="secondary" onClick={handleSendEmailOtp} disabled={isSendingEmailOtp || emailOtpSent}>
                    {isSendingEmailOtp ? "Sending..." : "Verify"}
                  </Button>
                ) : (
                  <span className="flex items-center text-sm font-medium text-green-600"><Check className="h-4 w-4 mr-1" />Verified</span>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {emailOtpSent && !emailOtpVerified && (
          <FormItem className="animate-fade-in">
            <FormLabel>Enter 4-Digit OTP for Email</FormLabel>
            <FormField control={form.control} name="emailOtp" render={({ field }) => <FourDigitOtpInput {...field} disabled={isVerifyingEmailOtp} />} />
            <div className="mt-2 flex items-center justify-between">
              <Button type="button" onClick={handleVerifyEmailOtp} disabled={isVerifyingEmailOtp}>{isVerifyingEmailOtp ? "Verifying..." : "Verify"}</Button>
              {emailOtpTimer > 0 ? (
                <p className="text-xs text-muted-foreground">Resend in {emailOtpTimer}s</p>
              ) : (
                <Button type="button" variant="link" size="sm" onClick={handleSendEmailOtp} className="text-xs h-auto p-0">Resend</Button>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
        
        {/* Phone & OTP */}
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <div className="flex items-start space-x-2">
            <CountryCodeSelectField control={form.control} name="countryCode" onValueChange={() => form.setValue("phone", "")} className="w-1/3" disabled={phoneOtpSent} />
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
                          <Input placeholder={selectedCountry?.placeholder || "9876543210"} type="tel" className="pl-10" {...field} disabled={phoneOtpSent} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {!phoneOtpVerified ? (
                  <Button type="button" variant="secondary" onClick={handleSendPhoneOtp} disabled={isSendingPhoneOtp || phoneOtpSent}>
                    {isSendingPhoneOtp ? "Sending..." : "Verify"}
                  </Button>
                ) : (
                  <span className="flex items-center text-sm font-medium text-green-600"><Check className="h-4 w-4 mr-1" />Verified</span>
                )}
              </div>
              <FormField control={form.control} name="phone" render={() => <FormMessage className="mt-2" />} />
            </div>
          </div>
        </FormItem>
        {phoneOtpSent && !phoneOtpVerified && (
          <FormItem className="animate-fade-in">
            <FormLabel>Enter 4-Digit OTP for Mobile</FormLabel>
            <FormField control={form.control} name="phoneOtp" render={({ field }) => <FourDigitOtpInput {...field} disabled={isVerifyingPhoneOtp} />} />
            <div className="mt-2 flex items-center justify-between">
              <Button type="button" onClick={handleVerifyPhoneOtp} disabled={isVerifyingPhoneOtp}>{isVerifyingPhoneOtp ? "Verifying..." : "Verify"}</Button>
              {phoneOtpTimer > 0 ? (
                <p className="text-xs text-muted-foreground">Resend in {phoneOtpTimer}s</p>
              ) : (
                <Button type="button" variant="link" size="sm" onClick={handleSendPhoneOtp} className="text-xs h-auto p-0">Resend</Button>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
        
        {/* Category & Specialization */}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <FormField
          control={form.control}
          name="vendorCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor Category</FormLabel>
<<<<<<< HEAD
=======
<<<<<<< HEAD
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  handleVendorCategoryChange();
                }} 
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {vendorCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
=======
>>>>>>> 9b0ce35 (Initial commit)
              <Select onValueChange={(value) => { field.onChange(value); form.setValue("specialization", ""); }}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select vendor category" /></SelectTrigger></FormControl>
                <SelectContent>
                  {[...vendorCategories].sort().map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={!selectedVendorCategory}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select specialization" /></SelectTrigger></FormControl>
                <SelectContent>
                  {currentSpecializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
<<<<<<< HEAD
        {/* Passwords */}
        <FormField control={form.control} name="password" render={({ field }) => <PasswordInput field={field} />} />
=======
<<<<<<< HEAD
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
                defaultValue={field.value}
                disabled={!selectedVendorCategory || currentSpecializations.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {currentSpecializations.length > 0 ? (
                    currentSpecializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground text-center">
                      {selectedVendorCategory ? "No specializations available" : "Please select a category first"}
                    </div>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <PasswordInput field={field} />
          )}
        />
        
=======
        {/* Passwords */}
        <FormField control={form.control} name="password" render={({ field }) => <PasswordInput field={field} />} />
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
<<<<<<< HEAD
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                  <Input type={showConfirmPassword ? "text" : "password"} className="pl-10" {...field} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
=======
<<<<<<< HEAD
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10" 
                    {...field} 
                  />
                  <button 
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
=======
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                  <Input type={showConfirmPassword ? "text" : "password"} className="pl-10" {...field} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
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

        {/* Terms and Conditions */}
=======
<<<<<<< HEAD
        {showConfirmPassword && confirmPasswordValue && confirmPasswordValue.trim() !== "" && (
          <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
            <p className="text-xs text-muted-foreground break-all">
              Confirm Password: <span className="font-medium text-foreground">{confirmPasswordValue}</span>
            </p>
          </div>
        )}
        
=======

        {/* Terms and Conditions */}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
<<<<<<< HEAD
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
=======
<<<<<<< HEAD
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-2">
>>>>>>> 9b0ce35 (Initial commit)
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} id="acceptTerms" disabled={!termsClicked} />
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
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} id="acceptTerms" disabled={!termsClicked} />
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
=======
<<<<<<< HEAD
        <Button 
          type="submit" 
          className="w-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150"
          disabled={isSubmitting}
        >
=======
        <Button type="submit" className="w-full" disabled={isSubmitting || !emailOtpVerified || !phoneOtpVerified}>
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
<<<<<<< HEAD
}
=======
<<<<<<< HEAD
}




































function setOtpTimer(arg0: (t: any) => number) {
  throw new Error("Function not implemented.");
}

function setIsSendingOtp(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setOtpSent(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setOtpVerified(arg0: boolean) {
  throw new Error("Function not implemented.");
}
// import { useState, useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Eye, EyeOff, Lock, Phone } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { parsePhoneNumberFromString } from 'libphonenumber-js/min';
// import { registerVendorUser, sendVerificationOtp, confirmVerificationOtp } from "@/services/AuthServices";
// import { countryCodes, CountryCodeSelectField } from "@/components/ui/CountryCodeSelect";
// import { PasswordInput } from "@/components/ui/PasswordInput";
// import { vendorCategories, specializations } from "@/constants/Types";
// import { EmailOTPInput } from "@/components/ui/EmailOTPInput";

// const formSchema = z.object({
//   businessName: z.string().min(1, { message: "Business name is required" }),
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   otp: z.string()
//       .min(6, { message: "OTP must be exactly 6 digits" })
//       .max(6, { message: "OTP must be exactly 6 digits" })
//       .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
//   countryCode: z.string().min(1, { message: "Please select a country code" }),
//   phone: z.string()
//     .min(1, { message: "Phone number is required" })
//     .regex(/^\d*$/, { message: "Phone number must contain digits only" }),
//   phoneOtp: z.string()
//     .min(6, { message: "Phone OTP must be exactly 6 digits" })
//     .max(6, { message: "Phone OTP must be exactly 6 digits" })
//     .regex(/^\d+$/, { message: "Phone OTP must contain only numbers" }),
//   vendorCategory: z.string().min(1, { message: "Vendor category is required" }),
//   specialization: z.string().min(1, { message: "Specialization is required" }),
//   password: z.string().min(8, { message: "Password must be at least 8 characters" }),
//   confirmPassword: z.string(),
//   acceptTerms: z.boolean().refine((value) => value === true, { message: "You must accept the terms and conditions" }),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// })
// .superRefine((data, ctx) => {
//   if (data.countryCode && data.phone && data.phone.trim() !== "") {
//     const selectedCountryObject = countryCodes.find(cc => cc.name === data.countryCode);
//     if (!selectedCountryObject) {
//       ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid country selected.", path: ["countryCode"] });
//       return;
//     }
//     const fullPhoneNumber = `${selectedCountryObject.value}${data.phone}`;
//     try {
//       const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);
//       if (!phoneNumber || !phoneNumber.isValid()) {
//         ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid phone number for the selected country.", path: ["phone"] });
//       }
//     } catch (error) {
//       ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone number parsing error.", path: ["phone"] });
//     }
//   }
// });

// export function VendorForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [emailOtpVerified, setEmailOtpVerified] = useState(false);
//   const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
//   const [phoneOtpSent, setPhoneOtpSent] = useState(false);
//   const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [emailTimer, setEmailTimer] = useState(0);
//   const [phoneTimer, setPhoneTimer] = useState(0);

//   const navigate = useNavigate();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: JSON.parse(localStorage.getItem("vendorForm") || "null") || {
//       businessName: "", 
//       email: "", 
//       otp: "", 
//       countryCode: "", 
//       phone: "",
//       phoneOtp: "",
//       vendorCategory: "", 
//       specialization: "", 
//       password: "",
//       confirmPassword: "", 
//       acceptTerms: false,
//     },
//   });

//   // Persist form data to localStorage
//   useEffect(() => {
//     const sub = form.watch((values) => {
//       localStorage.setItem("vendorForm", JSON.stringify(values));
//     });
//     return () => sub.unsubscribe();
//   }, [form]);

//   const selectedVendorCategory = form.watch("vendorCategory");
//   const selectedCountryName = form.watch("countryCode");
//   const selectedCountry = countryCodes.find(cc => cc.name === selectedCountryName);
//   const emailValue = form.watch("email");
//   const businessNameValue = form.watch("businessName");
//   const confirmPasswordValue = form.watch("confirmPassword");

//   // Timer logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setEmailTimer(t => (t > 0 ? t - 1 : 0));
//       setPhoneTimer(t => (t > 0 ? t - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Email OTP handling
//   const handleSendEmailOtp = async (email: string) => {
//     const isEmailValid = await form.trigger("email");
//     if (!isEmailValid || emailTimer > 0) return;
    
//     setIsSendingEmailOtp(true);
//     try {
//       await sendVerificationOtp(email);
//       setOtpSent(true);
//       setEmailTimer(60);
//       toast.success(`A 6-digit code has been sent to ${email}.`);
//     } catch {
//       toast.error("Failed to send email OTP.");
//     } finally {
//       setIsSendingEmailOtp(false);
//     }
//   };

//   // Phone OTP handling
//   const handleSendPhoneOtp = async () => {
//     const isPhoneValid = await form.trigger(["countryCode", "phone"]);
//     if (!isPhoneValid || phoneTimer > 0) return;
    
//     setIsSendingPhoneOtp(true);
//     try {
//       const country = countryCodes.find(cc => cc.name === form.getValues("countryCode"));
//       const fullPhone = `${country?.value || ""}${form.getValues("phone")}`;
//       await sendVerificationOtp(fullPhone);
//       setPhoneOtpSent(true);
//       setPhoneTimer(60);
//       toast.success("Phone verification code sent!");
//     } catch {
//       toast.error("Failed to send phone OTP.");
//     } finally {
//       setIsSendingPhoneOtp(false);
//     }
//   };

//   // Auto-verify OTPs when they reach 6 digits
//   const autoVerifyOtp = useCallback(async () => {
//     const emailOtp = form.getValues("otp");
//     const phoneOtp = form.getValues("phoneOtp");
//     const email = form.getValues("email");
//     const country = countryCodes.find(cc => cc.name === form.getValues("countryCode"));
//     const phone = `${country?.value || ""}${form.getValues("phone")}`;

//     if (emailOtp.length === 6 && !emailOtpVerified) {
//       try {
//         await confirmVerificationOtp({ type: "email", email, otp: emailOtp });
//         setEmailOtpVerified(true);
//         toast.success("Email verified successfully!");
//       } catch {
//         setEmailOtpVerified(false);
//         toast.error("Invalid email OTP");
//       }
//     }

//     if (phoneOtp.length === 6 && !phoneOtpVerified) {
//       try {
//         await confirmVerificationOtp({ type: "phone", phone, otp: phoneOtp });
//         setPhoneOtpVerified(true);
//         toast.success("Phone verified successfully!");
//       } catch {
//         setPhoneOtpVerified(false);
//         toast.error("Invalid phone OTP");
//       }
//     }

//     setIsOtpVerified(emailOtpVerified && phoneOtpVerified);
//   }, [form, emailOtpVerified, phoneOtpVerified]);

//   // Watch for OTP changes to auto-verify
//   useEffect(() => {
//     const sub = form.watch((values, { name }) => {
//       if (name === "otp" || name === "phoneOtp") {
//         autoVerifyOtp();
//       }
//     });
//     return () => sub.unsubscribe();
//   }, [form, emailOtpVerified, phoneOtpVerified, autoVerifyOtp]);

//   const handleVendorCategoryChange = () => {
//     form.setValue("specialization", "");
//     form.clearErrors("specialization");
//   };

//   const handleCountryCodeSelectionChange = () => {
//     form.setValue("phone", "");
//     form.clearErrors("phone");
//   };

//   const currentSpecializations =
//     selectedVendorCategory && specializations[selectedVendorCategory as keyof typeof specializations]
//       ? specializations[selectedVendorCategory as keyof typeof specializations]
//       : [];

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     if (!isOtpVerified) {
//       toast.error("Please verify both OTPs.");
//       return;
//     }
    
//     setIsSubmitting(true);
//     try {
//       const country = countryCodes.find(cc => cc.name === values.countryCode);
//       const fullPhone = `${country?.value || ""}${values.phone}`;

//       await registerVendorUser({
//         businessName: values.businessName,
//         email: values.email,
//         otp: values.otp,
//         fullPhoneNumber: fullPhone,
//         vendorCategory: values.vendorCategory,
//         specialization: values.specialization,
//         password: values.password,
//       });

//       localStorage.removeItem("vendorForm");
//       toast.success("Sign-up successful! Welcome to diligince.ai");
//       navigate("/signin?role=vendor");
//     } catch (error) {
//       toast.error("Sign-up Failed", {
//         description: error instanceof Error ? error.message : "An unknown error occurred.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
//         <FormField
//           control={form.control}
//           name="businessName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Business Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="e.g. Coastal Services Ltd." {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {businessNameValue && businessNameValue.trim() !== "" && (
//           <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
//             <p className="text-xs text-muted-foreground">
//               Business Name: <span className="font-medium text-foreground">{businessNameValue}</span>
//             </p>
//           </div>
//         )}
        
//         <EmailOTPInput
//           form={form}
//           emailName="email"
//           otpName="otp"
//           onSendCode={handleSendEmailOtp}
//           isSending={isSendingEmailOtp}
//           isEmailDisabled={otpSent}
//           emailTimer={emailTimer}
//         />
//         {emailValue && emailValue.trim() !== "" && (
//           <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
//             <p className="text-xs text-muted-foreground">
//               Email: <span className="font-medium text-foreground">{emailValue}</span>
//             </p>
//           </div>
//         )}
        
//         <FormItem>
//           <FormLabel>Phone Number</FormLabel>
//           <div className="flex items-start space-x-2">
//             <CountryCodeSelectField
//               control={form.control}
//               name="countryCode"
//               onValueChange={handleCountryCodeSelectionChange}
//               className="w-1/3 min-w-[120px]"
//               triggerPlaceholder="Code"
//             />
//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem className="flex-1">
//                   <FormControl>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         placeholder={selectedCountry ? selectedCountry.placeholder : "e.g. 9876543210"}
//                         type="tel"
//                         className="pl-10"
//                         maxLength={selectedCountry?.maxLength}
//                         {...field}
//                         onChange={(e) => {
//                           const numericValue = e.target.value.replace(/\D/g, '');
//                           const maxLength = selectedCountry?.maxLength;
//                           field.onChange(maxLength && numericValue.length > maxLength ? numericValue.slice(0, maxLength) : numericValue);
//                         }}
//                         disabled={phoneOtpSent}
//                       />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="button"
//               variant="secondary"
//               size="sm"
//               onClick={handleSendPhoneOtp}
//               disabled={isSendingPhoneOtp || !selectedCountry || phoneOtpSent}
//             >
//               {isSendingPhoneOtp ? "Sending..." : phoneOtpSent ? "Verified" : "Verify"}
//             </Button>
//           </div>

//           {/* Phone OTP Input */}
//           {phoneOtpSent && (
//             <FormField
//               control={form.control}
//               name="phoneOtp"
//               render={({ field }) => (
//                 <FormItem className="mt-2">
//                   <FormLabel>Phone OTP</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter 6-digit OTP"
//                       maxLength={6}
//                       {...field}
//                       onChange={(e) => {
//                         const otp = e.target.value.replace(/\D/g, '').slice(0, 6);
//                         field.onChange(otp);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           )}
//         </FormItem>
        
//         <FormField
//           control={form.control}
//           name="vendorCategory"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Vendor Category</FormLabel>
//               <Select 
//                 onValueChange={(value) => {
//                   field.onChange(value);
//                   handleVendorCategoryChange();
//                 }} 
//                 defaultValue={field.value}
//                 value={field.value}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select vendor category" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent className="max-h-60 overflow-y-auto">
//                   {vendorCategories.map((category) => (
//                     <SelectItem key={category} value={category}>
//                       {category}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name="specialization"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Specialization</FormLabel>
//               <Select 
//                 onValueChange={field.onChange} 
//                 value={field.value}
//                 defaultValue={field.value}
//                 disabled={!selectedVendorCategory || currentSpecializations.length === 0}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select specialization" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent className="max-h-60 overflow-y-auto">
//                   {currentSpecializations.length > 0 ? (
//                     currentSpecializations.map((spec) => (
//                       <SelectItem key={spec} value={spec}>
//                         {spec}
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <div className="px-2 py-1.5 text-sm text-muted-foreground text-center">
//                       {selectedVendorCategory ? "No specializations available" : "Please select a category first"}
//                     </div>
//                   )}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <PasswordInput field={field} />
//           )}
//         />
        
//         <FormField
//           control={form.control}
//           name="confirmPassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Confirm Password</FormLabel>
//               <FormControl>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input 
//                     type={showConfirmPassword ? "text" : "password"} 
//                     placeholder="••••••••" 
//                     className="pl-10" 
//                     {...field} 
//                   />
//                   <button 
//                     type="button"
//                     tabIndex={-1}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {showConfirmPassword && confirmPasswordValue && confirmPasswordValue.trim() !== "" && (
//           <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
//             <p className="text-xs text-muted-foreground break-all">
//               Confirm Password: <span className="font-medium text-foreground">{confirmPasswordValue}</span>
//             </p>
//           </div>
//         )}
        
//         <FormField
//           control={form.control}
//           name="acceptTerms"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-2">
//               <FormControl>
//                 <Checkbox
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                   id="vendorFormAcceptTerms"
//                 />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel htmlFor="vendorFormAcceptTerms">
//                   I accept the 
//                   <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
//                     terms and conditions
//                   </a>
//                 </FormLabel>
//                 <FormMessage />
//               </div>
//             </FormItem>
//           )}
//         />
        
//         <Button 
//           type="submit" 
//           className="w-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150"
//           disabled={isSubmitting || !isOtpVerified}
//         >
//           {isSubmitting ? "Creating Account..." : "Create Account"}
//         </Button>
        
//         {!isOtpVerified && (
//           <p className="text-center text-sm text-muted-foreground">
//             Please verify both email and phone to create an account.
//           </p>
//         )}
//       </form>
//     </Form>
//   );
// }
=======
}
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
