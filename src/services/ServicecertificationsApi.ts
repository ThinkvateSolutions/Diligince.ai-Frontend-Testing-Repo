import * as z from "zod";

// --- CONTRACTS (TYPES & SCHEMAS) ---

// This schema defines the data shape. The 'file' is handled separately.
const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  issuingOrganization: z.string().min(2),
  issueDate: z.string(), // ISO string format from backend
  expiryDate: z.string().optional(),
  documentName: z.string().optional(),
  isVerified: z.boolean(),
});

// For creating a new certification, id is not needed.
const newCertificationSchema = certificationSchema.omit({ id: true, isVerified: true, documentName: true });

export type Certification = z.infer<typeof certificationSchema>;
export type NewCertificationData = z.infer<typeof newCertificationSchema>;

const API_BASE_URL = "/api";

// --- REUSABLE FETCH ENGINE for MULTIPART/FORM-DATA ---
// This is a special helper for requests that include a file.

async function apiFetchWithFile<T>(
  endpoint: string,
  method: 'POST' | 'PUT',
  data: { [key: string]: any },
  file?: File | null
): Promise<T> {
  const formData = new FormData();

  // Append all key-value pairs from the data object to FormData
  Object.keys(data).forEach(key => {
    // Don't append undefined/null values
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });

  // Append the file if it exists
  if (file) {
    // The key 'document' must match what the backend expects (e.g., from multer)
    formData.append('document', file, file.name);
  }

  try {
    // IMPORTANT: Do NOT set the 'Content-Type' header yourself.
    // The browser will automatically set it to 'multipart/form-data' with the correct boundary.
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ 
        message: 'An unexpected error occurred.' 
      }));
      throw new Error(errorBody.message || `API error: ${response.status}`);
    }

    return response.json() as T;
  } catch (error) {
    console.error(`API Fetch Error (${endpoint}):`, error);
    throw error;
  }
}

// A standard fetch helper for GET/DELETE requests without files
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // ... (this is the same standard apiFetch from previous examples)
  const headers = {'Content-Type': 'application/json', ...options.headers };
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) throw new Error('Network response was not ok');
  if (response.status === 204) return undefined as T;
  return response.json();
}

// --- CERTIFICATIONS API Calls ---

/**
 * Fetches all certifications.
 * Corresponds to: GET /api/certifications
 */
export const getCertifications = (): Promise<Certification[]> => {
  return apiFetch<Certification[]>('/certifications');
};

/**
 * Creates a new certification, potentially with a file.
 * Corresponds to: POST /api/certifications
 */
export const addCertification = (data: NewCertificationData, file: File | null): Promise<Certification> => {
  return apiFetchWithFile<Certification>('/certifications', 'POST', data, file);
};

/**
 * Updates an existing certification, potentially with a new file.
 * Corresponds to: PUT /api/certifications/:id
 */
export const updateCertification = (id: string, data: Partial<NewCertificationData>, file: File | null): Promise<Certification> => {
  return apiFetchWithFile<Certification>(`/certifications/${id}`, 'PUT', data, file);
};

/**
 * Deletes a certification.
 * Corresponds to: DELETE /api/certifications/:id
 */
export const deleteCertification = (id: string): Promise<void> => {
  return apiFetch(`/certifications/${id}`, { method: 'DELETE' });
};

/**
 * Gets a temporary, secure download URL for a certification document.
 * In a real app, this URL might be short-lived for security.
 */
export const getCertificationDocumentUrl = (id: string): string => {
  // This would typically be a backend endpoint that serves the file,
  // but for this example, we construct the URL directly.
  return `${API_BASE_URL}/certifications/${id}/download`;
};