<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
=======
<<<<<<< HEAD
import { useState, useEffect } from "react";
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
import { parsePhoneNumberFromString } from 'libphonenumber-js';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { countryCodes, CountryCodeSelectField } from "@/components/ui/CountryCodeSelect";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { expertiseAreas } from "@/constants/Types";
<<<<<<< HEAD
// Note: Simulating auth services for this example
// import { 
//   sendVerificationOtp, 
//   confirmVerificationOtp,
//   registerProfessionalUser
// } from '@/services/AuthServices';
=======
<<<<<<< HEAD
import { 
  sendVerificationOtp, 
  confirmVerificationOtp,
  registerProfessionalUser
} from '@/services/AuthServices';
import { otppayload } from '@/services/AuthServices';
import axios from 'axios';
>>>>>>> 9b0ce35 (Initial commit)

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


// --- ZOD SCHEMA ---
const formSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
<<<<<<< HEAD
  emailOtp: z.string().optional(),
  phoneOtp: z.string().optional(),
=======
  otp: z.string()
    .min(4, { message: "OTP must be exactly 4 digits" })
    .max(4, { message: "OTP must be exactly 4 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
=======
// Note: Simulating auth services for this example
// import { 
//   sendVerificationOtp, 
//   confirmVerificationOtp,
//   registerProfessionalUser
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


// --- ZOD SCHEMA ---
const formSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  emailOtp: z.string().optional(),
  phoneOtp: z.string().optional(),
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  countryCode: z.string().min(1, { message: "Please select a country code" }),
  phonenumber: z.string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d*$/, { message: "Phone number must contain digits only" }),
<<<<<<< HEAD
  areaofexpertise: z.string().min(1, { message: "Area of expertise is required" }),
=======
<<<<<<< HEAD
  areaofexpertise: z.string().min(1, { message: "Industry type is required" }),
  
=======
  areaofexpertise: z.string().min(1, { message: "Area of expertise is required" }),
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((v) => v === true, { message: "You must accept the terms and conditions" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
<<<<<<< HEAD
=======
<<<<<<< HEAD
.refine(
  (data) => data.areaofexpertise !== "Others" ,
  { message: "Please specify your industry type", path: ["customIndustryType"] }
)
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
.superRefine((data, ctx) => {
  if (data.countryCode && data.phonenumber.trim() !== "") {
    const selectedCountry = countryCodes.find(cc => cc.name === data.countryCode);
    if (!selectedCountry) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid country selected.", path: ["countryCode"] });
      return;
    }
    const fullPhone = `${selectedCountry.value}${data.phonenumber}`;
    try {
      const phoneNumber = parsePhoneNumberFromString(fullPhone);
      if (!phoneNumber || !phoneNumber.isValid()) {
<<<<<<< HEAD
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid phone number for the selected country.", path: ["phonenumber"] });
      }
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone number parsing error.", path: ["phonenumber"] });
=======
<<<<<<< HEAD
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid phone number for the selected country.", path: ["phone"] });
      }
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone number parsing error.", path: ["phone"] });
=======
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid phone number for the selected country.", path: ["phonenumber"] });
      }
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone number parsing error.", path: ["phonenumber"] });
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
    }
  }
});

<<<<<<< HEAD
// --- MAIN PROFESSIONAL FORM COMPONENT ---
=======
<<<<<<< HEAD
>>>>>>> 9b0ce35 (Initial commit)
export function ProfessionalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

