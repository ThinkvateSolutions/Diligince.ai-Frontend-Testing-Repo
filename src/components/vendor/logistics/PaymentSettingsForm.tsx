// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Info } from "lucide-react";

// const bankDetailsSchema = z.object({
//   accountName: z.string().min(2, { message: "Account name is required" }).regex(/^[a-zA-Z\s.&'-]+$/, { message: "Account name cannot contain numbers or invalid special characters." }),
//   accountNumber: z.string().regex(/^\d{9,18}$/, { message: "Account number must be between 9 and 18 digits." }),
//   reEnterAccountNumber: z.string().regex(/^\d{9,18}$/, { message: "Account number must be between 9 and 18 digits." }),
//   ifscCode: z.string().transform((val) => val.toUpperCase()).pipe(z.string().length(11, { message: "IFSC Code must be exactly 11 characters." })).pipe(z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Invalid IFSC code format." })),
//   bankName: z.string().min(2, { message: "Bank name is required" }).regex(/^[a-zA-Z\s.&'-]+$/, { message: "Bank name cannot contain numbers or invalid special characters." }),
//   branchName: z.string().min(2, { message: "Branch name is required" }).regex(/^[a-zA-Z0-9\s,-]+$/, { message: "Branch name contains invalid characters." }),
//   accountType: z.enum(["savings", "current"], { required_error: "Account type is required" }),
// }).superRefine(({ accountNumber, reEnterAccountNumber }, ctx) => {
//   if (accountNumber !== reEnterAccountNumber) {
//     ctx.addIssue({ code: "custom", message: "Account numbers do not match.", path: ["reEnterAccountNumber"] });
//   }
// });

// const taxDetailsSchema = z.object({
//   gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, { message: "Invalid GST number format" }).optional().or(z.literal("")),
//   panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Invalid PAN number format" }),
//   taxDeduction: z.boolean().default(false),
//   tdsPercentage: z.string().optional(),
// });

// const invoiceSettingsSchema = z.object({
//   invoicePrefix: z.string().max(10, { message: "Prefix cannot exceed 10 characters." }).regex(/^[A-Z0-9-]*$/, { message: "Only uppercase letters, numbers, and hyphens are allowed." }).optional(),
//   paymentTerms: z.string().min(1, { message: "Payment terms are required" }),
//   defaultMessage: z.string().optional(),
//   invoiceEmail: z.string().email({ message: "Invalid email address" }),
//   autoGenerate: z.boolean().default(false),
//   includeLogo: z.boolean().default(true),
// });

// type BankDetails = z.infer<typeof bankDetailsSchema>;
// type TaxDetails = z.infer<typeof taxDetailsSchema>;
// type InvoiceSettings = z.infer<typeof invoiceSettingsSchema>;

// const PaymentSettingsForm = () => {
//   const [activeTab, setActiveTab] = useState("bank-details");
//   const [isBankSubmitting, setIsBankSubmitting] = useState(false);
//   const [isTaxSubmitting, setIsTaxSubmitting] = useState(false);
//   const [isInvoiceSubmitting, setIsInvoiceSubmitting] = useState(false);
//   // --- HIGHLIGHTED FIX: Added the missing state variable ---
//   const [showAccountInfo, setShowAccountInfo] = useState(false);

//   const bankForm = useForm<BankDetails>({
//     resolver: zodResolver(bankDetailsSchema),
//     defaultValues: { accountName: "TechServe Solutions Pvt Ltd", accountNumber: "123456789012", reEnterAccountNumber: "", ifscCode: "SBIN0123456", bankName: "State Bank of India", branchName: "Industrial Area Branch", accountType: "current", },
//   });

//   const taxForm = useForm<TaxDetails>({
//     resolver: zodResolver(taxDetailsSchema),
//     defaultValues: { gstNumber: "29ABCDE1234F1Z5", panNumber: "ABCDE1234F", taxDeduction: false, tdsPercentage: "2", },
//   });

//   const invoiceForm = useForm<InvoiceSettings>({
//     resolver: zodResolver(invoiceSettingsSchema),
//     defaultValues: { invoicePrefix: "TSS-INV-", paymentTerms: "30days", defaultMessage: "Thank you for your business. Payment is expected within 30 days.", invoiceEmail: "accounts@techservesolutions.com", autoGenerate: true, includeLogo: true, },
//   });

