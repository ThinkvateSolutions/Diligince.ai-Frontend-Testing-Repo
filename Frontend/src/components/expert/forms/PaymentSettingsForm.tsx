import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building } from "lucide-react";

const paymentSchema = z.object({
  hourlyRate: z.string().optional(),
  dailyRate: z.string().optional(),
  currency: z.string().min(1, { message: "Currency is required" }),
  invoicingPreference: z
    .string()
    .min(1, { message: "Invoicing preference is required" }),
  taxInformation: z.string().optional(),
  bankName: z.string().min(1, { message: "Bank name is required" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
  ifscCode: z.string().min(1, { message: "IFSC code is required" }),
  paymentNotes: z.string().optional(),
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
        accountNumber: "12345678901234",
        ifscCode: "HDFC0001234",
        paymentNotes:
          "Please include project reference number in payment description",
      };

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [rateType, setRateType] = useState<"hourly" | "daily">(
    defaultValues.hourlyRate ? "hourly" : "daily"
  );

  const currencyMap: Record<string, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  function onSubmit(values: z.infer<typeof paymentSchema>) {
    localStorage.setItem("paymentSettings", JSON.stringify(values));
    toast("Payment settings saved successfully!");
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Payment Settings</CardTitle>
        <CardDescription>
          Configure your payment rates and banking details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rates">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="rates">Rates & Invoicing</TabsTrigger>
            <TabsTrigger value="banking">
              <Building size={14} /> Banking Details
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="rates">
                <div className="space-y-6">
                  {/* Rate type selector */}
                  <div className="space-y-2">
                    <FormLabel className="text-sm font-medium">
                      Select Rate Type
                    </FormLabel>
                    <RadioGroup
                      defaultValue={rateType}
                      onValueChange={(val) =>
                        setRateType(val as "hourly" | "daily")
                      }
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="hourly" id="hourly" />
                        <label htmlFor="hourly">Hourly</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <label htmlFor="daily">Daily</label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Hourly Rate */}
                    <FormField
                      control={form.control}
                      name="hourlyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hourly Rate</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500 text-sm">
                                  {currencySymbol}
                                </span>
                              </div>
                              <Input
                                type="number"
                                className="pl-8"
                                placeholder="0"
                                disabled={rateType !== "hourly"}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Your rate per hour of work
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Daily Rate */}
                    <FormField
                      control={form.control}
                      name="dailyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Daily Rate</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500 text-sm">
                                  {currencySymbol}
                                </span>
                              </div>
                              <Input
                                type="number"
                                className="pl-8"
                                placeholder="0"
                                disabled={rateType !== "daily"}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Your rate per day of work
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Currency */}
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
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="INR">
                                Indian Rupee (₹)
                              </SelectItem>
                              <SelectItem value="USD">US Dollar ($)</SelectItem>
                              <SelectItem value="EUR">Euro (€)</SelectItem>
                              <SelectItem value="GBP">
                                British Pound (£)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Invoicing Preference */}
                  <FormField
                    control={form.control}
                    name="invoicingPreference"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Invoicing Preference</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {["weekly", "biweekly", "monthly", "project-completion"].map((val) => (
                              <FormItem key={val} className="flex items-center space-x-3">
                                <FormControl>
                                  <RadioGroupItem value={val} />
                                </FormControl>
                                <FormLabel className="font-normal capitalize">{val.replace("-", " ")}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tax Info */}
                  <FormField
                    control={form.control}
                    name="taxInformation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Information (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. GST Number" {...field} />
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

              {/* Banking Section */}
              <TabsContent value="banking">
                <div className="space-y-6">
                  <div className="bg-gray-50 border rounded-md p-4 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="text-purple-600" />
                      <h3 className="text-base font-medium text-gray-800">
                        Banking Information
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      This information will be used to process payments for your completed projects.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
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
                            <Input {...field} />
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <div className="flex justify-end space-x-4 pt-4">
                <Button type="submit">Save</Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={!form.formState.isDirty}
                  onClick={() => {
                    const saved = localStorage.getItem("paymentSettings");
                    form.reset(saved ? JSON.parse(saved) : defaultValues);
                    toast("Changes reverted to last saved state");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </>
  );
};

export default PaymentSettingsForm;
