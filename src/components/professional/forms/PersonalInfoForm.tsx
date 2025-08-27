
import { useEffect, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Check, Info } from "lucide-react";
import { countryCodes, CountryCodeSelectField } from "@/components/ui/CountryCodeSelect";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import {
  Edit,
  Mail,
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreatableSelect from "react-select/creatable";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  workRadius: z.string().min(1, { message: "Work radius is required" }),
  primaryExpertise: z.string().min(1, { message: "Primary expertise is required" }),
  bio: z.string().min(50, { message: "Bio must be at least 50 characters" }).max(1000),
  email: z
  .string({ required_error: "Required" })
  .min(1, { message: "Required" }) // catches empty string
  .email({ message: "Invalid email address" }),

  countryCode: z.string().min(1, { message: "Country code is required" }),
  phone: z.string().min(10, { message: "Mobile number must be at least 10 digits" }),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
  location: z.string().min(1, { message: "Location is required" }),
  
  languages: z.array(z.string()).min(1, { message: "At least one language is required" }),
  dailyRate: z.string().min(1, { message: "Daily rate is required" }),
  address1: z.object({
    line1: z.string().min(1, { message: "Address line is required" }),
    state: z.string().min(1, { message: "State is required" }),
    city: z.string().min(1, { message: "City is required" }),
    pincode: z.string().min(5, { message: "Pincode is required" }),
  }),
});

const expertiseOptions = [
  "Automation", "Chemical Engineering", "Civil Engineering", "Electrical Engineering",
  "HVAC", "Instrumentation", "Mechanical Engineering", "Plumbing", "Process Control",
  "Quality Control", "Safety Compliance", "Welding",
];

const workRadiusOptions = [
  "5 km", "10 km", "25 km", "50 km", "100 km", "Anywhere in City",
  "Statewide", "Nationwide", "Remote Only",
];

