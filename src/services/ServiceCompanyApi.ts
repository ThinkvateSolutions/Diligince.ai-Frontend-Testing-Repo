import * as z from "zod";

// In a real monorepo, this Zod schema could be shared in a common package.
// For now, we define it here to ensure type consistency with the form.
const formSchema = z.object({
  companyName: z.string().min(2),
  industryFocus: z.array(z.string()).min(1),
  companyDescription: z.string().min(10).max(1000),
  gstNumber: z.string().optional(),
  registrationNumber: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().optional(),
  mobile: z.string().optional(),
  fax: z.string().optional(),
  address1: z.string().min(5),
  address2: z.string().optional(),
  companySize: z.string().min(1),
  yearEstablished: z.string().regex(/^\d{4}$/),
});

// --- TYPE DEFINITIONS for API Communication ---

export type CompanyInfoData = z.infer<typeof formSchema>;

export type GstVerificationResponse = {
  status: 'success' | 'not_found' | 'error';
  legalName?: string;
  message: string;
};

export type RegNoVerificationResponse = {
  status: 'success' | 'error';
  message: string;
};

export type OtpVerificationResponse = {
  success: boolean;
  message: string;
};

// This should point to your backend's base URL.
// Using a relative path is common when proxying requests in development.
const API_BASE_URL = "/api"; 

/**
 * A reusable helper function to handle fetch requests and standardized error handling.
 * @param endpoint - The API endpoint to call (e.g., '/company-info').
 * @param options - Standard fetch options (method, body, etc.).
 * @returns The parsed JSON response.
 * @throws An error with a user-friendly message if the request fails.
 */
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

    // If the response is not OK, try to parse the error from the body.
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ 
        message: 'An unexpected error occurred. Please try again later.' 
      }));
      throw new Error(errorBody.message || `API error: ${response.status}`);
    }

    // Handle successful responses that don't have a body (e.g., 204 No Content).
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as T;
  } catch (error) {
    // Re-throw network errors or errors from the server for the calling code to handle.
    console.error(`API Fetch Error (${endpoint}):`, error);
    throw error;
  }
}

// --- Company Info API Calls ---

/**
 * Fetches the current company information from the server.
 * Used to populate the form on initial load.
 */
export const getCompanyInfo = (): Promise<CompanyInfoData> => {
  return apiFetch<CompanyInfoData>('/company-info');
};

/**
 * Updates the company information on the server.
 * @param data - The complete company information form data.
 */
export const updateCompanyInfo = (data: CompanyInfoData): Promise<void> => {
  return apiFetch('/company-info', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// --- Verification API Calls ---

/**
 * Sends a GST number to the backend for verification.
 * @param gstNumber - The GSTIN to verify.
 */
export const verifyGst = (gstNumber: string): Promise<GstVerificationResponse> => {
  return apiFetch<GstVerificationResponse>('/verify/gst', {
    method: 'POST',
    body: JSON.stringify({ gstNumber }),
  });
};

/**
 * Sends a registration number to the backend for verification.
 * @param registrationNumber - The registration number to verify.
 */
export const verifyRegNo = (registrationNumber: string): Promise<RegNoVerificationResponse> => {
  return apiFetch<RegNoVerificationResponse>('/verify/reg-no', {
    method: 'POST',
    body: JSON.stringify({ registrationNumber }),
  });
};


// --- OTP API Calls ---

/**
 * Requests an OTP to be sent to the provided email address.
 * @param email - The user's email address.
 */
export const sendEmailOtp = (email: string): Promise<void> => {
  return apiFetch('/otp/send-email', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

/**
 * Verifies an email OTP with the backend.
 * @param email - The user's email address.
 * @param otp - The OTP entered by the user.
 */
export const verifyEmailOtp = (email: string, otp: string): Promise<OtpVerificationResponse> => {
  return apiFetch<OtpVerificationResponse>('/otp/verify-email', {
    method: 'POST',
    body: JSON.stringify({ email, otp }),
  });
};

/**
 * Requests an OTP to be sent to the provided mobile number.
 * @param mobile - The user's mobile number.
 */
export const sendMobileOtp = (mobile: string): Promise<void> => {
  return apiFetch('/otp/send-mobile', {
    method: 'POST',
    body: JSON.stringify({ mobile }),
  });
};

/**
 * Verifies a mobile OTP with the backend.
 * @param mobile - The user's mobile number.
 * @param otp - The OTP entered by the user.
 */
export const verifyMobileOtp = (mobile: string, otp: string): Promise<OtpVerificationResponse> => {
  return apiFetch<OtpVerificationResponse>('/otp/verify-mobile', {
    method: 'POST',
    body: JSON.stringify({ mobile, otp }),
  });
};