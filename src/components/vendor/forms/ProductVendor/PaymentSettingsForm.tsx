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
import { Banknote, Building, Coins, FileText, Info, Receipt, Wallet, Edit, Save, X } from "lucide-react";

// Form schemas
const bankDetailsSchema = z.object({
  accountName: z.string()
    .min(2, { message: "Account name is required" })
    .regex(/^[a-zA-Z\s.&'-]+$/, { message: "Account name cannot contain numbers or invalid special characters." }),
  accountNumber: z.string()
    .regex(/^\d{9,18}$/, { message: "Account number must be between 9 and 18 digits." }),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Invalid IFSC code" }),
  bankName: z.string()
    .min(2, { message: "Bank name is required" })
    .regex(/^[a-zA-Z\s.&'-]+$/, { message: "Bank name cannot contain numbers or invalid special characters." }),
  branchName: z.string()
    .min(2, { message: "Branch name is required" })
    .regex(/^[a-zA-Z0-9\s,-]+$/, { message: "Branch name contains invalid characters." }),
  accountType: z.string().min(1, { message: "Account type is required" }),
  paymentNotes: z.string().optional(),
});

const taxDetailsSchema = z.object({
  gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, {
    message: "Invalid GST number format"
  }).optional().or(z.literal("")),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
    message: "Invalid PAN number format"
  }),
  taxDeduction: z.boolean().default(false),
  tdsPercentage: z.string().optional(),
});

const invoiceSettingsSchema = z.object({
  invoicePrefix: z.string()
    .max(10, { message: "Prefix cannot exceed 10 characters." })
    .regex(/^[A-Z0-9-]*$/, { message: "Only uppercase letters, numbers, and hyphens are allowed." })
    .optional(),
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
  const [isEditing, setIsEditing] = useState(false);
  const [isBankSubmitting, setIsBankSubmitting] = useState(false);
  const [isTaxSubmitting, setIsTaxSubmitting] = useState(false);
  const [isInvoiceSubmitting, setIsInvoiceSubmitting] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  // Bank Details Form
  const bankForm = useForm<BankDetails>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      accountName: "John Doe",
      accountNumber: "123456789012",
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank",
      branchName: "Industrial Area Branch",
      accountType: "current",
      paymentNotes: "Please include project reference number in payment description",
    },
  });

  // Tax Details Form
  const taxForm = useForm<TaxDetails>({
    resolver: zodResolver(taxDetailsSchema),
    defaultValues: {
      gstNumber: "29ABCDE1234F1Z5",
      panNumber: "ABCDE1234F",
      taxDeduction: false,
      tdsPercentage: "2",
    },
  });

  // Invoice Settings Form
  const invoiceForm = useForm<InvoiceSettings>({
    resolver: zodResolver(invoiceSettingsSchema),
    defaultValues: {
      invoicePrefix: "TSS-INV-",
      paymentTerms: "30days",
      defaultMessage: "Thank you for your business. Payment is expected within 30 days.",
      invoiceEmail: "accounts@techservesolutions.com",
      autoGenerate: true,
      includeLogo: true,
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    bankForm.reset();
    taxForm.reset();
    invoiceForm.reset();
  };

  const onSubmitBankDetails = (values: BankDetails) => {
    setIsBankSubmitting(true);

    setTimeout(() => {
      console.log("Bank details values:", values);
      setIsBankSubmitting(false);
      setIsEditing(false);
      toast.success("Bank details updated successfully!");
    }, 1000);
  };

  const onSubmitTaxDetails = (values: TaxDetails) => {
    setIsTaxSubmitting(true);

    setTimeout(() => {
      console.log("Tax details values:", values);
      setIsTaxSubmitting(false);
      setIsEditing(false);
      toast.success("Tax information updated successfully!");
    }, 1000);
  };

  const onSubmitInvoiceSettings = (values: InvoiceSettings) => {
    setIsInvoiceSubmitting(true);

    setTimeout(() => {
      console.log("Invoice settings values:", values);
      setIsInvoiceSubmitting(false);
      setIsEditing(false);
      toast.success("Invoice settings updated successfully!");
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between">
        {/* Left side - Title + Info */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <CardTitle className="text-2xl font-bold text-gray-800 mr-2">Payment Settings</CardTitle>
            <button
              type="button"
              onClick={() => setShowPaymentInfo(prev => !prev)}
              className="text-gray-500 hover:text-blue-600 transition"
            >
              <Info className="h-5 w-5" />
            </button>
          </div>

          {/* Fixed space for description */}
          <div className="min-h-[20px]">
            {showPaymentInfo && (
              <CardDescription>
                Manage your payment details, tax information and invoice settings
              </CardDescription>
            )}
          </div>
        </div>

        {/* Right side - Edit button (only shows when not editing) */}
        <div className="flex items-center space-x-2">
          {!isEditing && (
            <Button
              onClick={handleEdit}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="bank-details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="bank-details">
              <Building size={14} className="mr-2" /> Banking Details
            </TabsTrigger>
            <TabsTrigger value="tax-information">
              <Coins size={14} className="mr-2" />Tax Information
            </TabsTrigger>
            <TabsTrigger value="invoice-settings">
              <FileText size={14} className="mr-2" />Invoice Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bank-details">
            <Form {...bankForm}>
              <form onSubmit={bankForm.handleSubmit(onSubmitBankDetails)} className="space-y-6">
                {/* First Row: Account Number and Re-enter Account Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={bankForm.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter account number"
                            {...field}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={bankForm.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Re-enter Account Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Re-enter account number"
                            {...field}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Second Row: Account Holder Name, Bank Name, and IFSC Code */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={bankForm.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter account holder name"
                            {...field}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={bankForm.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter bank name"
                            {...field}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={bankForm.control}
                    name="ifscCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IFSC Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter IFSC code"
                            {...field}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Third Row: Branch Name and Account Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={bankForm.control}
                    name="branchName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter branch name"
                            {...field}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={bankForm.control}
                    name="accountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isEditing}>
                          <FormControl>
                            <SelectTrigger className={!isEditing ? "bg-gray-50 text-gray-600" : ""}>
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="current">Current</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Payment Notes */}
                <FormField
                  control={bankForm.control}
                  name="paymentNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter payment notes"
                          {...field}
                          disabled={!isEditing}
                          className={`resize-none ${!isEditing ? "bg-gray-50 text-gray-600" : ""}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isEditing && (
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isBankSubmitting || !bankForm.formState.isDirty}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      {isBankSubmitting ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="tax-information">
            <Form {...taxForm}>
              <form onSubmit={taxForm.handleSubmit(onSubmitTaxDetails)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={taxForm.control}
                    name="gstNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GSTIN</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter GST number"
                            {...field}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                          />
                        </FormControl>
                        <FormDescription>
                          Format: 29ABCDE1234F1Z5 (Leave blank if not applicable)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={taxForm.control}
                    name="panNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAN Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter PAN number"
                            {...field}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                          />
                        </FormControl>
                        <FormDescription>
                          Format: ABCDE1234F
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={taxForm.control}
                  name="taxDeduction"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Goods and Service Tax (GST)</FormLabel>
                        <FormDescription>
                          Enable if you are subject to GST on your invoices
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-yellow-600"
                          disabled={!isEditing}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {taxForm.watch("taxDeduction") && (
                  <FormField
                    control={taxForm.control}
                    name="tdsPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Percentage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isEditing}>
                          <FormControl>
                            <SelectTrigger className={!isEditing ? "bg-gray-50 text-gray-600" : ""}>
                              <SelectValue placeholder="Select GST percentage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="12">12%</SelectItem>
                            <SelectItem value="18">18%</SelectItem>
                            <SelectItem value="28">28%</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {isEditing && (
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isTaxSubmitting || !taxForm.formState.isDirty}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      {isTaxSubmitting ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="invoice-settings">
            <Form {...invoiceForm}>
              <form onSubmit={invoiceForm.handleSubmit(onSubmitInvoiceSettings)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={invoiceForm.control}
                    name="invoicePrefix"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Prefix</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. INV-"
                            {...field}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                          />
                        </FormControl>
                        <FormDescription>
                          Max 10 chars. Allowed: A-Z, 0-9, and hyphen (-).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={invoiceForm.control}
                    name="invoiceEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter invoice email"
                            type="email"
                            {...field}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50 text-gray-600" : ""}
                          />
                        </FormControl>
                        <FormDescription>
                          Email where payment notifications will be sent
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={invoiceForm.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Terms</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                          disabled={!isEditing}
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="immediate" disabled={!isEditing} />
                            </FormControl>
                            <FormLabel className={`font-normal ${!isEditing ? "text-gray-600" : ""}`}>
                              Due Immediately
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="15days" disabled={!isEditing} />
                            </FormControl>
                            <FormLabel className={`font-normal ${!isEditing ? "text-gray-600" : ""}`}>
                              Net 15 days
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="30days" disabled={!isEditing} />
                            </FormControl>
                            <FormLabel className={`font-normal ${!isEditing ? "text-gray-600" : ""}`}>
                              Net 30 days
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="45days" disabled={!isEditing} />
                            </FormControl>
                            <FormLabel className={`font-normal ${!isEditing ? "text-gray-600" : ""}`}>
                              Net 45 days
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="60days" disabled={!isEditing} />
                            </FormControl>
                            <FormLabel className={`font-normal ${!isEditing ? "text-gray-600" : ""}`}>
                              Net 60 days
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={invoiceForm.control}
                  name="defaultMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Invoice Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter default message to appear on invoices"
                          className={`resize-none ${!isEditing ? "bg-gray-50 text-gray-600" : ""}`}
                          {...field}
                          disabled={!isEditing}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={invoiceForm.control}
                    name="autoGenerate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Auto-generate Invoices</FormLabel>
                          <FormDescription>
                            Automatically generate invoices when projects are completed
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-yellow-600"
                            disabled={!isEditing}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={invoiceForm.control}
                    name="includeLogo"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Include Company Logo</FormLabel>
                          <FormDescription>
                            Add your company logo to invoices
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-yellow-600"
                            disabled={!isEditing}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isInvoiceSubmitting || !invoiceForm.formState.isDirty}
                      className="bg-yellow-600 hover:bg-orange-700"
                    >
                      {isInvoiceSubmitting ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentSettingsForm;