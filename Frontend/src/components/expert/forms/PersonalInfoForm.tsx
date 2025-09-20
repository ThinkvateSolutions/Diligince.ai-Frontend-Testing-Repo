import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Schema validation
const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  primaryExpertise: z.string().min(1, { message: "Primary expertise is required" }),
 bio: z
  .string()
  .min(50, { message: "Bio must be at least 50 characters" })
  .max(1000, { message: "Bio must be at most 1000 characters" }),

  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  phone1: z
  .string()
  .optional()
  .refine((val) => !val || /^\d{10}$/.test(val), {
    message: "Phone number must be 10 digits",
  }),
   phone2: z
  .string()
  .optional()
  .refine((val) => !val || /^\d{10}$/.test(val), {
    message: "Phone number must be 10 digits",
  }),
  location: z.string().min(1, { message: "Location is required" }),
  workRadius: z.string().min(1, { message: "Work radius is required" }),
  languages: z.array(z.string()).min(1, { message: "At least one language is required" }),
  dailyRate: z.string().min(1, { message: "Daily rate is required" }),
});

const expertiseOptions = [
  "Automation", "Chemical Engineering", "Civil Engineering", "Electrical Engineering",
  "HVAC", "Instrumentation", "Mechanical Engineering", "Plumbing",
  "Process Control", "Quality Control", "Safety Compliance", "Welding",
];

const workRadiusOptions = [
  "5 km", "10 km", "25 km", "50 km", "100 km", "Anywhere in City",
  "Statewide", "Nationwide", "Remote Only",
];

const languageOptions = [
  "Bengali", "English", "Gujarati", "Hindi", "Kannada",
  "Malayalam", "Marathi", "Punjabi", "Tamil", "Telugu",
];

const defaultData = {
  fullName: "Rahul Sharma",
  primaryExpertise: "Mechanical Engineering",
  bio: "Experienced mechanical engineer specializing in industrial machinery maintenance and troubleshooting.",
  email: "rahul.sharma@example.com",
  phone: "9876543210",
  phone1: "0855424678",
  phone2: "9876543210",
  location: "Mumbai, Maharashtra",
  workRadius: "50 km",
  languages: ["English", "Hindi"],
  dailyRate: "₹5,000",
};

const PersonalInfoForm = () => {
  const storedData = localStorage.getItem("personalInfo");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: storedData ? JSON.parse(storedData) : defaultData,
  });

  const { isDirty } = form.formState;

  useEffect(() => {
    if (storedData) {
      form.reset(JSON.parse(storedData));
    }
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const previousData = JSON.parse(localStorage.getItem("personalInfo") || "{}");

    const changedFields = Object.entries(values).filter(
      ([key, value]) => JSON.stringify(value) !== JSON.stringify(previousData[key as keyof typeof previousData])
    );

    if (changedFields.length === 0) {
      toast("No changes detected.");
      return;
    }

    if (changedFields.length === 1) {
      const fieldName = changedFields[0][0]
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (c) => c.toUpperCase());
      toast(`${fieldName} updated.`);
    } else {
      toast("Your profile has been updated.");
    }

    localStorage.setItem("personalInfo", JSON.stringify(values));
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal and professional details
        </CardDescription>
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
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="primaryExpertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Expertise</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary expertise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {expertiseOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
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
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your professional background, expertise, and key accomplishments"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your contact number"
                        maxLength={10}
                        pattern="\d{10}"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                control={form.control}
                name="phone1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Landline(optional) </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your contact number"
                        maxLength={10}
                        pattern="\d{10}"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phone2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fax(optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your contact number"
                        maxLength={10}
                        pattern="\d{10}"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State" {...field} />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="How far are you willing to travel?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {workRadiusOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Multi-Select Languages with Checkboxes */}
            <FormField
              control={form.control}
              name="languages"
              render={() => (
                <FormItem>
                  <FormLabel>Languages</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {languageOptions.map((language) => (
                      <FormField
                        key={language}
                        control={form.control}
                        name="languages"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={language}
                              className="flex flex-row items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(language)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, language])
                                      : field.onChange(field.value.filter((val) => val !== language));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{language}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

           

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="submit">Save</Button>
              <Button
                variant="outline"
                type="button"
                disabled={!isDirty}
                onClick={() => {
                  const stored = localStorage.getItem("personalInfo");
                  if (stored) {
                    form.reset(JSON.parse(stored));
                    toast("Changes reverted.");
                  } else {
                    form.reset(defaultData);
                    toast("Reverted to default data.");
                  }
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default PersonalInfoForm;
