import * as z from "zod";

// --- CONTRACTS (TYPES & SCHEMAS) ---
// This section defines the "language" spoken between the frontend and backend.

// This schema should be the single source of truth for what a "Service" is.
// We copy it from the form to ensure consistency.
const serviceSchema = z.object({
  id: z.string(), // In the backend, the ID is required, not optional.
  name: z.string().min(2),
  description: z.string().min(10).max(500),
  pricingModel: z.string().min(1),
  tags: z.array(z.string()).min(1),
});

// A schema for CREATING a new service. The backend will generate the 'id'.
const newServiceSchema = serviceSchema.omit({ id: true });


// --- TYPE DEFINITIONS for API Communication ---

// The main type for a service object received from the backend.
export type Service = z.infer<typeof serviceSchema>;

// The type for the data we send when creating a new service.
export type NewServiceData = z.infer<typeof newServiceSchema>;

// This should point to your backend's base URL.
const API_BASE_URL = "/api"; 

// --- REUSABLE FETCH ENGINE ---
// This generic helper function is the same as before. It handles all the boilerplate.

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ 
        message: 'An unexpected error occurred. Please try again later.' 
      }));
      throw new Error(errorBody.message || `API error: ${response.status}`);
    }

    if (response.status === 204) { // Handles successful DELETE requests
      return undefined as T;
    }

    return response.json() as T;
  } catch (error) {
    console.error(`API Fetch Error (${endpoint}):`, error);
    throw error;
  }
}

// --- SERVICES & SKILLS API Calls ---

/**
 * Fetches all services from the backend.
 * Corresponds to: GET /api/services
 * @returns A promise that resolves to an array of services.
 */
export const getServices = (): Promise<Service[]> => {
  return apiFetch<Service[]>('/services');
};

/**
 * Creates a new service on the backend.
 * Corresponds to: POST /api/services
 * @param serviceData - The service data to create (without an id).
 * @returns A promise that resolves to the newly created service, including its new id.
 */
export const addService = (serviceData: NewServiceData): Promise<Service> => {
  return apiFetch<Service>('/services', {
    method: 'POST',
    body: JSON.stringify(serviceData),
  });
};

/**
 * Updates an existing service on the backend.
 * Corresponds to: PUT /api/services/:id
 * @param id - The ID of the service to update.
 * @param serviceData - The complete, updated service data.
 * @returns A promise that resolves to the updated service.
 */
export const updateService = (id: string, serviceData: Service): Promise<Service> => {
  return apiFetch<Service>(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(serviceData),
  });
};

/**
 * Deletes a service from the backend.
 * Corresponds to: DELETE /api/services/:id
 * @param id - The ID of the service to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export const deleteService = (id: string): Promise<void> => {
  return apiFetch(`/services/${id}`, {
    method: 'DELETE',
  });
};