//   const onSubmitBankDetails = (values: BankDetails) => {
//     setIsBankSubmitting(true);
//     setTimeout(() => { console.log("Bank details values:", values); setIsBankSubmitting(false); toast.success("Bank details updated successfully!"); }, 1000);
//   };

//   const onSubmitTaxDetails = (values: TaxDetails) => {
//     setIsTaxSubmitting(true);
//     setTimeout(() => { console.log("Tax details values:", values); setIsTaxSubmitting(false); toast.success("Tax information updated successfully!"); }, 1000);
//   };

//   const onSubmitInvoiceSettings = (values: InvoiceSettings) => {
//     setIsInvoiceSubmitting(true);
//     setTimeout(() => { console.log("Invoice settings values:", values); setIsInvoiceSubmitting(false); toast.success("Invoice settings updated successfully!"); }, 1000);
//   };

//   return (
//     // --- HIGHLIGHTED FIX: The <Card> now correctly wraps the entire component ---
//     <Card className="w-full">
//       <CardHeader>
//         {/* --- HIGHLIGHTED FIX: Corrected the flexbox layout for the header --- */}
//         <div className="flex flex-row items-start justify-between">
//           <div className="flex items-center gap-2">
//             <CardTitle className="text-xl font-bold text-gray-800">Payment Settings</CardTitle>
//             <button
//               type="button"
//               onClick={() => setShowAccountInfo(prev => !prev)}
//               className="text-gray-500"
//             >
//               <Info className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//         {/* --- HIGHLIGHTED FIX: Conditional description is now outside the flex container --- */}
//         {showAccountInfo && (
//           <CardDescription className="pt-2">
//             Manage your payment details, tax information and invoice settings
//           </CardDescription>
//         )}
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="bank-details" value={activeTab} onValueChange={setActiveTab}>
//           <TabsList className="grid grid-cols-3 mb-6">
//             <TabsTrigger value="bank-details">Bank Details</TabsTrigger>
//             <TabsTrigger value="tax-information">Tax Information</TabsTrigger>
//             <TabsTrigger value="invoice-settings">Invoice Settings</TabsTrigger>
//           </TabsList>

//           <TabsContent value="bank-details">
//             <Form {...bankForm}>
//               <form onSubmit={bankForm.handleSubmit(onSubmitBankDetails)} className="space-y-6">
//                 <FormField
//                   control={bankForm.control}
//                   name="accountName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Account Holder Name</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter account holder name"
//                           {...field}
//                           onChange={(e) => {
//                             const filteredValue = e.target.value.replace(/[^a-zA-Z\s.&'-]/g, '');
//                             field.onChange(filteredValue);
//                           }} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )} />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={bankForm.control}
//                     name="accountNumber"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Account Number</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter account number"
//                             {...field}
//                             onChange={(e) => {
//                               const filteredValue = e.target.value.replace(/[^0-9]/g, '');
//                               field.onChange(filteredValue);
//                             }} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )} />
//                   <FormField
//                     control={bankForm.control}
//                     name="reEnterAccountNumber"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Re-enter Account Number</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Re-enter account number"
//                             type="password"
//                             {...field}
//                             onChange={(e) => {
//                               const filteredValue = e.target.value.replace(/[^0-9]/g, '');
//                               field.onChange(filteredValue);
//                             }} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )} />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={bankForm.control}
//                     name="ifscCode"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>IFSC Code</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter IFSC code"
//                             {...field}
//                             onChange={(e) => {
//                               const filteredValue = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
//                               field.onChange(filteredValue);
//                             }} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )} />
//                   <FormField
//                     control={bankForm.control}
//                     name="bankName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Bank Name</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter bank name"
//                             {...field}
//                             onChange={(e) => {
//                               const filteredValue = e.target.value.replace(/[^a-zA-Z\s.&'-]/g, '');
//                               field.onChange(filteredValue);
//                             }} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )} />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={bankForm.control}
//                     name="branchName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Branch Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter branch name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )} />
//                   <FormField
//                     control={bankForm.control}
//                     name="accountType"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Account Type</FormLabel>
//                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                           <FormControl>
//                             <SelectTrigger><SelectValue placeholder="Select account type" /></SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="savings">Savings</SelectItem>
//                             <SelectItem value="current">Current</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )} />
//                 </div>