const languageOptions = [
  "Bengali", "English", "Gujarati", "Hindi", "Kannada",
  "Malayalam", "Marathi", "Punjabi", "Tamil", "Telugu","other",
];
const indianStatesAndCities: Record<string, string[]> = {
  "Andhra Pradesh": [
    "Amaravati",
    "Anantapur",
    "Guntur",
    "Kakinada",
    "Kurnool",
    "Nellore",
    "Rajahmundry",
    "Tirupati",
    "Vijayawada",
    "Visakhapatnam",
    "Vizianagaram"
  ],
  "Arunachal Pradesh": ["Bomdila", "Itanagar", "Naharlagun", "Tawang"],
  "Assam": ["Dibrugarh", "Guwahati", "Jorhat", "Silchar", "Tezpur", "Tinsukia"],
  "Bihar": ["Ara", "Bhagalpur", "Bihar Sharif", "Darbhanga", "Gaya", "Muzaffarpur", "Patna", "Purnia"],
  "Chhattisgarh": ["Bhilai", "Bilaspur", "Durg", "Korba", "Raipur", "Rajnandgaon"],
  "Goa": ["Mapusa", "Margao", "Panaji", "Ponda", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Anand", "Bhavnagar", "Gandhinagar", "Jamnagar", "Rajkot", "Surat", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Faridabad", "Gurugram", "Hisar", "Karnal", "Panipat", "Rohtak", "Sonipat"],
  "Himachal Pradesh": ["Bilaspur", "Dharamshala", "Kullu", "Manali", "Shimla", "Solan"],
  "Jharkhand": ["Bokaro", "Deoghar", "Dhanbad", "Hazaribagh", "Jamshedpur", "Ranchi"],
  "Karnataka": ["Ballari", "Belagavi", "Bengaluru", "Davanagere", "Hubli", "Kalaburagi", "Mangaluru", "Mysuru", "Shivamogga", "Tumakuru"],
  "Kerala": ["Alappuzha", "Kochi", "Kollam", "Kottayam", "Kozhikode", "Palakkad", "Thiruvananthapuram", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Gwalior", "Indore", "Jabalpur", "Ratlam", "Sagar", "Satna", "Ujjain"],
  "Maharashtra": ["Aurangabad", "Kolhapur", "Mumbai", "Nagpur", "Nashik", "Navi Mumbai", "Pimpri-Chinchwad", "Pune", "Solapur", "Thane"],
  "Manipur": ["Imphal"],
  "Meghalaya": ["Shillong", "Tura"],
  "Mizoram": ["Aizawl", "Lunglei"],
  "Nagaland": ["Dimapur", "Kohima", "Mokokchung"],
  "Odisha": ["Balasore", "Bhubaneswar", "Cuttack", "Puri", "Rourkela", "Sambalpur"],
  "Punjab": ["Amritsar", "Bathinda", "Jalandhar", "Ludhiana", "Mohali", "Patiala"],
  "Rajasthan": ["Ajmer", "Alwar", "Bhiwadi", "Bikaner", "Jaipur", "Jodhpur", "Kota", "Udaipur"],
  "Sikkim": ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Erode", "Madurai", "Salem", "Tiruchirappalli", "Tirunelveli", "Vellore"],
  "Telangana": ["Hyderabad", "Karimnagar", "Khammam", "Nizamabad", "Warangal"],
  "Tripura": ["Agartala", "Udaipur"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Bareilly", "Ghaziabad", "Kanpur", "Lucknow", "Meerut", "Noida", "Prayagraj", "Varanasi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani", "Roorkee"],
  "West Bengal": ["Asansol", "Durgapur", "Howrah", "Kolkata", "Siliguri"]
};



const indianStates = Object.keys(indianStatesAndCities).map(state => ({ label: state, value: state }));

const OtpInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}> = ({ value, onChange, length = 4, disabled = false }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const entry = e.target.value;
    if (/^\d$/.test(entry)) {
      const newOtp = value.split('');
      newOtp[index] = entry;
      onChange(newOtp.join('').slice(0, length));
      
      if (entry && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (entry === '') {
      const newOtp = value.split('');
      newOtp[index] = '';
      onChange(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
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

const PersonalInfoForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isDirty } = form.formState;

  const [editMode, setEditMode] = useState(false);
  const [phoneInputsVisible, setPhoneInputsVisible] = useState({
    mobile: true,
    landline: false,
    fax: false,
  });

  // Email verification state
  const [emailVerification, setEmailVerification] = useState({
    isSending: false,
    isVerifying: false,
    showInput: false,
    otp: "",
    timer: 0,
    verified: false,
  });

  // Mobile verification state
  const [mobileVerification, setMobileVerification] = useState({
    isSending: false,
    isVerifying: false,
    showInput: false,
    otp: "",
    timer: 0,
    verified: false,
  });

  const selectedState1 = form.watch("address1.state");
  const citiesForAddress1 = selectedState1
    ? indianStatesAndCities[selectedState1].map(city => ({ label: city, value: city }))
    : [];

  const handlePhoneTypeChange = (type: "landline" | "fax", checked: boolean) => {
    setPhoneInputsVisible(prev => ({ ...prev, [type]: checked }));
  };

  const handleSendEmailOtp = async () => {
    setEmailVerification(prev => ({ ...prev, isSending: true }));
    
    // Simulate sending OTP
    setTimeout(() => {
      setEmailVerification(prev => ({
        ...prev,
        isSending: false,
        showInput: true,
        timer: 30,
      }));
      toast.success("OTP sent to your email");
    }, 1000);
  };

  const handleVerifyEmailOtp = () => {
    setEmailVerification(prev => ({ ...prev, isVerifying: true }));
    
    // Simulate verification - accepts "1234" as valid OTP
    setTimeout(() => {
      if (emailVerification.otp === "1234") {
        setEmailVerification(prev => ({
          ...prev,
          isVerifying: false,
          showInput: false,
          verified: true,
        }));
        toast.success("Email verified successfully");
      } else {
        setEmailVerification(prev => ({
          ...prev,
          isVerifying: false,
          otp: "",
        }));
        toast.error("Invalid OTP. Please try again.");
      }
    }, 1000);
  };

  const handleSendMobileOtp = async () => {
    setMobileVerification(prev => ({ ...prev, isSending: true }));
    
    // Simulate sending OTP
    setTimeout(() => {
      setMobileVerification(prev => ({
        ...prev,
        isSending: false,
        showInput: true,
        timer: 30,
      }));
      toast.success("OTP sent to your mobile");
    }, 1000);
  };
const [showInfo, setShowInfo] = useState(false);
  const handleVerifyMobileOtp = () => {
    setMobileVerification(prev => ({ ...prev, isVerifying: true }));
    
    // Simulate verification - accepts "1234" as valid OTP
    setTimeout(() => {
      if (mobileVerification.otp === "1234") {
        setMobileVerification(prev => ({
          ...prev,
          isVerifying: false,
          showInput: false,
          verified: true,
        }));
        toast.success("Mobile verified successfully");
      } else {
        setMobileVerification(prev => ({
          ...prev,
          isVerifying: false,
          otp: "",
        }));
        toast.error("Invalid OTP. Please try again.");
      }
    }, 1000);
  };
const handleCountryCodeSelectionChange = () => {
    form.setValue("phone", "");
    form.clearErrors("phone");
  };
  useEffect(() => {
    if (emailVerification.timer <= 0) return;
    const interval = setInterval(() => {
      setEmailVerification(prev => ({ ...prev, timer: prev.timer - 1 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [emailVerification.timer]);

  useEffect(() => {
    if (mobileVerification.timer <= 0) return;
    const interval = setInterval(() => {
      setMobileVerification(prev => ({ ...prev, timer: prev.timer - 1 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [mobileVerification.timer]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`http://localhost:8000/api/personal-info?userId=${userId}`);
      form.reset(res.data);
      setEmailVerification(prev => ({ ...prev, verified: true }));
      setMobileVerification(prev => ({ ...prev, verified: true }));
    };
    fetchProfile();
  }, [form, userId]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!emailVerification.verified) {
      toast.error("Please verify your email first");
      return;
    }
    if (!mobileVerification.verified) {
      toast.error("Please verify your mobile number first");
      return;
    }
    await axios.post("/api/profile", values);
    toast.success("Profile updated");
    setEditMode(false);
  }

  return (
    <>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
      <div className="flex items-center mb-2">
        <CardTitle className="mr-2">Personal Info</CardTitle>
        <Info
          className="w-6 h-6 text-black opacity-70 hover:opacity-100 cursor-pointer transition"
          onClick={() => setShowInfo(!showInfo)}
        />
      </div>
      {showInfo && (
        <div className="text-sm text-muted-foreground mb-2">
         Update your details
        </div>
      )}
      
    </div>
        {!editMode && (
          <Button onClick={() => setEditMode(true)} variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Rama Krishna" {...field} disabled={!editMode} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             <FormField
      control={form.control}
      name="workRadius"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Work Radius</FormLabel>
          <ShadcnSelect
            disabled={!editMode}
            onValueChange={field.onChange}
            value={field.value || undefined}
          >
            
              <SelectTrigger
              className="text-gray-900 data-[placeholder]:text-gray-400">
                <SelectValue placeholder="How far are you willing to travel?" />
                </SelectTrigger>

            
            <SelectContent>
              {workRadiusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </ShadcnSelect>
          <FormMessage />
        </FormItem>
      )}
    />

            </div>
            
 <FormField
  control={form.control}
  name="primaryExpertise"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Primary Expertise</FormLabel>
      <ShadcnSelect disabled={!editMode} onValueChange={field.onChange} value={field.value}>
        <FormControl>
                      <SelectTrigger
                      className="text-gray-900 data-[placeholder]:text-gray-400">
              <SelectValue placeholder="Select your expertise" />
            </SelectTrigger>

        </FormControl>
        <SelectContent>
          {expertiseOptions.map(opt => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
      <FormMessage />
    </FormItem>
  )}
/>

 <FormField
  control={form.control}
  name="bio"
  render={({ field }) => {
    const wordCount = field.value?.length || 0;
    const maxWords = 1000;

    return (
      <FormItem>
  <FormLabel>Professional Bio</FormLabel>
  <FormControl>
    <div>
      <Textarea
        placeholder="Describe your professional background, expertise, and key accomplishments (50-1000 words)"
        className="min-h-32"
        {...field}
        disabled={!editMode}
      />
      <div className="flex justify-between mt-1 text-sm min-h-5">
        {/* Reserve space for message even if not shown */}
        <div className="text-red-500">
          <FormMessage />
        </div>
        <div className="text-muted-foreground">
          {wordCount}/{maxWords}
        </div>
      </div>
    </div>
  </FormControl>
</FormItem>

    );
  }}
/>

            <div className="space-y-1">
  <FormLabel className="flex items-center">
    Email
    {emailVerification.verified && (
      <Badge className="bg-green-100 text-green-600 hover:bg-green-200 flex items-center space-x-1 ml-2">
        <Check className="h-3 w-3" />
        <span>Verified</span>
      </Badge>
    )}
  </FormLabel>

  {/* Flex row for input + button */}
  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-2 space-y-2 sm:space-y-0">
    {/* Email field with fixed min height for FormMessage */}
    <div className="flex-grow">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="email"
                placeholder="e.g your.email@example.com"
                {...field}
                disabled={!editMode || emailVerification.showInput}
              />
            </FormControl>

            {/* Reserve vertical space for FormMessage */}
            <div className="min-h-[20px] mt-1 text-sm text-red-600">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>

    {/* Button aligned top with input */}
    {editMode && !emailVerification.verified && (
      <Button
        type="button"
        className="whitespace-nowrap w-full sm:w-auto bg-[#6A1B9A] hover:bg-[#4A148C] sm:mt-[28px]" // align with input bottom
        onClick={handleSendEmailOtp}
        disabled={emailVerification.isSending || emailVerification.timer > 0}
      >
        {emailVerification.isSending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : emailVerification.timer > 0 ? (
          `Resend in ${emailVerification.timer}s`
        ) : emailVerification.showInput ? (
          'Resend OTP'
        ) : (
          'Verify'
        )}
      </Button>
    )}
  </div>


              
              {emailVerification.showInput && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md border space-y-2">
                  <label className="text-sm font-medium">Enter 4-Digit OTP for Email</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                    <OtpInput
                      value={emailVerification.otp}
                      onChange={(otp) => setEmailVerification(prev => ({ ...prev, otp }))}
                      length={4}
                      disabled={emailVerification.isVerifying}
                    />
                    <Button
                      type="button"
                      className="w-full sm:w-auto bg-[#6A1B9A] hover:bg-[#4A148C]"
                      onClick={handleVerifyEmailOtp}
                      disabled={emailVerification.isVerifying || emailVerification.otp.length !== 4}
                    >
                      {emailVerification.isVerifying ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <FormLabel>Contact Numbers</FormLabel>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={phoneInputsVisible.mobile}
                    disabled
                  />
                  <label>Mobile</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={phoneInputsVisible.landline}
                    onCheckedChange={(c) => handlePhoneTypeChange("landline", !!c)}
                    disabled={!editMode}
                  />
                  <label>Landline</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={phoneInputsVisible.fax}
                    onCheckedChange={(c) => handlePhoneTypeChange("fax", !!c)}
                    disabled={!editMode}
                  />
                  <label>Fax</label>
                </div>
              </div>

              
                {phoneInputsVisible.mobile && (
                  <div className="space-y-1">
                    
                    <FormLabel className="flex items-center">
                      
                      <Phone className="w-4 h-4 mr-2 mb-2 mt-4" /><div className="mt-2"> Mobile</div>
                      {mobileVerification.verified && <Badge className="bg-green-100 text-green-600 hover:bg-green-200 flex items-center space-x-1 ml-2">
      <Check className="h-3 w-3" />
      <span>Verified</span>
    </Badge>}
                    </FormLabel>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-2 space-y-2 sm:space-y-0">
  <div className="relative flex-1 flex gap-2">
    {/* Country Code Field */}
    <FormField
      control={form.control}
      name="countryCode"
      render={({ field }) => (
        <FormItem className="w-[120px]">
          <FormControl>
            <CountryCodeSelectField
              control={form.control}
              name="countryCode"
              onValueChange={handleCountryCodeSelectionChange}
              triggerPlaceholder="ISD"
              disabled={!editMode || mobileVerification.showInput}
            />
          </FormControl>

          {/* Reserve height for message */}
          {/* <div className="min-h-[20px] mt-1 text-sm text-red-600">
            <FormMessage />
          </div> */}
        </FormItem>
      )}
    />

    {/* Phone Number Field */}
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <Input
              placeholder="e.g 9876543210"
              {...field}
              disabled={!editMode || mobileVerification.showInput}
            />
          </FormControl>

          {/* Reserve height for message */}
          <div className="min-h-[20px] mt-1 text-sm text-red-600">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  </div>

  {/* Verify Button */}
  {editMode && !mobileVerification.verified && (
    <Button
      type="button"
      className="w-full sm:w-auto bg-[#6A1B9A] hover:bg-[#4A148C] sm:mt-[28px]" // Adjust to match input height if needed
      onClick={handleSendMobileOtp}
      disabled={mobileVerification.isSending || mobileVerification.timer > 0}
    >
      {mobileVerification.isSending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : mobileVerification.timer > 0 ? (
        `Resend in ${mobileVerification.timer}s`
      ) : mobileVerification.showInput ? (
        'Resend OTP'
      ) : (
        'Verify'
      )}
    </Button>
  )}
</div>

                    {mobileVerification.showInput && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-md border space-y-2">
                        <label className="text-sm font-medium">Enter 4-Digit OTP for Mobile</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                          <OtpInput
                            value={mobileVerification.otp}
                            onChange={(otp) => setMobileVerification(prev => ({ ...prev, otp }))}
                            length={4}
                            disabled={mobileVerification.isVerifying}
                          />
                          <Button
                            type="button"
                            className="w-full sm:w-auto hover:bg-[#4A148C]"
                            onClick={handleVerifyMobileOtp}
                            disabled={mobileVerification.isVerifying || mobileVerification.otp.length !== 4}
                          >
                            {mobileVerification.isVerifying ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Verify OTP"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {phoneInputsVisible.landline && (
                  <FormField
                    control={form.control}
                    name="phone1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Landline</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g 022 12345678" {...field} disabled={!editMode} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {phoneInputsVisible.fax && (
                  <FormField
                    control={form.control}
                    name="phone2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fax</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g 022 87654321" {...field} disabled={!editMode} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            

            <div className="space-y-4 border rounded-md p-4">
              <FormLabel className="text-base font-semibold">Primary Address </FormLabel>
              <FormField
                control={form.control}
                name="address1.line1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input placeholder="e.g D.no 5-14, near Ambedkar Statue" {...field} disabled={!editMode} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="address1.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <ShadcnSelect
                        disabled={!editMode}
                        onValueChange={(val) => {
                          field.onChange(val);
                          form.setValue("address1.city", "");
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                          className="text-gray-900 data-[placeholder]:text-gray-400">
                            <SelectValue placeholder="Select State" />
                            </SelectTrigger>

                        </FormControl>
                        <SelectContent>
                          {indianStates.map(state => (
                            <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </ShadcnSelect>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address1.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <ShadcnSelect
                        disabled={!editMode || !selectedState1}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {citiesForAddress1.map(city => (
                            <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </ShadcnSelect>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address1.pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN Code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 528521" {...field} disabled={!editMode} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0">
  <div className="flex-1">
    <FormField
      control={form.control}
      name="languages"
      render={() => (
        <FormItem>
          <FormLabel>Languages</FormLabel>
          <FormControl>
            <Controller
              control={form.control}
              name="languages"
              render={({ field }) => (
                <CreatableSelect
                  isMulti
                  isDisabled={!editMode}
                  options={languageOptions.map((lang) => ({
                    value: lang,
                    label: lang,
                  }))}
                  value={field.value?.map((val) => ({
                    value: val,
                    label: val,
                  }))}
                  onChange={(selected) =>
                    field.onChange(selected.map((opt) => opt.value))
                  }
                  placeholder="Select or add languages..."
                  menuPlacement="top"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: !editMode ? "white" : "white",
                      borderColor: state.isFocused ? "#000" : "#d1d5db",
                      boxShadow: state.isFocused ? "0 0 0 1px #000" : "none",
                      "&:hover": { borderColor: "#00000" },
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}

                />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>

  
</div>


            <div className="flex justify-end space-x-4 pt-4">
              {editMode && (
                <Button type="submit" className="bg-[#6A1B9A] text-white hover:bg-[#4A148C]">Save</Button>
              )}
              {editMode && (
                <Button

                  variant="outline"
                  type="button"
                  disabled={!isDirty}
                  onClick={() => {
                    form.reset();
                    toast.info("Changes reverted.");
                    setEditMode(false);
                    setShowEmailOtpInput(false);
                    setEmailOtp("");
                    setEmailTimer(0);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default PersonalInfoForm;  