<<<<<<< HEAD
=======
=======
// --- MAIN PROFESSIONAL FORM COMPONENT ---
export function ProfessionalForm() {
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
=======
<<<<<<< HEAD
    defaultValues: JSON.parse(localStorage.getItem("ProfessionalForm") || "null") || {
>>>>>>> 9b0ce35 (Initial commit)
      fullname: "",
      email: "",
      emailOtp: "",
      phoneOtp: "",
      countryCode: "",
      phonenumber: "",
      areaofexpertise: "",
<<<<<<< HEAD
=======
      
=======
    defaultValues: {
      fullname: "",
      email: "",
      emailOtp: "",
      phoneOtp: "",
      countryCode: "",
      phonenumber: "",
      areaofexpertise: "",
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const fullNameValue = form.watch("fullname");
  const emailValue = form.watch("email");
>>>>>>> 9b0ce35 (Initial commit)
  const selectedCountry = countryCodes.find(
    (cc) => cc.name === form.watch("countryCode")
  );

  // Timers
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (emailOtpTimer > 0) {
      interval = setInterval(() => setEmailOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [emailOtpTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phoneOtpTimer > 0) {
      interval = setInterval(() => setPhoneOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [phoneOtpTimer]);

  // --- Email OTP ---
  const handleSendEmailOtp = async () => {
    const isEmailValid = await form.trigger("email");
    if (!isEmailValid) return;
    if (emailOtpTimer > 0) return;

    setIsSendingEmailOtp(true);
    setTimeout(() => {
      setEmailOtpSent(true);
      setEmailOtpTimer(30);
      toast.success(`OTP (1234) sent to ${form.getValues("email")}`);
      setIsSendingEmailOtp(false);
    }, 500);
  };
  
  const handleVerifyEmailOtp = async () => {
    const otp = form.getValues("emailOtp");
    if (otp?.length !== 4) return;
    
    setIsVerifyingEmailOtp(true);
    setTimeout(() => {
      if (otp === "1234") {
        setEmailOtpVerified(true);
        toast.success('Email verified!');
      } else {
        toast.error("Invalid Email OTP.");
        form.setError("emailOtp", { message: "Invalid OTP" });
      }
      setIsVerifyingEmailOtp(false);
    }, 500);
  };

  // --- Phone OTP ---
  const handleSendPhoneOtp = async () => {
    const isPhoneValid = await form.trigger(["countryCode", "phonenumber"]);
    if (!isPhoneValid) return;
    if (phoneOtpTimer > 0) return;

    setIsSendingPhoneOtp(true);
    setTimeout(() => {
      setPhoneOtpSent(true);
      setPhoneOtpTimer(30);
      toast.success(`OTP (1234) sent to ${form.getValues("phonenumber")}`);
      setIsSendingPhoneOtp(false);
    }, 500);
  };
  
  const handleVerifyPhoneOtp = async () => {
    const otp = form.getValues("phoneOtp");
     if (otp?.length !== 4) return;
    
    setIsVerifyingPhoneOtp(true);
    setTimeout(() => {
      if (otp === "1234") {
        setPhoneOtpVerified(true);
        toast.success('Phone verified!');
      } else {
        toast.error("Invalid Phone OTP.");
        form.setError("phoneOtp", { message: "Invalid OTP" });
      }
      setIsVerifyingPhoneOtp(false);
    }, 500);
  };
  
  // --- Form Submit ---
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
<<<<<<< HEAD
    if (!emailOtpVerified || !phoneOtpVerified) {
      toast.error('Please verify both email and phone number.');
=======
    if (!otpVerified) {
      toast.error('Please verify your email first');
=======
  const selectedCountry = countryCodes.find(
    (cc) => cc.name === form.watch("countryCode")
  );

  // Timers
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (emailOtpTimer > 0) {
      interval = setInterval(() => setEmailOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [emailOtpTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phoneOtpTimer > 0) {
      interval = setInterval(() => setPhoneOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [phoneOtpTimer]);

  // --- Email OTP ---
  const handleSendEmailOtp = async () => {
    const isEmailValid = await form.trigger("email");
    if (!isEmailValid) return;
    if (emailOtpTimer > 0) return;

    setIsSendingEmailOtp(true);
    setTimeout(() => {
      setEmailOtpSent(true);
      setEmailOtpTimer(30);
      toast.success(`OTP (1234) sent to ${form.getValues("email")}`);
      setIsSendingEmailOtp(false);
    }, 500);
  };
  
  const handleVerifyEmailOtp = async () => {
    const otp = form.getValues("emailOtp");
    if (otp?.length !== 4) return;
    
    setIsVerifyingEmailOtp(true);
    setTimeout(() => {
      if (otp === "1234") {
        setEmailOtpVerified(true);
        toast.success('Email verified!');
      } else {
        toast.error("Invalid Email OTP.");
        form.setError("emailOtp", { message: "Invalid OTP" });
      }
      setIsVerifyingEmailOtp(false);
    }, 500);
  };

  // --- Phone OTP ---
  const handleSendPhoneOtp = async () => {
    const isPhoneValid = await form.trigger(["countryCode", "phonenumber"]);
    if (!isPhoneValid) return;
    if (phoneOtpTimer > 0) return;

    setIsSendingPhoneOtp(true);
    setTimeout(() => {
      setPhoneOtpSent(true);
      setPhoneOtpTimer(30);
      toast.success(`OTP (1234) sent to ${form.getValues("phonenumber")}`);
      setIsSendingPhoneOtp(false);
    }, 500);
  };
  
  const handleVerifyPhoneOtp = async () => {
    const otp = form.getValues("phoneOtp");
     if (otp?.length !== 4) return;
    
    setIsVerifyingPhoneOtp(true);
    setTimeout(() => {
      if (otp === "1234") {
        setPhoneOtpVerified(true);
        toast.success('Phone verified!');
      } else {
        toast.error("Invalid Phone OTP.");
        form.setError("phoneOtp", { message: "Invalid OTP" });
      }
      setIsVerifyingPhoneOtp(false);
    }, 500);
  };
  
  // --- Form Submit ---
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!emailOtpVerified || !phoneOtpVerified) {
      toast.error('Please verify both email and phone number.');
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
      return;
    }
    
    setIsSubmitting(true);
<<<<<<< HEAD
=======
<<<<<<< HEAD
    try {
     
      const country = countryCodes.find(cc => cc.name === values.countryCode);
      const fullPhone = `${country?.value || ""}${values.phonenumber}`;

      await registerProfessionalUser({
        fullname: values.fullname,
        email: values.email,
       
        phonenumber: fullPhone,
        areaofexpertise: values.areaofexpertise,
        password: values.password,
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

  const handleCountryCodeSelectionChange = (newCountryNameValue: string) => {
    form.setValue("phonenumber", "");
    form.clearErrors("phonenumber");
=======
>>>>>>> 9b0ce35 (Initial commit)
    console.log("Form Submitted:", values);
    setTimeout(() => {
        toast.success("Registration successful! Welcome.");
        navigate("/signin?role=professional");
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
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
<<<<<<< HEAD
                <Input placeholder="e.g. John Doe" {...field} />
=======
<<<<<<< HEAD
                <Input placeholder="e.g. Steel Industries Ltd." {...field} />
=======
                <Input placeholder="e.g. John Doe" {...field} />
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<<<<<<< HEAD
        
        {/* --- Email & OTP Section --- */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input placeholder="your@email.com" {...field} disabled={emailOtpSent} />
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
=======
<<<<<<< HEAD
        {/* {fullNameValue?.trim() !== "" && (
          <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
            <p className="text-xs text-muted-foreground">
              Full Name: <span className="font-medium text-foreground">{fullNameValue}</span>
            </p>
          </div>
        )} */}
>>>>>>> 9b0ce35 (Initial commit)

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

        {/* --- Phone Number & OTP Section --- */}
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <div className="flex items-start space-x-2">
            <CountryCodeSelectField control={form.control} name="countryCode" onValueChange={() => form.setValue("phonenumber", "")} className="w-1/3" disabled={phoneOtpSent} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="phonenumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input type="tel" className="pl-10" {...field} disabled={phoneOtpSent} />
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
              <FormField control={form.control} name="phonenumber" render={() => <FormMessage className="mt-2"/>} />
            </div>
          </div>
        </FormItem>

<<<<<<< HEAD
=======
        {/* Industry Type */}
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
                  <Input placeholder="your@email.com" {...field} disabled={emailOtpSent} />
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

        {/* --- Phone Number & OTP Section --- */}
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <div className="flex items-start space-x-2">
            <CountryCodeSelectField control={form.control} name="countryCode" onValueChange={() => form.setValue("phonenumber", "")} className="w-1/3" disabled={phoneOtpSent} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="phonenumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input type="tel" className="pl-10" {...field} disabled={phoneOtpSent} />
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
              <FormField control={form.control} name="phonenumber" render={() => <FormMessage className="mt-2"/>} />
            </div>
          </div>
        </FormItem>

>>>>>>> 9b0ce35 (Initial commit)
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

        {/* --- Other Fields --- */}
<<<<<<< HEAD
=======
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
        <FormField
          control={form.control}
          name="areaofexpertise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area of Expertise</FormLabel>
<<<<<<< HEAD
              <Select onValueChange={field.onChange} value={field.value}>
=======
<<<<<<< HEAD
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  
                }}
                value={field.value}
              >
>>>>>>> 9b0ce35 (Initial commit)
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Select your expertise" /></SelectTrigger>
                </FormControl>
<<<<<<< HEAD
                <SelectContent>
                  {[...expertiseAreas].sort().map((expertise) => (
                    <SelectItem key={expertise} value={expertise}>{expertise}</SelectItem>
=======
                <SelectContent className="max-h-60 overflow-y-auto">
                  {expertiseAreas.map((expertise) => (
                    <SelectItem key={expertise} value={expertise}>
                      {expertise}
                    </SelectItem>
=======
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Select your expertise" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[...expertiseAreas].sort().map((expertise) => (
                    <SelectItem key={expertise} value={expertise}>{expertise}</SelectItem>
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

        {!otpVerified && otpSent && (
          <p className="text-center text-sm text-muted-foreground">
            Please verify your email to continue.
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
<<<<<<< HEAD

export default ProfessionalForm;
=======
<<<<<<< HEAD
export default ProfessionalForm;























// function setIsVerifyingOtp(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
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
// import { registerProfessionalUser, sendVerificationOtp, confirmVerificationOtp } from "@/services/AuthServices";
// import { countryCodes, CountryCodeSelectField } from "@/components/ui/CountryCodeSelect";
// import { PasswordInput } from "@/components/ui/PasswordInput";
// import { expertiseAreas } from "@/constants/Types";
// import { EmailOTPInput } from "@/components/ui/EmailOTPInput";

// const formSchema = z.object({
//   fullName: z.string().min(2, "Full name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   otp: z.string().length(6, "OTP must be 6 digits"),
//   countryCode: z.string().nonempty("Country code is required"),
//   phone: z.string().min(6, "Phone number is too short"),
//   phoneOtp: z.string().length(6, "Phone OTP must be 6 digits"),
//   expertise: z.string().nonempty("Please select an area of expertise"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   confirmPassword: z.string().min(8),
//   acceptTerms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

// export function ProfessionalForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [emailOtpVerified, setEmailOtpVerified] = useState(false);
//   const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
//   const [phoneOtpSent, setPhoneOtpSent] = useState(false);
//   const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [otpError, setOtpError] = useState<string | null>(null);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [emailTimer, setEmailTimer] = useState(0);
//   const [phoneTimer, setPhoneTimer] = useState(0);

//   const navigate = useNavigate();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: JSON.parse(localStorage.getItem("professionalForm") || "null") || {
//       fullName: "",
//       email: "",
//       otp: "",
//       countryCode: "",
//       phone: "",
//       phoneOtp: "",
//       expertise: "",
//       password: "",
//       confirmPassword: "",
//       acceptTerms: false,
//     },
//   });

//   useEffect(() => {
//     const sub = form.watch((values) => {
//       localStorage.setItem("professionalForm", JSON.stringify(values));
//     });
//     return () => sub.unsubscribe();
//   }, [form]);

//   const fullNameValue = form.watch("fullName");
//   const emailValue = form.watch("email");
//   const confirmPasswordValue = form.watch("confirmPassword");
//   const selectedCountry = countryCodes.find(cc => cc.name === form.watch("countryCode"));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setEmailTimer(t => (t > 0 ? t - 1 : 0));
//       setPhoneTimer(t => (t > 0 ? t - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSendOtp = async (email: string) => {
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

//   useEffect(() => {
//     const sub = form.watch((values, { name }) => {
//       if (name === "otp" || name === "phoneOtp") {
//         autoVerifyOtp();
//       }
//     });
//     return () => sub.unsubscribe();
//   }, [form, emailOtpVerified, phoneOtpVerified, autoVerifyOtp]);

//   const verifyBothOtps = async () => {
//     if (!emailOtpVerified || !phoneOtpVerified) {
//       toast.error("Please enter valid OTPs for email and phone.");
//     } else {
//       setIsOtpVerified(true);
//     }
//   };

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     if (!isOtpVerified) {
//       toast.error("Please verify both OTPs.");
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const country = countryCodes.find(cc => cc.name === values.countryCode);
//       const fullPhone = `${country?.value || ""}${values.phone}`;

//       await registerProfessionalUser({
//         fullName: values.fullName,
//         email: values.email,
//         otp: values.otp,
//         fullPhoneNumber: fullPhone,
//         expertise: values.expertise,
//         password: values.password,
//       });

//       localStorage.removeItem("professionalForm");
//       toast.success("Sign-up successful! Welcome to diligince.ai");
//       navigate("/signin?role=professional");
//     } catch (error) {
//       toast.error("Sign-up Failed", {
//         description: error instanceof Error ? error.message : "An unknown error occurred.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCountryCodeSelectionChange = (newCountryNameValue: string) => {
//     form.setValue("phone", "");
//     form.clearErrors("phone");
//   };



//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
//         <FormField
//           control={form.control}
//           name="fullName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Full Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="e.g. Rahul Sharma" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {fullNameValue && fullNameValue.trim() !== "" && (
//           <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
//             <p className="text-xs text-muted-foreground">
//               Full Name: <span className="font-medium text-foreground">{fullNameValue}</span>
//             </p>
//           </div>
//         )}

//         <EmailOTPInput
//           form={form}
//           emailName="email"
//           otpName="otp"
//           onSendCode={handleSendOtp}
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

// <FormItem>
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
//           name="expertise"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Area of Expertise</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select your area of expertise" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent className="max-h-60 overflow-y-auto">
//                   {expertiseAreas.map((expertise) => (
//                     <SelectItem key={expertise} value={expertise}>
//                       {expertise}
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
//                   id="professionalAcceptTerms"
//                 />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel htmlFor="professionalAcceptTerms">
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
//           disabled={isSubmitting || !otpSent}
//         >
//           {isSubmitting ? "Creating Account..." : "Create Account"}
//         </Button>
//         {!otpSent && (
//           <p className="text-center text-sm text-muted-foreground">
//             Please verify your email to create an account.
//           </p>
//         )}
//       </form>
//     </Form>
//   );
// }
=======

export default ProfessionalForm;
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
