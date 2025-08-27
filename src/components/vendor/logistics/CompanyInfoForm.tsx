<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
=======
<<<<<<< HEAD
import { useState } from "react";
>>>>>>> 9b0ce35 (Initial commit)
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Building, Mail, Phone, Calendar, MapPin, CheckCircle2, XCircle, Loader2, AlertTriangle, Edit, PlusCircle, Trash2, Info, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";
import { Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { CountryCodeSelectField } from "@/components/ui/CountryCodeSelect"; // Restored this import
import * as api from "@/services/ServiceCompanyApi";

// --- Data & Constants ---
const indianStatesAndCities: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"], "Arunachal Pradesh": ["Itanagar", "Naharlagun"], "Assam": ["Guwahati", "Dibrugarh"], "Bihar": ["Patna", "Gaya"], "Chhattisgarh": ["Raipur", "Bhilai"], "Goa": ["Panaji", "Margao"], "Gujarat": ["Ahmedabad", "Surat", "Vadodara"], "Haryana": ["Faridabad", "Gurugram"], "Himachal Pradesh": ["Shimla", "Manali"], "Jharkhand": ["Ranchi", "Jamshedpur"], "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"], "Kerala": ["Thiruvananthapuram", "Kochi"], "Madhya Pradesh": ["Indore", "Bhopal"], "Maharashtra": ["Mumbai", "Pune", "Nagpur"], "Manipur": ["Imphal"], "Meghalaya": ["Shillong"], "Mizoram": ["Aizawl"], "Nagaland": ["Kohima", "Dimapur"], "Odisha": ["Bhubaneswar", "Cuttack"], "Punjab": ["Ludhiana", "Amritsar"], "Rajasthan": ["Jaipur", "Jodhpur"], "Sikkim": ["Gangtok"], "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"], "Telangana": ["Hyderabad", "Warangal"], "Tripura": ["Agartala"], "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida"], "Uttarakhand": ["Dehradun", "Haridwar"], "West Bengal": ["Kolkata", "Howrah", "Siliguri"]
};
const indianStates = Object.keys(indianStatesAndCities).map(state => ({ label: state, value: state }));
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const phoneCharRegex = /^\+?[\d\s-()]*$/;


// --- Helper Components & Types ---
interface OtpInputProps { value: string; onChange: (value: string) => void; length: number; disabled?: boolean; }
const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, length, disabled }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => { const entry = e.target.value; if (/^\d$/.test(entry) || entry === "") { const newOtp = value.split(''); newOtp[index] = entry; onChange(newOtp.join('').slice(0, length)); if (entry && index < length - 1) { inputRefs.current[index + 1]?.focus(); } } };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => { if (e.key === "Backspace" && !value[index] && index > 0) { inputRefs.current[index - 1]?.focus(); } };
  return (<div className="flex items-center space-x-2">{Array.from({ length }).map((_, index) => (<Input key={index} ref={(el) => (inputRefs.current[index] = el)} type="tel" inputMode="numeric" maxLength={1} value={value[index] || ""} onChange={(e) => handleInputChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} disabled={disabled} className="w-12 h-12 text-center text-lg font-semibold" />))}</div>);
};


const optionalPhoneValidation = z.string().optional().or(z.literal("")).refine((value) => { if (!value) return true; if (!phoneCharRegex.test(value)) return false; const digits = value.replace(/\D/g, ''); return digits.length >= 7 && digits.length <= 15; }, { message: "Please enter a valid number with 7 to 15 digits." });


//original code
//const phoneValidation = z.string().optional().or(z.literal("")).refine((value) => { if (!value) return true; if (!phoneCharRegex.test(value)) return false; const digits = value.replace(/\D/g, ''); return digits.length >= 7 && digits.length <= 15; }, { message: "Please enter a valid number with 7 to 15 digits." });

