// src/services/authService.ts
import axios from 'axios';

// --- CONFIGURATION ---
const API_URL = 'http://localhost:8000';

// --- INTERFACES ---
export interface IndustryRegistrationPayload {
  companyName: string;
  email: string;
  phone: string;
  industryType: string;
  password: string;
   type: string;
}

export interface otppayload {
   email : string ;

}

export interface ProfessionalRegistrationPayload {
  fullname: string;
  email: string;
  phonenumber: string;
  areaofexpertise: string;
  password: string;
 
}

export interface VendorRegistrationPayload {
  businessname: string;
  email: string;
  phonenumber: string;
  vendorcategory: string;
  specialization: string;
  password: string;
}

export interface IndustryProfilePayload {
  gst_number: string;
  pan_number: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  website: string;
  description: string;
}



// --- ERROR HANDLER ---
const handleApiError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return new Error(error.response.data.message || 'An unexpected error occurred');
    } else if (error.request) {
      return new Error('No response from server. Please try again.');
    }
  }
  return new Error('An unexpected error occurred');
};

// --- AUTH SERVICE FUNCTIONS ---

// Send OTP to user email

export const sendVerificationOtp = async (payload: otppayload): Promise<void> => {
  try {
    await axios.post(`${API_URL}/api/otp/send`, payload);
  } catch (error) {
    throw handleApiError(error);
  }
};

// Confirm OTP with backend
export const confirmVerificationOtp = async (
  email : string,
  otp: string
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/api/otp/verify`, { email , otp });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};





// Register new industry user
export const registerIndustryUser = async (
  payload: IndustryRegistrationPayload
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/api/signup`, payload);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Register new professional user
export const registerProfessionalUser = async (
  payload: ProfessionalRegistrationPayload
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/professional/register`, payload);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Register new vendor user
export const registerVendorUser = async (
  payload: VendorRegistrationPayload
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/vendor/register`, payload);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Update industry profile
export const updateIndustryProfile = async (
  payload: IndustryProfilePayload
): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}/industry/profile`, payload);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};