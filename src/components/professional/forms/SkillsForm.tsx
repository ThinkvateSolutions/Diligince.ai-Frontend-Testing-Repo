// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Plus, Minus, Trash } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const formSchema = z.object({
//   primarySkill: z.string().min(1, { message: "Primary skill is required" }),
//   yearsOfExperience: z
//     .string()
//     .min(1, { message: "Years of experience is required" }),
//   skillLevel: z.string().min(1, { message: "Skill level is required" }),
// });

// const skillOptions = [
//   "3D Printing",
//   "Automation",
//   "CAD Design",
//   "CNC Operation",
//   "Electrical Troubleshooting",
//   "HVAC Systems",
//   "Hydraulics",
//   "Instrumentation",
//   "Machining",
//   "Maintenance",
//   "Pneumatics",
//   "PLC Programming",
//   "Process Control",
//   "Quality Control",
//   "Robotics",
//   "Welding",
// ];


// const experienceOptions = [
//   "Less than 1 year",
//   "1-2 years",
//   "3-5 years",
//   "5-7 years",
//   "7-10 years",
//   "10+ years",
// ];

// const levelOptions = ["Beginner", "Intermediate", "Advanced", "Expert"];

// const SkillsForm = () => {
//   const [skills, setSkills] = useState<
//     Array<{ name: string; experience: string; level: string }>
//   >([
//     { name: "Welding", experience: "5-7 years", level: "Expert" },
//     { name: "CAD Design", experience: "3-5 years", level: "Advanced" },
//     { name: "Maintenance", experience: "7-10 years", level: "Expert" },
//   ]);

//   const [visibleLevels, setVisibleLevels] = useState<string[]>([]);

//   const toggleLevel = (lvl: string) => {
//     setVisibleLevels((prev) =>
//       prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
//     );
//   };

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       primarySkill: "",
//       yearsOfExperience: "",
//       skillLevel: "",
//     },
//   });

//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     const newSkill = {
//       name: values.primarySkill,
//       experience: values.yearsOfExperience,
//       level: values.skillLevel,
//     };

//     setSkills([...skills, newSkill]);
//     form.reset();
//   };

//   const removeSkill = (index: number) => {
//     const updated = [...skills];
//     updated.splice(index, 1);
//     setSkills(updated);
//   };

//   return (
//     <>
//       <CardHeader>
//         <CardTitle>Skills & Expertise</CardTitle>
//         <CardDescription>
//           Add your technical skills and expertise to help match you with
//           relevant opportunities
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         {/* Add New Skill */}
//         <div className="border-t pt-6">
//           <h3 className="text-base font-medium text-gray-800 mb-4">
//             Add New Skill
//           </h3>

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Skill */}
//                 <FormField
//                   control={form.control}
//                   name="primarySkill"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Skill</FormLabel>
//                       <Select onValueChange={field.onChange} value={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a skill" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {skillOptions.map((option) => (
//                             <SelectItem key={option} value={option}>
//                               {option}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Experience */}
//                 <FormField
//                   control={form.control}
//                   name="yearsOfExperience"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Experience</FormLabel>
//                       <Select onValueChange={field.onChange} value={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Years of experience" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {experienceOptions.map((option) => (
//                             <SelectItem key={option} value={option}>
//                               {option}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Level */}
//                 <FormField
//                   control={form.control}
//                   name="skillLevel"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Proficiency Level</FormLabel>
//                       <Select onValueChange={field.onChange} value={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select level" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {levelOptions.map((option) => (
//                             <SelectItem key={option} value={option}>
//                               {option}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="flex justify-end">
//                 <Button type="submit">Add</Button>
//               </div>
//             </form>
//           </Form>
//           <br />
//           <hr />
//           <br />
//         </div>

//         {/* Display Skills by Level */}
//         <div className="mb-8">
//           <h3 className="text-base font-medium text-gray-800 mb-4">
//             Your Skills
//           </h3>

//           {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => {
//             const filteredSkills = skills.filter((s) => s.level === level);
//             if (filteredSkills.length === 0) return null;

//             const isOpen = visibleLevels.includes(level);

//             return (
//               <div key={level} className="mb-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <h4 className="text-purple-700 text-sm font-semibold">
//                     {level} {"{" + filteredSkills.length + "}"}  
//                   </h4>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => toggleLevel(level)}
//                   >
//                     {isOpen ? <Minus /> : <Plus />}
//                   </Button>
//                 </div>

//                 {isOpen && (
//                   <table className="min-w-full bg-white border border-gray-200 text-sm">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="text-left p-2 border-b">Skill</th>
//                         <th className="text-left p-2 border-b">Experience</th>
//                         <th className="text-center p-2 border-b">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredSkills.map((skill, index) => (
//                         <tr
//                           key={`${level}-${index}`}
//                           className="border-b hover:bg-gray-50"
//                         >
//                           <td className="p-2">{skill.name}</td>
//                           <td className="p-2">{skill.experience}</td>
//                           <td className="p-2 text-center">
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 removeSkill(skills.indexOf(skill))
//                               }
//                               className="text-gray-400 hover:text-red-500 transition-colors"
//                             >
//                               <Trash className="w-4 h-4 text-red-500" />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </CardContent>
//     </>
//   );
// };

// export default SkillsForm;





"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash } from "lucide-react";
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
} from "@/components/ui/form";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  primarySkill: z.string().min(1, { message: "Primary skill is required" }),
  yearsOfExperience: z
    .string()
    .min(1, { message: "Years of experience is required" }),
  skillLevel: z.string().min(1, { message: "Skill level is required" }),
});

const skillOptions = [
  "3D Printing", "Automation", "CAD Design", "CNC Operation", "Electrical Troubleshooting",
  "HVAC Systems", "Hydraulics", "Instrumentation", "Machining", "Maintenance",
  "Pneumatics", "PLC Programming", "Process Control", "Quality Control", "Robotics", "Welding",
];

const experienceOptions = [
  "Less than 1 year", "1-2 years", "3-5 years", "5-7 years", "7-10 years", "10+ years",
];

const levelOptions = ["Beginner", "Intermediate", "Advanced", "Expert"];

  
const SkillsForm = () => {
  const [skills, setSkills] = useState<
    Array<{ _id?: string; name: string; experience: string; level: string }>
  >([]);

  const [visibleLevels, setVisibleLevels] = useState<string[]>([]);

  const toggleLevel = (lvl: string) => {
    setVisibleLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primarySkill: "",
      yearsOfExperience: "",
      skillLevel: "",
    },
  });

  // ✅ Load existing skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("/api/profile/skills");
       setSkills(res.data.skills || []);

      } catch (err) {
        toast.error("Failed to load skills");
      }
    };

    fetchSkills();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newSkill = {
      name: values.primarySkill,
      experience: values.yearsOfExperience,
      level: values.skillLevel,
    };

    try {
      const res = await axios.post("/api/profile/skills", newSkill);
      setSkills([...skills, res.data]); // Assume backend returns saved skill with _id
      form.reset();
      toast.success("Skill added");
    } catch (err) {
      toast.error("Failed to add skill");
    }
  };

  const removeSkill = async (index: number) => {
    const skill = skills[index];
    if (skill._id) {
      try {
        await axios.delete(`/api/profile/skills/${skill._id}`);
      } catch (err) {
        toast.error("Failed to delete skill");
        return;
      }
    }
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
    toast.info("Skill removed");
  };
const [showInfo, setShowInfo] = useState(false);
  return (
    <>
     <div className="flex flex-col md:flex-row md:items-start md:justify-between mt-6 ml-6">
  {/* Left side - Title + Info */}
  <div className="flex flex-col">
    <div className="flex items-center">
      <CardTitle className="mr-2">Skills & Expertise</CardTitle>
      <button
        type="button"
        onClick={() => setShowInfo(!showInfo)}
        className="text-black opacity-70 hover:opacity-100 transition"
      >
        <Info className="w-6 h-6" />
      </button>
    </div>

    {/* Fixed space for description */}
    <div className="min-h-[24px] ml-0"> {/* Removed ml-6 to align with title */}
      {showInfo && (
        <div className="text-sm text-muted-foreground mt-1">
          Add your technical skills and expertise to help match you with relevant opportunities
        </div>
      )}
    </div>
  </div>

  {/* Right side - Optional action button would go here */}
  {/* Example:
  <Button variant="outline" size="sm" className="mt-[8px]">
    <Plus className="w-4 h-4 mr-2" /> Add Skill
  </Button>
  */}
</div>
      <CardContent>
        {/* Add New Skill */}
        <div className=" pt-6">
          <h3 className="text-base font-medium text-gray-800 mb-4">Add New Skill</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="primarySkill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a skill" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skillOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Years of experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {experienceOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proficiency Level</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levelOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-[#6A1B9A] text-white hover:bg-[#4A148C]">Add</Button>
              </div>
            </form>
          </Form>
          <br />
          <hr />
          <br />
        </div>

        {/* Display Skills by Level */}
        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-800 mb-4">Your Skills</h3>

          {levelOptions.map((level) => {
            const filteredSkills = skills.filter((s) => s.level === level);
            if (filteredSkills.length === 0) return null;

            const isOpen = visibleLevels.includes(level);

            return (
              <div key={level} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-purple-700 text-sm font-semibold">
                    {level} {"{" + filteredSkills.length + "}"}
                  </h4>
                  <Button variant="ghost" size="icon" onClick={() => toggleLevel(level)}>
                    {isOpen ? <Minus /> : <Plus />}
                  </Button>
                </div>

                {isOpen && (
                  <table className="min-w-full bg-white border border-gray-200 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left p-2 border-b">Skill</th>
                        <th className="text-left p-2 border-b">Experience</th>
                        <th className="text-center p-2 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSkills.map((skill, index) => (
                        <tr key={`${level}-${index}`} className="border-b hover:bg-gray-50">
                          <td className="p-2">{skill.name}</td>
                          <td className="p-2">{skill.experience}</td>
                          <td className="p-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeSkill(skills.indexOf(skill))}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash className="w-4 h-4 text-red-500" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </>
  );
};

export default SkillsForm;
