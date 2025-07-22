// import { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '@/contexts/UserContext';
// import { useEnhancedApproval } from '@/contexts/EnhancedApprovalContext';
// import { useToast } from '@/hooks/use-toast';
// import { saveUserToRegistry, getUserFromRegistry, checkEmailExists, listAllRegisteredUsers } from '../utils/authUtils';
// import { UserProfile } from '@/types/shared';
// import { PendingUser } from '@/types/pendingUser';

// export const useAuth = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { login, getDashboardUrl } = useUser();
//   const { addPendingUser, checkUserApprovalStatus, initializeCompanyData } = useEnhancedApproval();
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const getVendorDashboardUrl = (userRole: string, vendorCategory?: string) => {
//     if (userRole === 'vendor' && vendorCategory) {
//       switch (vendorCategory) {
//         case 'service':
//           return '/service-vendor-dashboard';
//         case 'product':
//           return '/product-vendor-dashboard';
//         case 'logistics':
//           return '/logistics-vendor-dashboard';
//         default:
//           return '/service-vendor-dashboard';
//       }
//     }
    
//     switch (userRole) {
//       case 'industry':
//         return '/industry-dashboard';
//       case 'professional':
//         return '/professional-dashboard';
//       default:
//         return '/service-vendor-dashboard';
//     }
//   };

//   const generateCompanyId = (companyName: string, email: string) => {
//     const domain = email.split('@')[1] || '';
//     return `company-${companyName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${domain.replace(/[^a-z0-9]/g, '-')}`;
//   };

//   const checkIfCompanyExists = (companyId: string) => {
//     const existingCompanies = JSON.parse(localStorage.getItem('industryCompanies') || '[]');
//     return existingCompanies.find((comp: any) => comp.id === companyId);
//   };

//   const signUp = useCallback(async (userData: UserProfile & { password: string }) => {
//     setIsLoading(true);
    
//     try {
//       console.log("=== SIGNUP PROCESS STARTED ===");
//       console.log("User data for signup:", { ...userData, password: "***" });
      
//       // Check if email already exists
//       if (checkEmailExists(userData.email)) {
//         console.log("Email already exists during signup");
//         toast({
//           title: "Email already exists",
//           description: "An account with this email already exists. Please sign in instead.",
//           variant: "destructive",
//         });
//         return { success: false, error: "Email already exists" };
//       }

//       // For industry users, check if company already exists
//       if (userData.role === 'industry' && userData.profile?.companyName) {
//         const companyId = generateCompanyId(userData.profile.companyName, userData.email);
//         const existingCompany = checkIfCompanyExists(companyId);
        
//         if (existingCompany) {
//           // Company exists - this is a second user
//           const pendingUser: PendingUser = {
//             id: userData.id,
//             email: userData.email,
//             name: userData.name,
//             companyName: userData.profile.companyName,
//             companyId: companyId,
//             requestedRole: 'initiator',
//             signupDate: new Date().toISOString(),
//             status: 'pending',
//             profile: userData.profile
//           };
          
//           // Add to pending users
//           addPendingUser(pendingUser);
          
//           toast({
//             title: "Account pending approval",
//             description: "Your request to join the company has been sent to the administrator for approval.",
//           });
          
//           // Redirect to pending approval page
//           navigate('/pending-approval');
          
//           console.log("=== SIGNUP PROCESS COMPLETED (PENDING) ===");
//           return { success: true, user: userData, status: 'pending' };
//         } else {
//           // First user - becomes admin
//           // Initialize company data BEFORE login
//           try {
//             initializeCompanyData(userData.profile.companyName, userData.email, userData.id);
//             console.log("Company data initialized for first user");
//           } catch (error) {
//             console.error("Error initializing company data:", error);
//           }
//         }
//       }

//       // Save user to registry (for first users or non-industry users)
//       const saved = saveUserToRegistry(userData);
      
//       if (!saved) {
//         console.log("Failed to save user during signup");
//         toast({
//           title: "Sign up failed",
//           description: "Unable to create account. Please try again.",
//           variant: "destructive",
//         });
//         return { success: false, error: "Failed to save user" };
//       }

//       // Remove password before setting user in context
//       const { password, ...userProfile } = userData;
//       console.log("User profile to set in context:", userProfile);
      
//       // Login user AFTER company initialization
//       login(userProfile);
      
//       toast({
//         title: "Sign-up successful!",
//         description: "Welcome to diligince.ai",
//       });

//       // Add a small delay to ensure context state is updated before navigation
//       setTimeout(() => {
//         const dashboardUrl = getVendorDashboardUrl(userProfile.role, userProfile.profile?.vendorCategory);
//         console.log("Redirecting to dashboard:", dashboardUrl);
//         navigate(dashboardUrl);
//       }, 100);

//       console.log("=== SIGNUP PROCESS COMPLETED ===");
//       return { success: true, user: userProfile };
//     } catch (error) {
//       console.error('Sign up error:', error);
//       toast({
//         title: "Sign up error",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       });
//       return { success: false, error: "Unexpected error" };
//     } finally {
//       setIsLoading(false);
//     }
//   }, [login, toast, navigate, addPendingUser, initializeCompanyData]);

// const signIn = useCallback(async (email: string, password: string) => {
//   console.log("=== SIGNIN PROCESS STARTED ===");
//   setIsLoading(true);

//   try {
//     const response = await fetch("http://localhost:8000/api/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("Backend login failed:", data.message);
//       toast({
//         title: "Sign in failed",
//         description: data.message || "Invalid credentials.",
//         variant: "destructive",
//       });
//       return { success: false, error: data.message };
//     }

//     const user = data.user;

//     if (user.role === "industry" && user.profile?.companyName) {
//       const companyId = generateCompanyId(user.profile.companyName, email);
//       const approvalStatus = checkUserApprovalStatus(email, companyId);
//       if (approvalStatus === "pending") {
//         toast({
//           title: "Account pending approval",
//           description: "Your account is still awaiting administrator approval.",
//           variant: "destructive",
//         });
//         navigate("/pending-approval");
//         return { success: false, error: "Account pending approval" };
//       } else if (approvalStatus === "rejected") {
//         toast({
//           title: "Account rejected",
//           description: "Your request to join the company has been rejected.",
//           variant: "destructive",
//         });
//         return { success: false, error: "Account rejected" };
//       }
//     }

//     login(user);

//     toast({
//       title: "Sign in successful!",
//       description: `Welcome back, ${user.name}!`,
//     });

//     const dashboardUrl = getVendorDashboardUrl(user.role, user.profile?.vendorCategory);
//     navigate(dashboardUrl);

//     console.log("=== SIGNIN PROCESS COMPLETED ===");
//     return { success: true, user };
//   } catch (error) {
//     console.error("Sign in error:", error);
//     toast({
//       title: "Sign in error",
//       description: "Server error. Please try again.",
//       variant: "destructive",
//     });
//     return { success: false, error: "Unexpected error" };
//   } finally {
//     setIsLoading(false);
//   }
// }, [login, toast, navigate, checkUserApprovalStatus]);


//   return {
//     signUp,
//     signIn,
//     isLoading
//   };
// };
