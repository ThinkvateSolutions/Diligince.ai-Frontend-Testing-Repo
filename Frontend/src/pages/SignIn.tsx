
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
import { log } from "console";
import axios from "axios";


const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  rememberMe: z.boolean().default(false),
  type: z.enum(["industry", "professional", "vendor"]).default("industry"),
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
      type: (typeParam as "industry" | "professional" | "vendor") || "industry",
    },
  });
  const watchedEmail = form.watch("email");
  const watchedPassword = form.watch("password");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    
  setIsLoading(true);

  try {
    const response = await axios.post("http://localhost:8000/login", {
      email: values.email,
      password: values.password,
      type: values.type,
      
    });

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      toast.success("Successfully signed in!", {
        description: "Welcome back to diligince.ai",
      });

      // Redirect based on type
      setTimeout(() => {
        switch (values.type) {
          case "industry":
            navigate("/industry-profile");
            break;
          case "professional":
            navigate("/professional-profile");
            break;
          case "vendor":
            navigate("/vendor-profile");
            break;
          default:
            navigate("/");
        }
      }, 1000);
    } 
    else 
    {
      toast.error("Login failed", {
        description: response.data.message || "Invalid credentials",
      });
    }
  } 
  catch (error: any) {
    toast.error("Login error", {
      description: error.response?.data?.message || "Something went wrong",
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
            <CardTitle className="text-2xl font-bold text-primary">Welcome Back</CardTitle>
            <CardDescription>
              Sign in or Log In to manage your industrial needs
            </CardDescription>
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
                      
                      {watchedEmail && (
                          <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
                            <p className="text-xs text-muted-foreground">
                              Email: <span className="font-medium text-foreground"> {watchedEmail}</span>
                            </p>
                          </div>
                        )}
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
                      {showPassword && watchedPassword && (
                        <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">{watchedPassword}</span>
                          </p>
                        </div>
                      )}

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
                          <SelectItem value="industry">Industry</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="vendor">Vendor</SelectItem>
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
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-2 text-muted-foreground text-xs">OR</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                    onClick={() => handleSocialLogin("Google")}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" className="text-red-600">
                      <path
                        fill="currentColor"
                        d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
                      />
                    </svg>
                    Sign in with Google
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 bg-[#0077B5] text-white hover:bg-[#0077B5]/90 hover:scale-105 transition-transform"
                    onClick={() => handleSocialLogin("LinkedIn")}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Sign in with LinkedIn
                  </Button>
                </div>
                
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
