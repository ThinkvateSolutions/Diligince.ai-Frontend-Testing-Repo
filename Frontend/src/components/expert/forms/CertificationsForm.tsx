import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { Eye } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  certificationName: z
    .string()
    .min(1, { message: "Certification name is required" }),
  issuingOrganization: z
    .string()
    .min(1, { message: "Issuing organization is required" }),
  credentialID: z.string().optional(),
  document: z.any().optional(), // Add file input field
});

const CertificationsForm = () => {
  const [certifications, setCertifications] = useState<
    Array<{
      name: string;
      organization: string;
      id?: string;
      issueDate: Date;
      expiryDate?: Date;
      document?: File;
    }>
  >([
    {
      name: "Certified Welding Inspector",
      organization: "American Welding Society",
      id: "AWS-123456",
      issueDate: new Date(2022, 5, 15),
      expiryDate: new Date(2025, 5, 14),
    },
    {
      name: "Certified Maintenance & Reliability Professional",
      organization: "Society for Maintenance & Reliability Professionals",
      id: "CMRP-789012",
      issueDate: new Date(2021, 8, 22),
    },
  ]);

  const [issueDate, setIssueDate] = useState<Date | undefined>(undefined);
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificationName: "",
      issuingOrganization: "",
      credentialID: "",
      document: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!issueDate) {
      return;
    }

    const newCertification = {
      name: values.certificationName,
      organization: values.issuingOrganization,
      id: values.credentialID,
      issueDate,
      expiryDate,
      document: values.document,
    };

    setCertifications([...certifications, newCertification]);

    form.reset();
    setIssueDate(undefined);
    setExpiryDate(undefined);
  }

  function removeCertification(index: number) {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Certifications</CardTitle>
        <CardDescription>
          Add your professional certifications and credentials to showcase your
          qualifications
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="border-t pt-6">
          <h3 className="text-base font-medium text-gray-800 mb-4">
            Add New Certification
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="certificationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Certified Welding Inspector"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issuingOrganization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issuing Organization</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. American Welding Society"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Credential ID, Issue Date, Expiry Date */}
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="credentialID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Credential ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. AWS-123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="flex flex-col">
                  <FormLabel>Issue Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !issueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {issueDate ? format(issueDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={issueDate}
                        onSelect={setIssueDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>

                <FormItem className="flex flex-col">
                  <FormLabel>Expiry Date (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !expiryDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {expiryDate ? format(expiryDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={expiryDate}
                        onSelect={setExpiryDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              </div>

              {/* Upload Document + Add Button on same line */}
              <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-2/3">
                      <FormLabel>Upload Document (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="file:bg-gray-200 file:text-gray-800 file:font-semibold file:px-2  file:py-full file:border-0 file:rounded-l-md file:cursor-pointer bg-white text-sm rounded-md"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] || undefined)
                          }
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-6 md:mt-8">
                  <Button type="submit">Add</Button>
                </div>
              </div>
            </form>
          </Form>

          <br />
          <hr />
          <br />
        </div>

        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-800 mb-4">
            Your Certifications
          </h3>

          {certifications.length === 0 ? (
            <div className="text-center p-6 border border-dashed rounded-md">
              <p className="text-gray-500">
                No certifications added yet. Add your first certification below.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between bg-gray-50 rounded-md p-4 border"
                >
                  <div>
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-gray-600">{cert.organization}</p>
                    {cert.id && (
                      <p className="text-xs text-gray-500 mt-1">
                        ID: {cert.id}
                      </p>
                    )}
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span>Issued: {format(cert.issueDate, "MMM yyyy")}</span>
                      {cert.expiryDate && (
                        <span>
                          Expires: {format(cert.expiryDate, "MMM yyyy")}
                        </span>
                      )}
                    </div>
                    {cert.document && (
                      <p className="text-xs text-blue-600 mt-2 underline">
                        {cert.document.name}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-5 mt-8">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </>
  );
};

export default CertificationsForm;
