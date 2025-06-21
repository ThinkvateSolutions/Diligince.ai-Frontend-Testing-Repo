import { useState, useEffect } from "react";
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
import { Eye, EyeOff, Lock, Phone ,Check} from "lucide-react";
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
import { 
  sendVerificationOtp, 
  confirmVerificationOtp,
  registerProfessionalUser
} from '@/services/AuthServices';
import { otppayload } from '@/services/AuthServices';
import axios from 'axios';

const formSchema = z.object({
  fullname: z.string().min(1, { message: "Company name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  otp: z.string()
    .min(4, { message: "OTP must be exactly 4 digits" })
    .max(4, { message: "OTP must be exactly 4 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
  countryCode: z.string().min(1, { message: "Please select a country code" }),
  phonenumber: z.string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d*$/, { message: "Phone number must contain digits only" }),
  areaofexpertise: z.string().min(1, { message: "Industry type is required" }),
  
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((v) => v === true, { message: "You must accept the terms and conditions" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
.refine(
  (data) => data.areaofexpertise !== "Others" ,
  { message: "Please specify your industry type", path: ["customIndustryType"] }
)
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
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid phone number for the selected country.", path: ["phone"] });
      }
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone number parsing error.", path: ["phone"] });
    }
  }
});

export function ProfessionalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
   const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: JSON.parse(localStorage.getItem("ProfessionalForm") || "null") || {
      fullname: "",
      email: "",
     
      countryCode: "",
      phonenumber: "",
      areaofexpertise: "",
      
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const fullNameValue = form.watch("fullname");
  const emailValue = form.watch("email");
  const selectedCountry = countryCodes.find(
    (cc) => cc.name === form.watch("countryCode")
  );
  const showCustomIndustryField = form.watch("areaofexpertise") === "Others";

  useEffect(() => {
    const sub = form.watch((values) => {
      localStorage.setItem("industryForm", JSON.stringify(values));
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

  // UPDATED: Renamed to handleVerifyOtp and added loading state + form error handling
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

  // NEW: Function to allow user to edit email
    const handleEditEmail = () => {
  setOtpSent(false);
  setOtpVerified(false);
  setOtpTimer(0);
  form.setValue("otp", "");
  form.clearErrors("otp");
  form.setFocus("email");
};

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!otpVerified) {
      toast.error('Please verify your email first');
      return;
    }
    
    setIsSubmitting(true);
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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
        {/* Company Name */}
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Steel Industries Ltd." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fullNameValue?.trim() !== "" && (
          <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
            <p className="text-xs text-muted-foreground">
              Full Name: <span className="font-medium text-foreground">{fullNameValue}</span>
            </p>
          </div>
        )}

        {/* Email */}
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
            disabled={otpSent} // Disable immediately after OTP is sent
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
            {isSendingOtp ? "Sending..." : "Send Code"}
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
      {/* OTP Input - shown only after OTP is sent */}
{otpSent && (
  <FormField
    control={form.control}
    name="otp"
    render={({ field }) => (
      <FormItem className="animate-fade-in">
        <FormLabel>Verification Code</FormLabel>
        <div className="flex gap-2">
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
)}
      <FormMessage />
    </FormItem>
  )}
/>

        {/* Phone Number */}
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <div className="flex items-start space-x-2">
            <CountryCodeSelectField
              control={form.control}
              name="countryCode"
              onValueChange={handleCountryCodeSelectionChange}
              className="w-1/3 min-w-[120px]"
              triggerPlaceholder="Code"
            />
            <FormField
              control={form.control}
              name="phonenumber"
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
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/\D/g, '');
                          const maxLength = selectedCountry?.maxLength;
                          field.onChange(maxLength && numericValue.length > maxLength ? numericValue.slice(0, maxLength) : numericValue);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormItem>

        {/* Industry Type */}
        <FormField
          control={form.control}
          name="areaofexpertise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area of Expertise</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your expertise type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {expertiseAreas.map((expertise) => (
                    <SelectItem key={expertise} value={expertise}>
                      {expertise}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

       
        

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <PasswordInput field={field} />
          )}
        />

        {/* Confirm Password */}
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
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Accept Terms */}
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
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="acceptTerms">
                  I accept the
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                    terms and conditions
                  </a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

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
      </form>
    </Form>
  );
}
























function setIsVerifyingOtp(arg0: boolean) {
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
