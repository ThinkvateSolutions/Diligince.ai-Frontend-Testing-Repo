import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Truck, RotateCcw, Calendar, Info, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const shippingSchema = z.object({
  shippingMethods: z.array(z.string()).min(1, { message: "At least one shipping method is required" }),
  deliveryTimeLocal: z.string().min(1, { message: "Local delivery time is required" }),
  deliveryTimeNational: z.string().min(1, { message: "National delivery time is required" }),
  deliveryTimeInternational: z.string().optional(),
  shippingCostModel: z.string().min(1, { message: "Shipping cost model is required" }),
  freeShippingThreshold: z.string().optional(),
  specialHandling: z.string().optional(),
});

const returnsSchema = z.object({
  returnPeriod: z.string().min(1, { message: "Return period is required" }),
  returnConditions: z.string().min(1, { message: "Return conditions are required" }),
  warrantyPeriod: z.string().min(1, { message: "Warranty period is required" }),
  warrantyDescription: z.string().min(1, { message: "Warranty description is required" }),
  replacementProcess: z.string().min(1, { message: "Replacement process is required" }),
  returnShippingResponsibility: z.string().min(1, { message: "Return shipping responsibility is required" }),
});

const ShippingReturnsSection = () => {
  const [activeTab, setActiveTab] = useState("shipping");
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [isReturnsLoading, setIsReturnsLoading] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const shippingForm = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      shippingMethods: [],
      deliveryTimeLocal: "",
      deliveryTimeNational: "",
      deliveryTimeInternational: "",
      shippingCostModel: "",
      freeShippingThreshold: "",
      specialHandling: "",
    },
  });

  const returnsForm = useForm<z.infer<typeof returnsSchema>>({
    resolver: zodResolver(returnsSchema),
    defaultValues: {
      returnPeriod: "",
      returnConditions: "",
      warrantyPeriod: "",
      warrantyDescription: "",
      replacementProcess: "",
      returnShippingResponsibility: "",
    },
  });

  const onShippingSubmit = (values: z.infer<typeof shippingSchema>) => {
    setIsShippingLoading(true);
    setTimeout(() => {
      console.log("Shipping values:", values);
      setIsShippingLoading(false);
      toast.success("Shipping policy saved successfully!");
      setIsEditing(false);
    }, 1000);
  };

  const onReturnsSubmit = (values: z.infer<typeof returnsSchema>) => {
    setIsReturnsLoading(true);
    setTimeout(() => {
      console.log("Returns values:", values);
      setIsReturnsLoading(false);
      toast.success("Returns policy saved successfully!");
      setIsEditing(false);
    }, 1000);
  };

  const handleCancel = () => {
    if (activeTab === "shipping") {
      shippingForm.reset();
    } else {
      returnsForm.reset();
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <CardTitle className="text-xl font-bold text-gray-800 mr-2">
                Shipping & Returns Policies
              </CardTitle>
              <button
                type="button"
                onClick={() => setShowShippingInfo(prev => !prev)}
                className="text-gray-500 hover:text-blue-600 transition"
                aria-label="Toggle shipping information"
              >
                <Info className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-[25px]">
              {showShippingInfo && (
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Define how you handle shipping, returns, warranties and replacements.
                </CardDescription>
              )}
            </div>
          </div>
          {!isEditing ? (
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(true)}
              className="mt-[10px]"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          ) : null}
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
              <TabsTrigger value="shipping" className="flex items-center gap-2">
                <Truck size={16} />
                <span>Shipping Policy</span>
              </TabsTrigger>
              <TabsTrigger value="returns" className="flex items-center gap-2">
                <RotateCcw size={16} />
                <span>Returns & Warranty</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="shipping" className="space-y-6">
              <Form {...shippingForm}>
                <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-6">
                  <FormField
                    control={shippingForm.control}
                    name="shippingMethods"
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Shipping Methods Offered</FormLabel>
                          <FormDescription>
                            Select all shipping methods your company offers
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {["standard", "express", "sameDay", "international", "freight", "pickup"].map((method) => (
                            <FormItem key={method} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(method)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, method])
                                      : field.onChange(field.value?.filter(value => value !== method))
                                  }}
                                  disabled={!isEditing}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {method === "standard" && "Standard Shipping"}
                                {method === "express" && "Express Shipping"}
                                {method === "sameDay" && "Same-Day Delivery (Select Areas)"}
                                {method === "international" && "International Shipping"}
                                {method === "freight" && "Freight Shipping (Heavy Items)"}
                                {method === "pickup" && "Store/Warehouse Pickup"}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Estimated Delivery Times</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={shippingForm.control}
                        name="deliveryTimeLocal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Local Delivery (days)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="e.g., 1-2" 
                                  className="pl-10" 
                                  {...field} 
                                  disabled={!isEditing}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={shippingForm.control}
                        name="deliveryTimeNational"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>National Delivery (days)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="e.g., 3-5" 
                                  className="pl-10" 
                                  {...field} 
                                  disabled={!isEditing}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={shippingForm.control}
                        name="deliveryTimeInternational"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>International Delivery (days)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="e.g., 7-14" 
                                  className="pl-10" 
                                  {...field} 
                                  disabled={!isEditing}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <FormField
                    control={shippingForm.control}
                    name="shippingCostModel"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Shipping Cost Calculation Model</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col space-y-1"
                            disabled={!isEditing}
                          >
                            {[
                              { value: "flat", label: "Flat Rate - Fixed shipping cost for all orders" },
                              { value: "weight", label: "Weight-Based - Shipping cost varies by product weight" },
                              { value: "order", label: "Order Value - Shipping cost based on total order value" },
                              { value: "location", label: "Location-Based - Shipping cost varies by delivery location" },
                              { value: "custom", label: "Custom Quote - Shipping cost provided via quote for each order" }
                            ].map((item) => (
                              <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={item.value} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={shippingForm.control}
                    name="freeShippingThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Free Shipping Threshold (₹)</FormLabel>
                        <FormDescription>
                          Set a minimum order value for free shipping (leave blank if not offered)
                        </FormDescription>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 10000" 
                            type="number"
                            {...field} 
                            disabled={!isEditing}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={shippingForm.control}
                    name="specialHandling"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Handling Requirements</FormLabel>
                        <FormDescription>
                          Describe any special handling requirements for your products
                        </FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Temperature-controlled shipping, hazardous materials handling, etc."
                            className="min-h-24"
                            {...field}
                            disabled={!isEditing}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {isEditing && (
                    <CardFooter className="flex justify-end gap-2 pt-2 px-0">
                      <Button 
                        type="submit" 
                        className="bg-yellow-600 hover:bg-yellow-700" 
                        disabled={isShippingLoading}
                      >
                        {isShippingLoading ? "Saving..." : "Save"}
                      </Button>
                      <Button 
                        variant="outline" 
                        type="button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </CardFooter>
                  )}
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="returns" className="space-y-6">
              <Form {...returnsForm}>
                <form onSubmit={returnsForm.handleSubmit(onReturnsSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={returnsForm.control}
                      name="returnPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Return Period (days)</FormLabel>
                          <FormDescription>
                            How many days do customers have to return products?
                          </FormDescription>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 30" 
                              type="number"
                              {...field} 
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={returnsForm.control}
                      name="warrantyPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Warranty Period</FormLabel>
                          <FormDescription>
                            Standard warranty period for your products
                          </FormDescription>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 1 year" 
                              {...field} 
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={returnsForm.control}
                    name="returnConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Return Conditions</FormLabel>
                        <FormDescription>
                          Specify conditions under which products can be returned
                        </FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Products must be unused, in original packaging, with all accessories and documentation."
                            className="min-h-24"
                            {...field}
                            disabled={!isEditing}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={returnsForm.control}
                    name="warrantyDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warranty Description</FormLabel>
                        <FormDescription>
                          Describe what is covered under your warranty
                        </FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Our warranty covers manufacturing defects and malfunctions. It does not cover damage from misuse, accidents, or normal wear and tear."
                            className="min-h-24"
                            {...field}
                            disabled={!isEditing}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={returnsForm.control}
                    name="replacementProcess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Replacement Process</FormLabel>
                        <FormDescription>
                          Describe your process for handling product replacements
                        </FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Customer initiates a replacement request through our portal. Once approved, we ship a replacement and provide a return label for the defective item."
                            className="min-h-24"
                            {...field}
                            disabled={!isEditing}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={returnsForm.control}
                    name="returnShippingResponsibility"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Return Shipping Responsibility</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col space-y-1"
                            disabled={!isEditing}
                          >
                            {[
                              { value: "customer", label: "Customer pays for return shipping" },
                              { value: "vendor", label: "Vendor pays for return shipping" },
                              { value: "conditional", label: "Vendor pays only if product is defective/warranty claim" }
                            ].map((item) => (
                              <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={item.value} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {isEditing && (
                    <CardFooter className="flex justify-end gap-2 pt-2 px-0">
                      <Button 
                        type="submit" 
                        className="bg-yellow-600 hover:bg-yellow-700" 
                        disabled={isReturnsLoading}
                      >
                        {isReturnsLoading ? "Saving..." : "Save"}
                      </Button>
                      <Button 
                        variant="outline" 
                        type="button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </CardFooter>
                  )}
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingReturnsSection;