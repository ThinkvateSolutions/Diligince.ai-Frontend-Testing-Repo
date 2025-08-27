import { useState, useEffect, useRef } from "react";
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
import { Eye, EyeOff, Lock, Phone, Check } from "lucide-react";
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
  countryCode: z.string().min(1, { message: "Please select a country code" }),
  phonenumber: z.string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d*$/, { message: "Phone number must contain digits only" }),
  areaofexpertise: z.string().min(1, { message: "Area of expertise is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((v) => v === true, { message: "You must accept the terms and conditions" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
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
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid phone number for the selected country.", path: ["phonenumber"] });
      }
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone number parsing error.", path: ["phonenumber"] });
    }
  }
});

// --- MAIN PROFESSIONAL FORM COMPONENT ---
export function ProfessionalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      emailOtp: "",
      phoneOtp: "",
      countryCode: "",
      phonenumber: "",
      areaofexpertise: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

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
      return;
    }
    
    setIsSubmitting(true);
    console.log("Form Submitted:", values);
    setTimeout(() => {
        toast.success("Registration successful! Welcome.");
        navigate("/signin?role=professional");
        setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
        <FormField
          control={form.control}
          name="areaofexpertise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area of Expertise</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Select your expertise" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[...expertiseAreas].sort().map((expertise) => (
                    <SelectItem key={expertise} value={expertise}>{expertise}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField control={form.control} name="password" render={({ field }) => (<PasswordInput field={field} />)} />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                  <Input type={showConfirmPassword ? "text" : "password"} className="pl-10" {...field} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Terms and Conditions --- */}
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
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
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting || !emailOtpVerified || !phoneOtpVerified}>
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}

export default ProfessionalForm;