//modified for exactly 10 number feature
const phoneValidation = z.string().optional().or(z.literal("")).refine((value) => {
  if (!value) return true;
  if (!phoneCharRegex.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return digits.length === 10; // Require exactly 10 digits
}, { message: "Please enter a valid number with exactly 10 digits." });

const addressSchema = z.object({
  id: z.string().optional(),
  line1: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(1, { message: "Please select a city" }),
  state: z.string().min(1, { message: "Please select a state" }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Please enter a valid 6-digit pincode" }),
  isPrimary: z.boolean().default(false).optional(),
});
const companySchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  industryFocus: z.array(z.string()).min(1, { message: "At least one industry focus is required" }),
  companyDescription: z.string().min(10, "Description must be at least 10 characters").max(500, "Description cannot exceed 500 characters"),
  gstNumber: z.string().refine((value) => !value || gstRegex.test(value), { message: "Invalid GST Number format." }).optional(),
  registrationNumber: z.string().min(5, { message: "Registration number is required" }).max(22, { message: "Registration number cannot exceed 22 characters" }).regex(/^[A-Za-z0-9]*$/, { message: "Registration number can only contain alphanumeric characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  telephone: optionalPhoneValidation,
  mobile: phoneValidation,
  fax: optionalPhoneValidation,
  countryCode: z.string().optional(),
  addresses: z.array(addressSchema).min(1, "At least one address is required.").refine((addresses) => addresses.filter(addr => addr.isPrimary).length === 1, { message: "Exactly one address must be marked as primary.", path: ["addresses"], }),
  yearEstablished: z.string().min(4, { message: "Please enter a valid year" }),
  logisticsServices: z.array(z.string()).min(1, { message: "At least one service type is required" }),
}).refine(data => data.telephone || data.mobile || data.fax, { message: "At least one phone number is required.", path: ["telephone"] });

type FormValues = z.infer<typeof companySchema>;

const industryOptions = [ { label: "Manufacturing", value: "manufacturing" }, { label: "Oil & Gas", value: "oil-gas" }, { label: "Construction", value: "construction" }, { label: "Mining", value: "mining" }, { label: "Pharmaceuticals", value: "pharmaceuticals" }, { label: "Automotive", value: "automotive" }, { label: "Chemical", value: "chemical" } ].sort((a, b) => a.label.localeCompare(b.label));
const logisticsServiceOptions = [ { label: "Full Truckload (FTL)", value: "ftl" }, { label: "Less-than-Truckload (LTL)", value: "ltl" }, { label: "Heavy Haul & ODC", value: "heavy_haul" }, { label: "Warehousing & Storage", value: "warehousing" } ].sort((a, b) => a.label.localeCompare(b.label));
const phoneTypes = [ { id: 'mobile', label: 'Mobile' }, { id: 'telephone', label: 'Landline' }, { id: 'fax', label: 'Fax' } ];
const defaultValues: FormValues = {
  companyName: "TransLog India Pvt Ltd", industryFocus: ["manufacturing", "oil-gas"], companyDescription: "TransLog India provides specialized logistics and transportation services for heavy machinery, industrial equipment, and oversized cargo across India.", gstNumber: "29ABCDE1234F1Z5", registrationNumber: "U12345AB2010PTC123456", email: "contact@translogindia.com", telephone: "", mobile: "9876543210", fax: "", countryCode: "+91",
  addresses: [{ id: '1', line1: "123 Industrial Transport Hub, MIDC Area", city: "Mumbai", state: "Maharashtra", pincode: "400072", isPrimary: true, }],
  yearEstablished: "2010", logisticsServices: ["ftl", "heavy_haul"],
};

export const CompanyInfoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
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
  const [initialData, setInitialData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({ resolver: zodResolver(companySchema), defaultValues, mode: "onChange" });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "addresses", keyName: "id" });

  useEffect(() => { setInitialData(defaultValues); form.reset(defaultValues); }, [form]);
  useEffect(() => { if (emailTimer <= 0) return; const i = setInterval(() => setEmailTimer(p => p - 1), 1000); return () => clearInterval(i); }, [emailTimer]);
  useEffect(() => { if (mobileTimer <= 0) return; const i = setInterval(() => setMobileTimer(p => p - 1), 1000); return () => clearInterval(i); }, [mobileTimer]);
  useEffect(() => { const sub = form.watch((_, { name }) => { if (!isEditing) return; if (name === 'gstNumber') setGstVerificationStatus('idle'); if (name === 'registrationNumber') setRegNoVerificationStatus('idle'); if (name === 'email') { setEmailVerified(false); setShowEmailOtpInput(false); } if (name === 'mobile') { setMobileVerified(false); setShowMobileOtpInput(false); } }); return () => sub.unsubscribe(); }, [form, isEditing]);

  const handleVerifyGst = async () => { if (!(await form.trigger("gstNumber"))) return; setIsVerifyingGst(true); setTimeout(() => { setGstVerificationStatus('success'); setVerifiedGstData({ legalName: "DUMMY TRANSLOG INDIA" }); toast.success("GSTIN verified!"); setIsVerifyingGst(false); }, 1500); };
  const handleVerifyRegNo = async () => { if (!(await form.trigger("registrationNumber"))) return; setIsVerifyingRegNo(true); setTimeout(() => { setRegNoVerificationStatus('success'); toast.success("Registration Number verified!"); setIsVerifyingRegNo(false); }, 1500); };
  const handleSendOtp = async (type: 'email' | 'mobile') => { if (!(await form.trigger(type))) return; const action = type === 'email' ? setIsSendingEmailOtp : setIsSendingMobileOtp; action(true); setTimeout(() => { action(false); (type === 'email' ? setShowEmailOtpInput : setShowMobileOtpInput)(true); (type === 'email' ? setEmailTimer : setMobileTimer)(30); toast.success(`OTP sent to your ${type}!`); }, 1000); };
  const handleVerifyOtp = async (type: 'email' | 'mobile') => { if ((type === 'email' ? emailOtp : mobileOtp) !== '1234') return toast.error("Invalid OTP."); const action = type === 'email' ? setIsVerifyingEmailOtp : setIsVerifyingMobileOtp; action(true); setTimeout(() => { (type === 'email' ? setEmailVerified : setMobileVerified)(true); (type === 'email' ? setShowEmailOtpInput : setShowMobileOtpInput)(false); toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} verified!`); action(false); }, 1000); };
  
  const onSubmit = (values: FormValues) => {
    if (isEditing && (!emailVerified || (form.getValues("mobile") && !mobileVerified))) { toast.error("Please verify email and mobile before saving."); return; }
    setIsSubmitting(true);
    setTimeout(() => { console.log("Form values:", values); setIsSubmitting(false); setIsEditing(false); toast.success("Company information updated!"); form.reset(values); }, 1000);
  };
  
  const handleCancel = () => { if (initialData) { form.reset(initialData); } setIsEditing(false); setGstVerificationStatus('idle'); setRegNoVerificationStatus('idle'); setEmailVerified(true); setMobileVerified(true); };
  const onFormError = (errors: any) => { console.error("Form Errors:", errors); toast.error("Please correct the highlighted errors."); if(errors.addresses?.message) toast.error(errors.addresses.message); };
  const handlePhoneTypeChange = (id: 'telephone' | 'mobile' | 'fax', checked: boolean) => { if (!isEditing) return; form.setValue(id, checked ? "" : undefined, { shouldValidate: true }); if (id === 'mobile' && !checked) { setMobileVerified(false); setShowMobileOtpInput(false); } };
  const handleAddAddress = () => append({ line1: "", city: "", state: "", pincode: "", isPrimary: fields.length === 0 });
  const handleRemoveAddress = (index: number) => { if (fields.length <= 1) return toast.error("At least one address is required."); const current = form.getValues("addresses"); if (current[index].isPrimary && current.length > 1) { form.setValue(`addresses.${index === 0 ? 1 : 0}.isPrimary`, true); } remove(index); form.trigger("addresses"); };
  const handleSetPrimary = (selectedIndex: number) => { fields.forEach((_, i) => form.setValue(`addresses.${i}.isPrimary`, i === selectedIndex, { shouldValidate: true, shouldDirty: true })); };
  const handleCountryCodeChange = () => { form.setValue("mobile", ""); form.clearErrors("mobile"); };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2"><CardTitle className="text-xl font-bold text-gray-800">Company Information</CardTitle><Info className="w-5 h-5 text-black opacity-70 hover:opacity-100 cursor-pointer" onClick={() => setShowInfo(!showInfo)} /></div>
            {showInfo && <p className="text-sm text-muted-foreground mt-1">{isEditing ? "Update your logistics company details." : "View your company details."}</p>}
          </div>
          {!isEditing && <Button variant="outline" onClick={() => setIsEditing(true)}><Edit className="mr-1 h-4 w-4" /> Edit</Button>}
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="companyName" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Company Name</FormLabel><div className="relative"><Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="Enter company name" className="pl-10" {...field} disabled={!isEditing} /></FormControl></div><FormMessage /></FormItem> )} />
              <FormField control={form.control} name="yearEstablished" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Year Established</FormLabel><div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="e.g., 2010" className="pl-10" {...field} disabled={!isEditing} onChange={(e) => { const filtered = e.target.value.replace(/[^0-9]/g, ''); field.onChange(filtered); }} /></FormControl></div><FormMessage /></FormItem> )} />
            </div>
            <FormField control={form.control} name="industryFocus" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Industries Served</FormLabel><FormControl>{isEditing ? (<MultiSelect options={industryOptions} selected={field.value} onChange={field.onChange} placeholder="Select industries you serve" />) : (<div className="flex flex-wrap gap-2 min-h-[40px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm">{field.value.length > 0 ? field.value.map(val => <div key={val} className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">{industryOptions.find(o => o.value === val)?.label || val}</div>) : <span className="text-muted-foreground">No industries selected</span>}</div>)}</FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="companyDescription" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Company Description</FormLabel><FormControl><Textarea placeholder="Describe your logistics services and expertise" className="min-h-32" {...field} maxLength={500} disabled={!isEditing} /></FormControl><FormDescription className="text-right">{field.value?.length || 0} / 500</FormDescription><FormMessage /></FormItem> )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="gstNumber" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">GST Number</FormLabel><div className="flex items-center space-x-2"><FormControl><Input placeholder="Enter GST number" {...field} value={field.value ?? ""} disabled={!isEditing} /></FormControl>{isEditing && <Button type="button" onClick={handleVerifyGst} disabled={isVerifyingGst || !field.value} className="bg-[#eb2f96] hover:bg-[#c4257d]">{isVerifyingGst ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}</Button>}</div><div className="mt-2 text-sm min-h-[20px]">{gstVerificationStatus === 'success' && verifiedGstData && ( <div className="flex items-center text-green-600"> <CheckCircle2 className="h-4 w-4 mr-2" /> <span>Verified: <strong>{verifiedGstData.legalName}</strong></span> </div> )}{gstVerificationStatus === 'not_found' && ( <div className="flex items-center text-yellow-600"> <AlertTriangle className="h-4 w-4 mr-2" /> <span>GSTIN not found.</span> </div> )}{gstVerificationStatus === 'error' && ( <div className="flex items-center text-red-600"> <XCircle className="h-4 w-4 mr-2" /> <span>Verification failed.</span> </div> )}</div><FormMessage /></FormItem> )} />
              <FormField control={form.control} name="registrationNumber" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Registration Number</FormLabel><div className="flex items-center space-x-2"><FormControl><Input placeholder="Enter registration number" {...field} disabled={!isEditing} /></FormControl>{isEditing && <Button type="button" onClick={handleVerifyRegNo} disabled={isVerifyingRegNo || !field.value} className="bg-[#eb2f96] hover:bg-[#c4257d]">{isVerifyingRegNo ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}</Button>}</div><div className="mt-2 text-sm min-h-[20px]">{regNoVerificationStatus === 'success' && (<div className="flex items-center text-green-600"><CheckCircle2 className="h-4 w-4 mr-2" /><span>Verified successfully.</span></div>)}{regNoVerificationStatus === 'error' && (<div className="flex items-center text-red-600"><XCircle className="h-4 w-4 mr-2" /><span>Verification failed.</span></div>)}</div><FormMessage /></FormItem> )} />
            </div>
            <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel className="flex items-center text-foreground">Email {emailVerified && <Badge className="bg-green-100 text-green-600 hover:bg-green-200 flex items-center space-x-1 ml-2"><Check className="h-3 w-3" /><span>Verified</span></Badge>}</FormLabel><div className="flex items-center space-x-2"><div className="relative flex-grow"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="Enter business email" className="pl-10" {...field} disabled={!isEditing || showEmailOtpInput} /></FormControl></div>{isEditing && !emailVerified && <Button className="bg-yellow-600 text-white hover:bg-yellow-700" type="button" onClick={() => handleSendOtp('email')} disabled={isSendingEmailOtp || emailTimer > 0}>{isSendingEmailOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : emailTimer > 0 ? `Resend in ${emailTimer}s` : 'Verify'}</Button>}</div><FormMessage />{showEmailOtpInput && <div className="mt-2 p-3 bg-gray-50 rounded-md border space-y-2"><FormLabel>Enter 4-Digit OTP</FormLabel><div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0"><OtpInput value={emailOtp} onChange={setEmailOtp} length={4} disabled={isVerifyingEmailOtp} /><Button type="button" onClick={() => handleVerifyOtp('email')} disabled={isVerifyingEmailOtp || emailOtp.length !== 4}>{isVerifyingEmailOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}</Button></div></div>}</FormItem> )} />
            <div className="space-y-2">
              <FormLabel className="text-foreground">Contact Numbers</FormLabel>
              <div className="flex items-center space-x-4 pt-2">{phoneTypes.map(p => <div key={p.id} className="flex items-center space-x-2"><Checkbox id={p.id} checked={form.watch(p.id) !== undefined} onCheckedChange={c => handlePhoneTypeChange(p.id, !!c)} disabled={!isEditing} /><label htmlFor={p.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{p.label}</label></div>)}</div>
              {form.watch('mobile') !== undefined && <FormField control={form.control} name="mobile" render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-foreground pt-4">Mobile{mobileVerified && <Badge className="bg-green-100 text-green-600 hover:bg-green-200 flex items-center space-x-1 ml-2"><Check className="h-3 w-3" /><span>Verified</span></Badge>}</FormLabel>
                  <div className="flex items-center space-x-2">
                    <CountryCodeSelectField className="w-" control={form.control} name="countryCode" onValueChange={handleCountryCodeChange} disabled={!isEditing} triggerPlaceholder="India(+91)" />
                    <div className="relative flex-grow"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="9876543210" {...field} value={field.value ?? ""} disabled={!isEditing || showMobileOtpInput} className="pl-10" onChange={(e) => { const filtered = e.target.value.replace(/[^0-9]/g, ''); field.onChange(filtered); }} /></FormControl></div>
                    {isEditing && !mobileVerified && <Button type="button" className="bg-[#eb2f96] hover:bg-[#c4257d] text-white " onClick={() => handleSendOtp('mobile')} disabled={isSendingMobileOtp || mobileTimer > 0 || !field.value}>{isSendingMobileOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : mobileTimer > 0 ? `Resend in ${mobileTimer}s` : 'Verify'}</Button>}
                  </div>
                  <FormMessage />
                  {showMobileOtpInput && <div className="mt-2 p-3 bg-gray-50 rounded-md border space-y-2"><FormLabel>Enter 4-Digit OTP</FormLabel><div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0"><OtpInput value={mobileOtp} onChange={setMobileOtp} length={4} disabled={isVerifyingMobileOtp} /><Button className="bg-[#eb2f96] hover:bg-[#c4257d]" type="button" onClick={() => handleVerifyOtp('mobile')} disabled={isVerifyingMobileOtp || mobileOtp.length !== 4}>{isVerifyingMobileOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}</Button></div></div>}
                </FormItem>
              )} />}
              {form.watch('telephone') !== undefined && <FormField control={form.control} name="telephone" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Landline (Optional)</FormLabel><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="022-23456789" {...field} value={field.value ?? ""} disabled={!isEditing} className="pl-10" onChange={(e) => { const filtered = e.target.value.replace(/[^0-9-+\s()]/g, ''); field.onChange(filtered); }} /></FormControl></div><FormMessage /></FormItem> )} />}
              {form.watch('fax') !== undefined && <FormField control={form.control} name="fax" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Fax (Optional)</FormLabel><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="Enter fax number" {...field} value={field.value ?? ""} disabled={!isEditing} className="pl-10" onChange={(e) => { const filtered = e.target.value.replace(/[^0-9-+\s()]/g, ''); field.onChange(filtered); }} /></FormControl></div><FormMessage /></FormItem> )} />}
            </div>
            <div className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">Company Addresses</FormLabel>
              {fields.map((field, index) => {
                 const selectedState = form.watch(`addresses.${index}.state`);
                 const cities = selectedState ? (indianStatesAndCities[selectedState] || []).map(c => ({ label: c, value: c })) : [];
                 return (
                  <div key={field.id} className="space-y-4 rounded-md border p-4 relative bg-slate-50/50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-x-4">
                        <h4 className="text-base font-semibold text-foreground">Address {index + 1}</h4>
                        {!isEditing && form.getValues(`addresses.${index}.isPrimary`) && <div className="flex items-center text-sm font-semibold text-green-700 bg-green-100/60 rounded-full px-3 py-1"><CheckCircle2 className="h-4 w-4 mr-2" />Primary Address</div>}
                        {isEditing && <FormField control={form.control} name={`addresses.${index}.isPrimary`} render={({ field: f }) => <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><Checkbox checked={f.value} onCheckedChange={() => handleSetPrimary(index)} /></FormControl><FormLabel className="font-normal cursor-pointer text-sm">Set as Primary</FormLabel></FormItem>} />}
                      </div>
                      {isEditing && <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-100" onClick={() => handleRemoveAddress(index)} disabled={fields.length <= 1}><Trash2 className="h-4 w-4" /></Button>}
                    </div>
                    <FormField control={form.control} name={`addresses.${index}.line1`} render={({ field: f }) => <FormItem><FormLabel className="text-foreground">Address Line</FormLabel><FormControl><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Plot/Building/Street" {...f} disabled={!isEditing} className="pl-10" /></div></FormControl><FormMessage /></FormItem>} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField control={form.control} name={`addresses.${index}.state`} render={({ field: f }) => <FormItem><FormLabel className="text-foreground">State</FormLabel><Select onValueChange={v => {f.onChange(v); form.setValue(`addresses.${index}.city`, "");}} value={f.value} disabled={!isEditing}><FormControl><SelectTrigger><SelectValue placeholder="Select state"/></SelectTrigger></FormControl><SelectContent>{indianStates.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>} />
                      <FormField control={form.control} name={`addresses.${index}.city`} render={({ field: f }) => <FormItem><FormLabel className="text-foreground">City</FormLabel><Select onValueChange={f.onChange} value={f.value} disabled={!isEditing || !selectedState}><FormControl><SelectTrigger><SelectValue placeholder="Select city"/></SelectTrigger></FormControl><SelectContent>{cities.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>} />
                      <FormField control={form.control} name={`addresses.${index}.pincode`} render={({ field: f }) => <FormItem><FormLabel className="text-foreground">PIN Code</FormLabel><FormControl><Input placeholder="e.g., 400001" {...f} disabled={!isEditing} onChange={(e) => { const filtered = e.target.value.replace(/[^0-9]/g, '').slice(0, 6); f.onChange(filtered); }} /></FormControl><FormMessage /></FormItem>} />
                    </div>
                  </div>
                 )
              })}
              {isEditing && <Button type="button" variant="outline" className="w-full" onClick={handleAddAddress}><PlusCircle className="mr-2 h-4 w-4" />Add Another Address</Button>}
              <FormMessage>{form.formState.errors.addresses?.message}</FormMessage>
            </div>
           <FormField control={form.control} name="logisticsServices" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Types of Logistics Services Offered</FormLabel>
                  <FormControl>
                    {isEditing ? (
                      <MultiSelect options={logisticsServiceOptions} selected={field.value} onChange={field.onChange} placeholder="Select services you provide" />
                    ) : (
                       <div className="flex flex-wrap gap-2 min-h-[40px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm">{field.value.length > 0 ? field.value.map(val => <div key={val} className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">{logisticsServiceOptions.find(o => o.value === val)?.label || val}</div>) : <span className="text-muted-foreground">No services selected</span>}</div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )} />
          </CardContent>
          {isEditing && (
            <CardFooter className="flex justify-end gap-2 border-t bg-gray-50/50 px-6 py-4">
              <Button type="submit" disabled={isSubmitting} className="bg-[#eb2f96] hover:bg-[#c4257d]">
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save"}
              </Button>
              <Button variant="outline" type="button" disabled={isSubmitting} onClick={handleCancel}>Cancel</Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
<<<<<<< HEAD
};
=======
};
=======
import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Building, Mail, Phone, Calendar, MapPin, CheckCircle2, XCircle, Loader2, AlertTriangle, Edit, PlusCircle, Trash2, Info, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";
import { Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { CountryCodeSelectField } from "@/components/ui/CountryCodeSelect"; // Restored this import
import * as api from "@/services/ServiceCompanyApi";

// --- Data & Constants ---
const indianStatesAndCities: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"], "Arunachal Pradesh": ["Itanagar", "Naharlagun"], "Assam": ["Guwahati", "Dibrugarh"], "Bihar": ["Patna", "Gaya"], "Chhattisgarh": ["Raipur", "Bhilai"], "Goa": ["Panaji", "Margao"], "Gujarat": ["Ahmedabad", "Surat", "Vadodara"], "Haryana": ["Faridabad", "Gurugram"], "Himachal Pradesh": ["Shimla", "Manali"], "Jharkhand": ["Ranchi", "Jamshedpur"], "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"], "Kerala": ["Thiruvananthapuram", "Kochi"], "Madhya Pradesh": ["Indore", "Bhopal"], "Maharashtra": ["Mumbai", "Pune", "Nagpur"], "Manipur": ["Imphal"], "Meghalaya": ["Shillong"], "Mizoram": ["Aizawl"], "Nagaland": ["Kohima", "Dimapur"], "Odisha": ["Bhubaneswar", "Cuttack"], "Punjab": ["Ludhiana", "Amritsar"], "Rajasthan": ["Jaipur", "Jodhpur"], "Sikkim": ["Gangtok"], "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"], "Telangana": ["Hyderabad", "Warangal"], "Tripura": ["Agartala"], "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida"], "Uttarakhand": ["Dehradun", "Haridwar"], "West Bengal": ["Kolkata", "Howrah", "Siliguri"]
};
const indianStates = Object.keys(indianStatesAndCities).map(state => ({ label: state, value: state }));
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const phoneCharRegex = /^\+?[\d\s-()]*$/;


// --- Helper Components & Types ---
interface OtpInputProps { value: string; onChange: (value: string) => void; length: number; disabled?: boolean; }
const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, length, disabled }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => { const entry = e.target.value; if (/^\d$/.test(entry) || entry === "") { const newOtp = value.split(''); newOtp[index] = entry; onChange(newOtp.join('').slice(0, length)); if (entry && index < length - 1) { inputRefs.current[index + 1]?.focus(); } } };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => { if (e.key === "Backspace" && !value[index] && index > 0) { inputRefs.current[index - 1]?.focus(); } };
  return (<div className="flex items-center space-x-2">{Array.from({ length }).map((_, index) => (<Input key={index} ref={(el) => (inputRefs.current[index] = el)} type="tel" inputMode="numeric" maxLength={1} value={value[index] || ""} onChange={(e) => handleInputChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} disabled={disabled} className="w-12 h-12 text-center text-lg font-semibold" />))}</div>);
};


const optionalPhoneValidation = z.string().optional().or(z.literal("")).refine((value) => { if (!value) return true; if (!phoneCharRegex.test(value)) return false; const digits = value.replace(/\D/g, ''); return digits.length >= 7 && digits.length <= 15; }, { message: "Please enter a valid number with 7 to 15 digits." });


//original code
//const phoneValidation = z.string().optional().or(z.literal("")).refine((value) => { if (!value) return true; if (!phoneCharRegex.test(value)) return false; const digits = value.replace(/\D/g, ''); return digits.length >= 7 && digits.length <= 15; }, { message: "Please enter a valid number with 7 to 15 digits." });

//modified for exactly 10 number feature
const phoneValidation = z.string().optional().or(z.literal("")).refine((value) => {
  if (!value) return true;
  if (!phoneCharRegex.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return digits.length === 10; // Require exactly 10 digits
}, { message: "Please enter a valid number with exactly 10 digits." });

const addressSchema = z.object({
  id: z.string().optional(),
  line1: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(1, { message: "Please select a city" }),
  state: z.string().min(1, { message: "Please select a state" }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Please enter a valid 6-digit pincode" }),
  isPrimary: z.boolean().default(false).optional(),
});
const companySchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  industryFocus: z.array(z.string()).min(1, { message: "At least one industry focus is required" }),
  companyDescription: z.string().min(10, "Description must be at least 10 characters").max(500, "Description cannot exceed 500 characters"),
  gstNumber: z.string().refine((value) => !value || gstRegex.test(value), { message: "Invalid GST Number format." }).optional(),
  registrationNumber: z.string().min(5, { message: "Registration number is required" }).max(22, { message: "Registration number cannot exceed 22 characters" }).regex(/^[A-Za-z0-9]*$/, { message: "Registration number can only contain alphanumeric characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  telephone: optionalPhoneValidation,
  mobile: phoneValidation,
  fax: optionalPhoneValidation,
  countryCode: z.string().optional(),
  addresses: z.array(addressSchema).min(1, "At least one address is required.").refine((addresses) => addresses.filter(addr => addr.isPrimary).length === 1, { message: "Exactly one address must be marked as primary.", path: ["addresses"], }),
  yearEstablished: z.string().min(4, { message: "Please enter a valid year" }),
  logisticsServices: z.array(z.string()).min(1, { message: "At least one service type is required" }),
}).refine(data => data.telephone || data.mobile || data.fax, { message: "At least one phone number is required.", path: ["telephone"] });

type FormValues = z.infer<typeof companySchema>;

const industryOptions = [ { label: "Manufacturing", value: "manufacturing" }, { label: "Oil & Gas", value: "oil-gas" }, { label: "Construction", value: "construction" }, { label: "Mining", value: "mining" }, { label: "Pharmaceuticals", value: "pharmaceuticals" }, { label: "Automotive", value: "automotive" }, { label: "Chemical", value: "chemical" } ].sort((a, b) => a.label.localeCompare(b.label));
const logisticsServiceOptions = [ { label: "Full Truckload (FTL)", value: "ftl" }, { label: "Less-than-Truckload (LTL)", value: "ltl" }, { label: "Heavy Haul & ODC", value: "heavy_haul" }, { label: "Warehousing & Storage", value: "warehousing" } ].sort((a, b) => a.label.localeCompare(b.label));
const phoneTypes = [ { id: 'mobile', label: 'Mobile' }, { id: 'telephone', label: 'Landline' }, { id: 'fax', label: 'Fax' } ];
const defaultValues: FormValues = {
  companyName: "TransLog India Pvt Ltd", industryFocus: ["manufacturing", "oil-gas"], companyDescription: "TransLog India provides specialized logistics and transportation services for heavy machinery, industrial equipment, and oversized cargo across India.", gstNumber: "29ABCDE1234F1Z5", registrationNumber: "U12345AB2010PTC123456", email: "contact@translogindia.com", telephone: "", mobile: "9876543210", fax: "", countryCode: "+91",
  addresses: [{ id: '1', line1: "123 Industrial Transport Hub, MIDC Area", city: "Mumbai", state: "Maharashtra", pincode: "400072", isPrimary: true, }],
  yearEstablished: "2010", logisticsServices: ["ftl", "heavy_haul"],
};

export const CompanyInfoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
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
  const [initialData, setInitialData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({ resolver: zodResolver(companySchema), defaultValues, mode: "onChange" });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "addresses", keyName: "id" });

  useEffect(() => { setInitialData(defaultValues); form.reset(defaultValues); }, [form]);
  useEffect(() => { if (emailTimer <= 0) return; const i = setInterval(() => setEmailTimer(p => p - 1), 1000); return () => clearInterval(i); }, [emailTimer]);
  useEffect(() => { if (mobileTimer <= 0) return; const i = setInterval(() => setMobileTimer(p => p - 1), 1000); return () => clearInterval(i); }, [mobileTimer]);
  useEffect(() => { const sub = form.watch((_, { name }) => { if (!isEditing) return; if (name === 'gstNumber') setGstVerificationStatus('idle'); if (name === 'registrationNumber') setRegNoVerificationStatus('idle'); if (name === 'email') { setEmailVerified(false); setShowEmailOtpInput(false); } if (name === 'mobile') { setMobileVerified(false); setShowMobileOtpInput(false); } }); return () => sub.unsubscribe(); }, [form, isEditing]);

  const handleVerifyGst = async () => { if (!(await form.trigger("gstNumber"))) return; setIsVerifyingGst(true); setTimeout(() => { setGstVerificationStatus('success'); setVerifiedGstData({ legalName: "DUMMY TRANSLOG INDIA" }); toast.success("GSTIN verified!"); setIsVerifyingGst(false); }, 1500); };
  const handleVerifyRegNo = async () => { if (!(await form.trigger("registrationNumber"))) return; setIsVerifyingRegNo(true); setTimeout(() => { setRegNoVerificationStatus('success'); toast.success("Registration Number verified!"); setIsVerifyingRegNo(false); }, 1500); };
  const handleSendOtp = async (type: 'email' | 'mobile') => { if (!(await form.trigger(type))) return; const action = type === 'email' ? setIsSendingEmailOtp : setIsSendingMobileOtp; action(true); setTimeout(() => { action(false); (type === 'email' ? setShowEmailOtpInput : setShowMobileOtpInput)(true); (type === 'email' ? setEmailTimer : setMobileTimer)(30); toast.success(`OTP sent to your ${type}!`); }, 1000); };
  const handleVerifyOtp = async (type: 'email' | 'mobile') => { if ((type === 'email' ? emailOtp : mobileOtp) !== '1234') return toast.error("Invalid OTP."); const action = type === 'email' ? setIsVerifyingEmailOtp : setIsVerifyingMobileOtp; action(true); setTimeout(() => { (type === 'email' ? setEmailVerified : setMobileVerified)(true); (type === 'email' ? setShowEmailOtpInput : setShowMobileOtpInput)(false); toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} verified!`); action(false); }, 1000); };
  
  const onSubmit = (values: FormValues) => {
    if (isEditing && (!emailVerified || (form.getValues("mobile") && !mobileVerified))) { toast.error("Please verify email and mobile before saving."); return; }
    setIsSubmitting(true);
    setTimeout(() => { console.log("Form values:", values); setIsSubmitting(false); setIsEditing(false); toast.success("Company information updated!"); form.reset(values); }, 1000);
  };
  
  const handleCancel = () => { if (initialData) { form.reset(initialData); } setIsEditing(false); setGstVerificationStatus('idle'); setRegNoVerificationStatus('idle'); setEmailVerified(true); setMobileVerified(true); };
  const onFormError = (errors: any) => { console.error("Form Errors:", errors); toast.error("Please correct the highlighted errors."); if(errors.addresses?.message) toast.error(errors.addresses.message); };
  const handlePhoneTypeChange = (id: 'telephone' | 'mobile' | 'fax', checked: boolean) => { if (!isEditing) return; form.setValue(id, checked ? "" : undefined, { shouldValidate: true }); if (id === 'mobile' && !checked) { setMobileVerified(false); setShowMobileOtpInput(false); } };
  const handleAddAddress = () => append({ line1: "", city: "", state: "", pincode: "", isPrimary: fields.length === 0 });
  const handleRemoveAddress = (index: number) => { if (fields.length <= 1) return toast.error("At least one address is required."); const current = form.getValues("addresses"); if (current[index].isPrimary && current.length > 1) { form.setValue(`addresses.${index === 0 ? 1 : 0}.isPrimary`, true); } remove(index); form.trigger("addresses"); };
  const handleSetPrimary = (selectedIndex: number) => { fields.forEach((_, i) => form.setValue(`addresses.${i}.isPrimary`, i === selectedIndex, { shouldValidate: true, shouldDirty: true })); };
  const handleCountryCodeChange = () => { form.setValue("mobile", ""); form.clearErrors("mobile"); };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2"><CardTitle className="text-xl font-bold text-gray-800">Company Information</CardTitle><Info className="w-5 h-5 text-black opacity-70 hover:opacity-100 cursor-pointer" onClick={() => setShowInfo(!showInfo)} /></div>
            {showInfo && <p className="text-sm text-muted-foreground mt-1">{isEditing ? "Update your logistics company details." : "View your company details."}</p>}
          </div>
          {!isEditing && <Button variant="outline" onClick={() => setIsEditing(true)}><Edit className="mr-1 h-4 w-4" /> Edit</Button>}
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onFormError)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="companyName" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Company Name</FormLabel><div className="relative"><Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="Enter company name" className="pl-10" {...field} disabled={!isEditing} /></FormControl></div><FormMessage /></FormItem> )} />
              <FormField control={form.control} name="yearEstablished" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Year Established</FormLabel><div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="e.g., 2010" className="pl-10" {...field} disabled={!isEditing} onChange={(e) => { const filtered = e.target.value.replace(/[^0-9]/g, ''); field.onChange(filtered); }} /></FormControl></div><FormMessage /></FormItem> )} />
            </div>
            <FormField control={form.control} name="industryFocus" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Industries Served</FormLabel><FormControl>{isEditing ? (<MultiSelect options={industryOptions} selected={field.value} onChange={field.onChange} placeholder="Select industries you serve" />) : (<div className="flex flex-wrap gap-2 min-h-[40px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm">{field.value.length > 0 ? field.value.map(val => <div key={val} className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">{industryOptions.find(o => o.value === val)?.label || val}</div>) : <span className="text-muted-foreground">No industries selected</span>}</div>)}</FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="companyDescription" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Company Description</FormLabel><FormControl><Textarea placeholder="Describe your logistics services and expertise" className="min-h-32" {...field} maxLength={500} disabled={!isEditing} /></FormControl><FormDescription className="text-right">{field.value?.length || 0} / 500</FormDescription><FormMessage /></FormItem> )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="gstNumber" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">GST Number</FormLabel><div className="flex items-center space-x-2"><FormControl><Input placeholder="Enter GST number" {...field} value={field.value ?? ""} disabled={!isEditing} /></FormControl>{isEditing && <Button type="button" onClick={handleVerifyGst} disabled={isVerifyingGst || !field.value} className="bg-[#eb2f96] hover:bg-[#c4257d]">{isVerifyingGst ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}</Button>}</div><div className="mt-2 text-sm min-h-[20px]">{gstVerificationStatus === 'success' && verifiedGstData && ( <div className="flex items-center text-green-600"> <CheckCircle2 className="h-4 w-4 mr-2" /> <span>Verified: <strong>{verifiedGstData.legalName}</strong></span> </div> )}{gstVerificationStatus === 'not_found' && ( <div className="flex items-center text-yellow-600"> <AlertTriangle className="h-4 w-4 mr-2" /> <span>GSTIN not found.</span> </div> )}{gstVerificationStatus === 'error' && ( <div className="flex items-center text-red-600"> <XCircle className="h-4 w-4 mr-2" /> <span>Verification failed.</span> </div> )}</div><FormMessage /></FormItem> )} />
              <FormField control={form.control} name="registrationNumber" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Registration Number</FormLabel><div className="flex items-center space-x-2"><FormControl><Input placeholder="Enter registration number" {...field} disabled={!isEditing} /></FormControl>{isEditing && <Button type="button" onClick={handleVerifyRegNo} disabled={isVerifyingRegNo || !field.value} className="bg-[#eb2f96] hover:bg-[#c4257d]">{isVerifyingRegNo ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}</Button>}</div><div className="mt-2 text-sm min-h-[20px]">{regNoVerificationStatus === 'success' && (<div className="flex items-center text-green-600"><CheckCircle2 className="h-4 w-4 mr-2" /><span>Verified successfully.</span></div>)}{regNoVerificationStatus === 'error' && (<div className="flex items-center text-red-600"><XCircle className="h-4 w-4 mr-2" /><span>Verification failed.</span></div>)}</div><FormMessage /></FormItem> )} />
            </div>
            <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel className="flex items-center text-foreground">Email {emailVerified && <Badge className="bg-green-100 text-green-600 hover:bg-green-200 flex items-center space-x-1 ml-2"><Check className="h-3 w-3" /><span>Verified</span></Badge>}</FormLabel><div className="flex items-center space-x-2"><div className="relative flex-grow"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="Enter business email" className="pl-10" {...field} disabled={!isEditing || showEmailOtpInput} /></FormControl></div>{isEditing && !emailVerified && <Button className="bg-yellow-600 text-white hover:bg-yellow-700" type="button" onClick={() => handleSendOtp('email')} disabled={isSendingEmailOtp || emailTimer > 0}>{isSendingEmailOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : emailTimer > 0 ? `Resend in ${emailTimer}s` : 'Verify'}</Button>}</div><FormMessage />{showEmailOtpInput && <div className="mt-2 p-3 bg-gray-50 rounded-md border space-y-2"><FormLabel>Enter 4-Digit OTP</FormLabel><div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0"><OtpInput value={emailOtp} onChange={setEmailOtp} length={4} disabled={isVerifyingEmailOtp} /><Button type="button" onClick={() => handleVerifyOtp('email')} disabled={isVerifyingEmailOtp || emailOtp.length !== 4}>{isVerifyingEmailOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}</Button></div></div>}</FormItem> )} />
            <div className="space-y-2">
              <FormLabel className="text-foreground">Contact Numbers</FormLabel>
              <div className="flex items-center space-x-4 pt-2">{phoneTypes.map(p => <div key={p.id} className="flex items-center space-x-2"><Checkbox id={p.id} checked={form.watch(p.id) !== undefined} onCheckedChange={c => handlePhoneTypeChange(p.id, !!c)} disabled={!isEditing} /><label htmlFor={p.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{p.label}</label></div>)}</div>
              {form.watch('mobile') !== undefined && <FormField control={form.control} name="mobile" render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-foreground pt-4">Mobile{mobileVerified && <Badge className="bg-green-100 text-green-600 hover:bg-green-200 flex items-center space-x-1 ml-2"><Check className="h-3 w-3" /><span>Verified</span></Badge>}</FormLabel>
                  <div className="flex items-center space-x-2">
                    <CountryCodeSelectField className="w-" control={form.control} name="countryCode" onValueChange={handleCountryCodeChange} disabled={!isEditing} triggerPlaceholder="India(+91)" />
                    <div className="relative flex-grow"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="9876543210" {...field} value={field.value ?? ""} disabled={!isEditing || showMobileOtpInput} className="pl-10" onChange={(e) => { const filtered = e.target.value.replace(/[^0-9]/g, ''); field.onChange(filtered); }} /></FormControl></div>
                    {isEditing && !mobileVerified && <Button type="button" className="bg-[#eb2f96] hover:bg-[#c4257d] text-white " onClick={() => handleSendOtp('mobile')} disabled={isSendingMobileOtp || mobileTimer > 0 || !field.value}>{isSendingMobileOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : mobileTimer > 0 ? `Resend in ${mobileTimer}s` : 'Verify'}</Button>}
                  </div>
                  <FormMessage />
                  {showMobileOtpInput && <div className="mt-2 p-3 bg-gray-50 rounded-md border space-y-2"><FormLabel>Enter 4-Digit OTP</FormLabel><div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0"><OtpInput value={mobileOtp} onChange={setMobileOtp} length={4} disabled={isVerifyingMobileOtp} /><Button className="bg-[#eb2f96] hover:bg-[#c4257d]" type="button" onClick={() => handleVerifyOtp('mobile')} disabled={isVerifyingMobileOtp || mobileOtp.length !== 4}>{isVerifyingMobileOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}</Button></div></div>}
                </FormItem>
              )} />}
              {form.watch('telephone') !== undefined && <FormField control={form.control} name="telephone" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Landline (Optional)</FormLabel><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="022-23456789" {...field} value={field.value ?? ""} disabled={!isEditing} className="pl-10" onChange={(e) => { const filtered = e.target.value.replace(/[^0-9-+\s()]/g, ''); field.onChange(filtered); }} /></FormControl></div><FormMessage /></FormItem> )} />}
              {form.watch('fax') !== undefined && <FormField control={form.control} name="fax" render={({ field }) => ( <FormItem><FormLabel className="text-foreground">Fax (Optional)</FormLabel><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><FormControl><Input placeholder="Enter fax number" {...field} value={field.value ?? ""} disabled={!isEditing} className="pl-10" onChange={(e) => { const filtered = e.target.value.replace(/[^0-9-+\s()]/g, ''); field.onChange(filtered); }} /></FormControl></div><FormMessage /></FormItem> )} />}
            </div>
            <div className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">Company Addresses</FormLabel>
              {fields.map((field, index) => {
                 const selectedState = form.watch(`addresses.${index}.state`);
                 const cities = selectedState ? (indianStatesAndCities[selectedState] || []).map(c => ({ label: c, value: c })) : [];
                 return (
                  <div key={field.id} className="space-y-4 rounded-md border p-4 relative bg-slate-50/50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-x-4">
                        <h4 className="text-base font-semibold text-foreground">Address {index + 1}</h4>
                        {!isEditing && form.getValues(`addresses.${index}.isPrimary`) && <div className="flex items-center text-sm font-semibold text-green-700 bg-green-100/60 rounded-full px-3 py-1"><CheckCircle2 className="h-4 w-4 mr-2" />Primary Address</div>}
                        {isEditing && <FormField control={form.control} name={`addresses.${index}.isPrimary`} render={({ field: f }) => <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><Checkbox checked={f.value} onCheckedChange={() => handleSetPrimary(index)} /></FormControl><FormLabel className="font-normal cursor-pointer text-sm">Set as Primary</FormLabel></FormItem>} />}
                      </div>
                      {isEditing && <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-100" onClick={() => handleRemoveAddress(index)} disabled={fields.length <= 1}><Trash2 className="h-4 w-4" /></Button>}
                    </div>
                    <FormField control={form.control} name={`addresses.${index}.line1`} render={({ field: f }) => <FormItem><FormLabel className="text-foreground">Address Line</FormLabel><FormControl><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Plot/Building/Street" {...f} disabled={!isEditing} className="pl-10" /></div></FormControl><FormMessage /></FormItem>} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField control={form.control} name={`addresses.${index}.state`} render={({ field: f }) => <FormItem><FormLabel className="text-foreground">State</FormLabel><Select onValueChange={v => {f.onChange(v); form.setValue(`addresses.${index}.city`, "");}} value={f.value} disabled={!isEditing}><FormControl><SelectTrigger><SelectValue placeholder="Select state"/></SelectTrigger></FormControl><SelectContent>{indianStates.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>} />
                      <FormField control={form.control} name={`addresses.${index}.city`} render={({ field: f }) => <FormItem><FormLabel className="text-foreground">City</FormLabel><Select onValueChange={f.onChange} value={f.value} disabled={!isEditing || !selectedState}><FormControl><SelectTrigger><SelectValue placeholder="Select city"/></SelectTrigger></FormControl><SelectContent>{cities.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select><FormMessage/></FormItem>} />
                      <FormField control={form.control} name={`addresses.${index}.pincode`} render={({ field: f }) => <FormItem><FormLabel className="text-foreground">PIN Code</FormLabel><FormControl><Input placeholder="e.g., 400001" {...f} disabled={!isEditing} onChange={(e) => { const filtered = e.target.value.replace(/[^0-9]/g, '').slice(0, 6); f.onChange(filtered); }} /></FormControl><FormMessage /></FormItem>} />
                    </div>
                  </div>
                 )
              })}
              {isEditing && <Button type="button" variant="outline" className="w-full" onClick={handleAddAddress}><PlusCircle className="mr-2 h-4 w-4" />Add Another Address</Button>}
              <FormMessage>{form.formState.errors.addresses?.message}</FormMessage>
            </div>
           <FormField control={form.control} name="logisticsServices" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Types of Logistics Services Offered</FormLabel>
                  <FormControl>
                    {isEditing ? (
                      <MultiSelect options={logisticsServiceOptions} selected={field.value} onChange={field.onChange} placeholder="Select services you provide" />
                    ) : (
                       <div className="flex flex-wrap gap-2 min-h-[40px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm">{field.value.length > 0 ? field.value.map(val => <div key={val} className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">{logisticsServiceOptions.find(o => o.value === val)?.label || val}</div>) : <span className="text-muted-foreground">No services selected</span>}</div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )} />
          </CardContent>
          {isEditing && (
            <CardFooter className="flex justify-end gap-2 border-t bg-gray-50/50 px-6 py-4">
              <Button type="submit" disabled={isSubmitting} className="bg-[#eb2f96] hover:bg-[#c4257d]">
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save"}
              </Button>
              <Button variant="outline" type="button" disabled={isSubmitting} onClick={handleCancel}>Cancel</Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
};
>>>>>>> 12f1a3e (Initial commit)
>>>>>>> 9b0ce35 (Initial commit)
