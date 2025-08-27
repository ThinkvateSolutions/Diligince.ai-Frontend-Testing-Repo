import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Info, FileText, Building, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  CardContent,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const paymentSchema = z
  .object({
    hourlyRate: z.string().optional(),
    dailyRate: z.string().optional(),
    currency: z.string().min(1, { message: "Currency is required" }),
    invoicingPreference: z.string().min(1, { message: "Invoicing preference is required" }),
    taxInformation: z.string().optional(),
    bankName: z.string().min(1, { message: "Bank name is required" }),
    accountHolderName: z.string().min(1, { message: "Account holder name is required" }),
    accountNumber: z.string().min(1).regex(/^\d{9,18}$/, {
      message: "Account number must be 9-18 digits long",
    }),
    confirmAccountNumber: z.string().min(1, { message: "Please re-enter account number" }),
    ifscCode: z.string().min(1).regex(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/, {
      message: "Invalid IFSC code format (e.g. ABCD0123456)",
    }),
    paymentNotes: z.string().optional(),
  })
  .refine((data) => data.accountNumber === data.confirmAccountNumber, {
    message: "Account numbers do not match",
    path: ["confirmAccountNumber"],
  });

const PaymentSettingsForm = () => {
  const savedValues = localStorage.getItem("paymentSettings");
  const defaultValues = savedValues
    ? JSON.parse(savedValues)
    : {
        hourlyRate: "625",
        dailyRate: "",
        currency: "INR",
        invoicingPreference: "project-completion",
        taxInformation: "GST: 29AADCK9687N1ZX",
        bankName: "HDFC Bank",
        accountHolderName: "John Doe",
        accountNumber: "12345678901234",
        confirmAccountNumber: "12345678901234",
        ifscCode: "HDFC0001234",
        paymentNotes: "Please include project reference number in payment description",
      };

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [rateType, setRateType] = useState<"hourly" | "daily">(
    defaultValues.hourlyRate ? "hourly" : "daily"
  );
  const [editMode, setEditMode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const currencyMap: Record<string, string> = {
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    JPY: "¥",
    USD: "$",
  };

  function onSubmit(values: z.infer<typeof paymentSchema>) {
    localStorage.setItem("paymentSettings", JSON.stringify(values));
    toast("Payment settings saved successfully!");
    setEditMode(false);
  }

  return (
    <>
      <div className="p-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <h2 className="text-2xl font-semibold mr-2">Payment Settings</h2>
      <button
        type="button"
        onClick={() => setShowInfo(!showInfo)}
        className="text-black opacity-70 hover:opacity-100 transition"
      >
        <Info className="w-5 h-5" />
      </button>
    </div>
    {!editMode && (
      <Button variant="outline" onClick={() => setEditMode(true)}>
        <Edit className="w-4 h-4 mr-2" />
        Edit
      </Button>
    )}
  </div>

  {/* 👇 Fixed height container for info text */}
  <div className="min-h-[24px] mt-1">
    <p
      className={`text-gray-400 text-sm transition-opacity duration-300 ${
        showInfo ? "opacity-100" : "opacity-0"
      }`}
    >
      Configure your payment rates and banking details.
    </p>
  </div>
</div>


      <CardContent>
        <Tabs defaultValue="banking">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="banking"><Building size={14} /> Banking Details</TabsTrigger>
            <TabsTrigger value="rates"><FileText size={14} /> Rates & Invoicing</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="banking">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              disabled={!editMode}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '');
                                field.onChange(numericValue);
                              }}
                              onKeyDown={(e) => {
                                if (!/[0-9]/.test(e.key) &&
                                    !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              inputMode="numeric"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmAccountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Re-enter Account Number</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              disabled={!editMode}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '');
                                field.onChange(numericValue);
                              }}
                              onKeyDown={(e) => {
                                if (!/[0-9]/.test(e.key) &&
                                    !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              inputMode="numeric"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="accountHolderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Holder Name</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} disabled={!editMode} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} disabled={!editMode} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ifscCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IFSC Code</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} disabled={!editMode} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="paymentNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special instructions for payment processing"
                            className="min-h-24"
                            {...field}
                            disabled={!editMode}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="rates">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel className="text-sm font-medium">Select Rate Type</FormLabel>
                    <RadioGroup
                      defaultValue={rateType}
                      onValueChange={(val) => setRateType(val as "hourly" | "daily")}
                      className="flex gap-4"
                      disabled={!editMode}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="hourly" id="hourly" disabled={!editMode} />
                        <label htmlFor="hourly">Hourly</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="daily" id="daily" disabled={!editMode} />
                        <label htmlFor="daily">Daily</label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="hourlyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hourly Rate</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500 text-sm">{currencySymbol}</span>
                              </div>
                              <Input
                                type="number"
                                className="pl-8"
                                placeholder="0"
                                disabled={!editMode || rateType !== "hourly"}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dailyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Daily Rate</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500 text-sm">{currencySymbol}</span>
                              </div>
                              <Input
                                type="number"
                                className="pl-8"
                                placeholder="0"
                                disabled={!editMode || rateType !== "daily"}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setCurrencySymbol(currencyMap[value]);
                            }}
                            defaultValue={field.value}
                            disabled={!editMode}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(currencyMap).map(([code, symbol]) => (
                                <SelectItem key={code} value={code}>
                                  {code} ({symbol})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="invoicingPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoicing Preference</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                            disabled={!editMode}
                          >
                            {["weekly", "biweekly", "monthly", "project-completion"].map(
                              (val) => (
                                <FormItem key={val} className="flex items-center space-x-3">
                                  <FormControl>
                                    <RadioGroupItem value={val} disabled={!editMode} />
                                  </FormControl>
                                  <FormLabel className="font-normal capitalize">
                                    {val.replace("-", " ")}
                                  </FormLabel>
                                </FormItem>
                              )
                            )}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxInformation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Information (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. GST Number"
                            {...field}
                            disabled={!editMode}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide your GST/PAN/other tax identification details
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {editMode && (
                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="submit" className="bg-[#6A1B9A] text-white hover:bg-[#4A148C]">Save</Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      const saved = localStorage.getItem("paymentSettings");
                      form.reset(saved ? JSON.parse(saved) : defaultValues);
                      setEditMode(false);
                      toast("Changes reverted to last saved state");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </>
  );
};

export default PaymentSettingsForm;