//                 <div className="flex justify-end space-x-4 pt-4">
//                   <Button type="submit" disabled={isBankSubmitting || !bankForm.formState.isDirty} className="bg-[#eb2f96] hover:bg-[#eb2f96]">{isBankSubmitting ? "Saving..." : "Save"}</Button>
//                   <Button type="button" variant="outline" onClick={() => bankForm.reset()}>Reset</Button>
//                 </div>
//               </form>
//             </Form>
//           </TabsContent>

//           {/* Tax Information and Invoice Settings Tabs remain unchanged */}
//           <TabsContent value="tax-information">
//             <Form {...taxForm}>
//               <form onSubmit={taxForm.handleSubmit(onSubmitTaxDetails)} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={taxForm.control}
//                     name="gstNumber"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>GSTIN</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter GST number" {...field} />
//                         </FormControl>
//                         <FormDescription>
//                           Format: 29ABCDE1234F1Z5 (Leave blank if not applicable)
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={taxForm.control}
//                     name="panNumber"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>PAN Number</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter PAN number" {...field} />
//                         </FormControl>
//                         <FormDescription>
//                           Format: ABCDE1234F
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={taxForm.control}
//                   name="taxDeduction"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                       <div className="space-y-0.5">
//                         <FormLabel className="text-base">Goods and Service Tax (GST)</FormLabel>
//                         <FormDescription>
//                           Enable if you are subject to GST on your invoices
//                         </FormDescription>
//                       </div>
//                       <FormControl>
//                         <Switch 
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                           className="data-[state=checked]:bg-[#eb2f96]"
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />

//                 {taxForm.watch("taxDeduction") && (
//                   <FormField
//                     control={taxForm.control}
//                     name="tdsPercentage"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>GST Percentage</FormLabel>
//                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select TDS percentage" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="2">2%</SelectItem>
//                             <SelectItem value="5">5%</SelectItem>
//                             <SelectItem value="10">10%</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 )}

//                 <div className="flex justify-end space-x-4 pt-4">
                  
//                   <Button 
//                     type="submit" 
//                     disabled={isTaxSubmitting || !taxForm.formState.isDirty}
//                     className="bg-[#eb2f96] hover:bg-[#eb2f96]"
//                   >
//                     {isTaxSubmitting ? "Saving..." : "Save"}
//                   </Button>
//                   <Button 
//                     type="button" 
//                     variant="outline" 
//                     onClick={() => taxForm.reset()}
//                   >
//                     Reset
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </TabsContent>
          
//           <TabsContent value="invoice-settings">
//             <Form {...invoiceForm}>
//               <form onSubmit={invoiceForm.handleSubmit(onSubmitInvoiceSettings)} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={invoiceForm.control}
//                     name="invoicePrefix"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Invoice Prefix</FormLabel>
//                         <FormControl>
//                           <Input placeholder="e.g. INV-" {...field} />
//                         </FormControl>
//                         {/* FIX 3: Added description to guide the user */}
//                         <FormDescription>
//                           Max 10 chars. Allowed: A-Z, 0-9, and hyphen (-).
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={invoiceForm.control}
//                     name="invoiceEmail"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Invoice Email</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter invoice email" type="email" {...field} />
//                         </FormControl>
//                         <FormDescription>
//                           Email where payment notifications will be sent
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={invoiceForm.control}
//                   name="paymentTerms"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Payment Terms</FormLabel>
//                       <FormControl>
//                         <RadioGroup
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                           className="flex flex-col space-y-1"
//                         >
//                           <FormItem className="flex items-center space-x-3 space-y-0">
//                             <FormControl>
//                               <RadioGroupItem value="immediate" />
//                             </FormControl>
//                             <FormLabel className="font-normal">
//                               Due Immediately
//                             </FormLabel>
//                           </FormItem>
//                           <FormItem className="flex items-center space-x-3 space-y-0">
//                             <FormControl>
//                               <RadioGroupItem value="15days" />
//                             </FormControl>
//                             <FormLabel className="font-normal">
//                               Net 15 days
//                             </FormLabel>
//                           </FormItem>
//                           <FormItem className="flex items-center space-x-3 space-y-0">
//                             <FormControl>
//                               <RadioGroupItem value="30days" />
//                             </FormControl>
//                             <FormLabel className="font-normal">
//                               Net 30 days
//                             </FormLabel>
//                           </FormItem>
//                           <FormItem className="flex items-center space-x-3 space-y-0">
//                             <FormControl>
//                               <RadioGroupItem value="45days" />
//                             </FormControl>
//                             <FormLabel className="font-normal">
//                               Net 45 days
//                             </FormLabel>
//                           </FormItem>
//                           <FormItem className="flex items-center space-x-3 space-y-0">
//                             <FormControl>
//                               <RadioGroupItem value="60days" />
//                             </FormControl>
//                             <FormLabel className="font-normal">
//                               Net 60 days
//                             </FormLabel>
//                           </FormItem>
//                         </RadioGroup>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={invoiceForm.control}
//                   name="defaultMessage"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Default Invoice Message</FormLabel>
//                       <FormControl>
//                         <Textarea 
//                           placeholder="Enter default message to appear on invoices" 
//                           className="resize-none"
//                           {...field} 
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="space-y-4">
//                   <FormField
//                     control={invoiceForm.control}
//                     name="autoGenerate"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                         <div className="space-y-0.5">
//                           <FormLabel className="text-base">Auto-generate Invoices</FormLabel>
//                           <FormDescription>
//                             Automatically generate invoices when projects are completed
//                           </FormDescription>
//                         </div>
//                         <FormControl>
//                           <Switch
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                              className="data-[state=checked]:bg-[#eb2f96]"
//                           />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={invoiceForm.control}
//                     name="includeLogo"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                         <div className="space-y-0.5">
//                           <FormLabel className="text-base">Include Company Logo</FormLabel>
//                           <FormDescription>
//                             Add your company logo to invoices
//                           </FormDescription>
//                         </div>
//                         <FormControl>
//                           <Switch
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                              className="data-[state=checked]:bg-[#eb2f96]"
//                           />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <div className="flex justify-end space-x-4 pt-4">
                  
//                   <Button 
//                     type="submit" 
//                     disabled={isInvoiceSubmitting || !invoiceForm.formState.isDirty}
//                     className="bg-[#eb2f96] hover:bg-[#eb2f96]"
//                   >
//                     {isInvoiceSubmitting ? "Saving..." : "Save"}
//                   </Button>
//                   <Button 
//                     type="button" 
//                     variant="outline" 
//                     onClick={() => invoiceForm.reset()}
//                   >
//                     Reset
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// };

// export default PaymentSettingsForm;

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Info } from "lucide-react";

const bankDetailsSchema = z.object({
  accountName: z.string().min(2, { message: "Account name is required" }).regex(/^[a-zA-Z\s.&'-]+$/, { message: "Account name cannot contain numbers or invalid special characters." }),
  accountNumber: z.string().regex(/^\d{9,18}$/, { message: "Account number must be between 9 and 18 digits." }),
  reEnterAccountNumber: z.string().regex(/^\d{9,18}$/, { message: "Account number must be between 9 and 18 digits." }),
  ifscCode: z.string().transform((val) => val.toUpperCase()).pipe(z.string().length(11, { message: "IFSC Code must be exactly 11 characters." })).pipe(z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Invalid IFSC code format." })),
  bankName: z.string().min(2, { message: "Bank name is required" }).regex(/^[a-zA-Z\s.&'-]+$/, { message: "Bank name cannot contain numbers or invalid special characters." }),
  branchName: z.string().min(2, { message: "Branch name is required" }).regex(/^[a-zA-Z0-9\s,-]+$/, { message: "Branch name contains invalid characters." }),
  accountType: z.enum(["savings", "current"], { required_error: "Account type is required" }),
}).superRefine(({ accountNumber, reEnterAccountNumber }, ctx) => {
  if (accountNumber !== reEnterAccountNumber) {
    ctx.addIssue({ code: "custom", message: "Account numbers do not match.", path: ["reEnterAccountNumber"] });
  }
});

const taxDetailsSchema = z.object({
  // HIGHLIGHTED UPDATE: Added transform for robustness
   //gstNumber: z.string().transform((v) => v.toUpperCase()).pipe(z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, { message: "Invalid GST number format" }).optional().or(z.literal(""))),
   //panNumber: z.string().transform((v) => v.toUpperCase()).pipe(z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Invalid PAN number format" })),
   //taxDeduction: z.boolean().default(false),
   //tdsPercentage: z.string().optional(),

   gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, { message: "Invalid GST number format" }).optional().or(z.literal("")),
  panNumber: z.string().transform((v) => v.toUpperCase()).pipe(z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Invalid PAN number format" })),
  taxDeduction: z.boolean().default(false),
  tdsPercentage: z.string().optional(),
//  customTdsPercentage: z.string().optional().regex(/^\d+(\.\d+)?$/, { message: "Custom GST percentage must be a valid number." }),
});

const invoiceSettingsSchema = z.object({
  // HIGHLIGHTED UPDATE: Added transform for robustness
  invoicePrefix: z.string().transform((v) => v.toUpperCase()).pipe(z.string().max(10, { message: "Prefix cannot exceed 10 characters." }).regex(/^[A-Z0-9-]*$/, { message: "Only uppercase letters, numbers, and hyphens are allowed." }).optional()),
  paymentTerms: z.string().min(1, { message: "Payment terms are required" }),
  defaultMessage: z.string().optional(),
  invoiceEmail: z.string().email({ message: "Invalid email address" }),
  autoGenerate: z.boolean().default(false),
  includeLogo: z.boolean().default(true),
});

type BankDetails = z.infer<typeof bankDetailsSchema>;
type TaxDetails = z.infer<typeof taxDetailsSchema>;
type InvoiceSettings = z.infer<typeof invoiceSettingsSchema>;

const PaymentSettingsForm = () => {
  const [activeTab, setActiveTab] = useState("bank-details");
  const [isBankSubmitting, setIsBankSubmitting] = useState(false);
  const [isTaxSubmitting, setIsTaxSubmitting] = useState(false);
  const [isInvoiceSubmitting, setIsInvoiceSubmitting] = useState(false);
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  const bankForm = useForm<BankDetails>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: { accountName: "TechServe Solutions Pvt Ltd", accountNumber: "123456789012", reEnterAccountNumber: "", ifscCode: "SBIN0123456", bankName: "State Bank of India", branchName: "Industrial Area Branch", accountType: "current", },
    mode: "onBlur",
  });

  const taxForm = useForm<TaxDetails>({
    resolver: zodResolver(taxDetailsSchema),
    defaultValues: { gstNumber: "29ABCDE1234F1Z5", panNumber: "ABCDE1234F", taxDeduction: false, tdsPercentage: "0", },
    mode: "onBlur",
  });

  const invoiceForm = useForm<InvoiceSettings>({
    resolver: zodResolver(invoiceSettingsSchema),
    defaultValues: { invoicePrefix: "TSS-INV-", paymentTerms: "30days", defaultMessage: "Thank you for your business. Payment is expected within 30 days.", invoiceEmail: "accounts@techservesolutions.com", autoGenerate: true, includeLogo: true, },
    mode: "onBlur",
  });

  const onSubmitBankDetails = (values: BankDetails) => { setIsBankSubmitting(true); setTimeout(() => { console.log("Bank details values:", values); setIsBankSubmitting(false); toast.success("Bank details updated successfully!"); }, 1000); };
  const onSubmitTaxDetails = (values: TaxDetails) => { setIsTaxSubmitting(true); setTimeout(() => { console.log("Tax details values:", values); setIsTaxSubmitting(false); toast.success("Tax information updated successfully!"); }, 1000); };
  const onSubmitInvoiceSettings = (values: InvoiceSettings) => { setIsInvoiceSubmitting(true); setTimeout(() => { console.log("Invoice settings values:", values); setIsInvoiceSubmitting(false); toast.success("Invoice settings updated successfully!"); }, 1000); };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row items-start justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold text-gray-800">Payment Settings</CardTitle>
            <button type="button" onClick={() => setShowAccountInfo(prev => !prev)} className="text-gray-500"><Info className="h-5 w-5" /></button>
          </div>
        </div>
        {showAccountInfo && (<CardDescription className="pt-2">Manage your payment details, tax information and invoice settings</CardDescription>)}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bank-details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="bank-details">Bank Details</TabsTrigger>
            <TabsTrigger value="tax-information">Tax Information</TabsTrigger>
            <TabsTrigger value="invoice-settings">Invoice Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bank-details">
            <Form {...bankForm}>
              <form onSubmit={bankForm.handleSubmit(onSubmitBankDetails)} className="space-y-6">
                <FormField control={bankForm.control} name="accountName" render={({ field }) => (<FormItem><FormLabel>Account Holder Name</FormLabel><FormControl><Input placeholder="Enter account holder name" {...field} onChange={(e) => { const filteredValue = e.target.value.replace(/[^a-zA-Z\s.&'-]/g, ''); field.onChange(filteredValue); }} /></FormControl><FormMessage /></FormItem>)} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={bankForm.control} name="accountNumber" render={({ field }) => (<FormItem><FormLabel>Account Number</FormLabel><FormControl><Input placeholder="Enter account number" maxLength={18} {...field} onChange={(e) => { const filteredValue = e.target.value.replace(/[^0-9]/g, ''); field.onChange(filteredValue); }} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={bankForm.control} name="reEnterAccountNumber" render={({ field }) => (<FormItem><FormLabel>Re-enter Account Number</FormLabel><FormControl><Input placeholder="Re-enter account number" type="password" maxLength={18} {...field} onChange={(e) => { const filteredValue = e.target.value.replace(/[^0-9]/g, ''); field.onChange(filteredValue); }} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={bankForm.control} name="ifscCode" render={({ field }) => (<FormItem><FormLabel>IFSC Code</FormLabel><FormControl><Input placeholder="Enter IFSC code" maxLength={11} {...field} onChange={(e) => { const filteredValue = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase(); field.onChange(filteredValue); }} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={bankForm.control} name="bankName" render={({ field }) => (<FormItem><FormLabel>Bank Name</FormLabel><FormControl><Input placeholder="Enter bank name" {...field} onChange={(e) => { const filteredValue = e.target.value.replace(/[^a-zA-Z\s.&'-]/g, ''); field.onChange(filteredValue); }} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={bankForm.control} name="branchName" render={({ field }) => (<FormItem><FormLabel>Branch Name</FormLabel><FormControl><Input placeholder="Enter branch name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={bankForm.control} name="accountType" render={({ field }) => (<FormItem><FormLabel>Account Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select account type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="savings">Savings</SelectItem><SelectItem value="current">Current</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="submit" disabled={isBankSubmitting || !bankForm.formState.isDirty} className="bg-[#eb2f96] hover:bg-[#eb2f96]">{isBankSubmitting ? "Saving..." : "Save"}</Button>
                  <Button type="button" variant="outline" onClick={() => bankForm.reset()}>Reset</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
<TabsContent value="tax-information">
  <Form {...taxForm}>
    <form onSubmit={taxForm.handleSubmit(onSubmitTaxDetails)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={taxForm.control} name="gstNumber" render={({ field }) => (
          <FormItem>
            <FormLabel>GSTIN</FormLabel>
            <FormControl>
              <Input placeholder="Enter GST number" {...field} 
               onChange={(e) => {
                  const value = e.target.value.toUpperCase(); // Convert to uppercase
                  const filteredValue = value.replace(/[^0-9A-Z]/g, ""); // Allow only valid characters
                  field.onChange(filteredValue);
                }} 
               />
            </FormControl>
            <FormDescription>Format: 29ABCDE1234F1Z5 (Leave blank if not applicable)</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={taxForm.control} name="panNumber" render={({ field }) => (
          <FormItem>
            <FormLabel>PAN Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter PAN number" {...field} />
            </FormControl>
            <FormDescription>Format: ABCDE1234F</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <FormField control={taxForm.control} name="taxDeduction" render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Goods and Service Tax (GST)</FormLabel>
            <FormDescription>Enable if you are subject to GST on your invoices</FormDescription>
          </div>
          <FormControl>
            <Switch 
              checked={field.value} 
              onCheckedChange={field.onChange} 
              className="data-[state=checked]:bg-[#eb2f96]" 
            />
          </FormControl>
        </FormItem>
      )} />
      {taxForm.watch("taxDeduction") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
  control={taxForm.control}
  name="tdsPercentage"
  render={({ field }) => (
    <FormItem>
      <FormLabel>GST Percentage</FormLabel>
      <div className="flex items-center space-x-2">
        {field.value && !["0", "5", "12", "18", "28", "custom"].includes(field.value) ? (
          // Show custom input when value is not a predefined option
          <Input
            placeholder="Enter custom GST %"
            value={field.value}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.]/g, "");
              field.onChange(val);
            }}
            onBlur={() => {
              if (field.value === "") {
                field.onChange("custom");
              }
            }}
          />
        ) : field.value === "custom" ? (
          <Input
            placeholder="Enter custom GST %"
            value=""
            onChange={(e) => {
  let val = e.target.value.replace(/[^0-9]/g, ""); // allow only digits
  if (val === "") {
    field.onChange("");
    return;
  }
  let num = parseInt(val, 10);

  // Restrict between 1 and 100
  if (num < -1) num = 1;
  if (num > 100) num = 100;

  field.onChange(String(num));
}}
          />
        ) : (
          <Select
            onValueChange={(value) => field.onChange(value)}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select GST percentage" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="0">0%</SelectItem>
              <SelectItem value="5">5%</SelectItem>
              <SelectItem value="12">12%</SelectItem>
              <SelectItem value="18">18%</SelectItem>
              <SelectItem value="28">28%</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        )}
        </div>
        {/* Error message */}
      {field.value && (parseInt(field.value, 10) < -1 || parseInt(field.value, 10) > 100) && (
        <p className="text-red-500 text-sm">Value must be between 1 and 100</p>
      )}

      
      <FormMessage />
    </FormItem>
  )}
/>

        </div>
      )}
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="submit" disabled={isTaxSubmitting || !taxForm.formState.isDirty} className="bg-[#eb2f96] hover:bg-[#eb2f96]">
          {isTaxSubmitting ? "Saving..." : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={() => taxForm.reset()}>Reset</Button>
      </div>
    </form>
  </Form>
</TabsContent>


          
          <TabsContent value="invoice-settings">
            <Form {...invoiceForm}>
              <form onSubmit={invoiceForm.handleSubmit(onSubmitInvoiceSettings)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={invoiceForm.control} name="invoicePrefix" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Prefix</FormLabel>
                      <FormControl>
                        {/* HIGHLIGHTED UPDATE: Input filtering and maxLength for Invoice Prefix */}
                        <Input placeholder="e.g. INV-" maxLength={10} {...field} onChange={(e) => { const filtered = e.target.value.replace(/[^A-Z0-9-]/g, '').toUpperCase(); field.onChange(filtered); }} />
                      </FormControl>
                      <FormDescription>Max 10 chars. Allowed: A-Z, 0-9, and hyphen (-).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={invoiceForm.control} name="invoiceEmail" render={({ field }) => (<FormItem><FormLabel>Invoice Email</FormLabel><FormControl><Input placeholder="Enter invoice email" type="email" {...field} /></FormControl><FormDescription>Email where payment notifications will be sent</FormDescription><FormMessage /></FormItem>)} />
                </div>
                <FormField control={invoiceForm.control} name="paymentTerms" render={({ field }) => (
                  <FormItem><FormLabel>Payment Terms</FormLabel>
                  <FormControl>
                    <RadioGroup 
                       onValueChange={field.onChange} 
                       defaultValue={field.value} 
                       className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl>
                          <RadioGroupItem value="immediate" />
                          </FormControl>
                          <FormLabel className="font-normal">Due Immediately</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="15days" />
                              </FormControl>
                              <FormLabel className="font-normal">Net 15 days</FormLabel>
                              </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl>
                            <RadioGroupItem value="30days" />
                            </FormControl>
                            <FormLabel className="font-normal">Net 30 days</FormLabel>
                            </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl>
                            <RadioGroupItem value="45days" />
                            </FormControl>
                            <FormLabel className="font-normal">Net 45 days</FormLabel>
                          </FormItem><FormItem className="flex items-center space-x-3 space-y-0"><FormControl>
                            <RadioGroupItem value="60days" /></FormControl>
                            <FormLabel className="font-normal">Net 60 days</FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
           <FormControl>
            <RadioGroupItem value="gt60" />
          </FormControl>
          <FormLabel className="font-normal">
            Net above 60 days
          </FormLabel>
        </FormItem>
                          </RadioGroup>
                          </FormControl>
                          <FormMessage />
                          </FormItem>)} />
                <FormField control={invoiceForm.control} name="defaultMessage" render={({ field }) => (<FormItem><FormLabel>Default Invoice Message</FormLabel><FormControl><Textarea placeholder="Enter default message to appear on invoices" className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <div className="space-y-4">
                  <FormField control={invoiceForm.control} name="autoGenerate" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel className="text-base">Auto-generate Invoices</FormLabel><FormDescription>Automatically generate invoices when projects are completed</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                  <FormField control={invoiceForm.control} name="includeLogo" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel className="text-base">Include Company Logo</FormLabel><FormDescription>Add your company logo to invoices</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-[#eb2f96]" /></FormControl></FormItem>)} />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="submit" disabled={isInvoiceSubmitting || !invoiceForm.formState.isDirty} className="bg-[#eb2f96] hover:bg-[#eb2f96]">{isInvoiceSubmitting ? "Saving..." : "Save"}</Button>
                  <Button type="button" variant="outline" onClick={() => invoiceForm.reset()}>Reset</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentSettingsForm;