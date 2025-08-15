
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import apiRoutes from "@/api/apiRoutes";
import axiosInstance from "@/api/axiosInstances";

const API_URL = "http://localhost:5000";



const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  rememberMe: z.boolean().default(false),
  type: z.enum(["Industry", "Professional", "Vendor"]).default("Industry"),
});


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      type: (typeParam as "Industry" | "Professional" | "Vendor") || "Industry",
    },
  });
  const watchedEmail = form.watch("email");
  const watchedPassword = form.watch("password");
 async function onSubmit(values: z.infer<typeof formSchema>) {

  setIsLoading(true);

  try {
    const url = apiRoutes.user.login
    const response = await axiosInstance.post(url, {
      email: values.email,
      password: values.password,
      type: values.type,
    });

if (response.data.status) {
  // Store token in localStorage
  localStorage.setItem("token", response.data.meta.access_token);
  // Correct way to log user._id
  console.log(response.data.data._id);
  localStorage.setItem("userInfo", response.data.data);
  // Set user data in context/state if needed
  // userContext.setUser(response.data.user);

  toast.success("Successfully signed in!", {
    description: "Welcome back to diligince.ai",
  });


      // Redirect based on type
      setTimeout(() => {
  console.log("Navigating to", `/${values.type}-profile`);
  navigate(`/${values.type}-profile`);
}, 1000);

    } else {
      toast.error("Login failed", {
        description: response.data.message || "Invalid credentials",
      });
    }
  } catch (error: any) {
    // Enhanced error handling
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        "Something went wrong";
    
    toast.error("Login error", {
      description: errorMessage,
    });
    
    console.error("Login error details:", {
      error: error.response?.data || error.message
    });
  } finally {
    setIsLoading(false);
  }
}


  // Handle social login
  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} Sign-In clicked`, {
      description: "This feature will be available soon",
    });
  };
 
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 mt-16">
        <Card className="w-full max-w-md shadow-lg animate-fade-in">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-primary">Welcome</CardTitle>
            
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="you@example.com" 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      
                      {/* {watchedEmail && (
                          <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
                            <p className="text-xs text-muted-foreground">
                              Email: <span className="font-medium text-foreground"> {watchedEmail}</span>
                            </p>
                          </div>
                        )} */}
                    </FormItem>
                  )}
                />

                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            
                            className="pl-10" 
                            {...field} 
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-3 text-muted-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                      {/* {showPassword && watchedPassword && (
                        <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">{watchedPassword}</span>
                          </p>
                        </div>
                      )} */}

                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Industry">Industry</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                          <SelectItem value="Vendor">Vendor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="rememberMe" 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                        <label 
                          htmlFor="rememberMe" 
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          Remember me
                        </label>
                      </div>
                    )}
                  />
                  
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full hover:scale-105 transition-transform duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
                
                
  
                
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    New here?{" "}
                    <Link to="/signup" className="text-primary font-medium hover:underline">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
