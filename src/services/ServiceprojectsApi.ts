import * as z from "zod";

// --- CONTRACTS (TYPES & SCHEMAS) ---

// Defines the data shape for a project returned from the backend.
// Dates are expected as ISO strings, images as an array of URLs or filenames.
const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  client: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  duration: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  outcomes: z.string(),
  images: z.array(z.string()), // Backend returns image URLs/names
});

// For creating a new project, we omit server-generated fields.
const newProjectSchema = projectSchema.omit({ id: true, duration: true, images: true });

export type Project = z.infer<typeof projectSchema>;
export type NewProjectData = z.infer<typeof newProjectSchema>;

const API_BASE_URL = "/api";

// --- REUSABLE FETCH ENGINE for MULTIPLE FILES ---

async function apiFetchWithFiles<T>(
  endpoint: string,
  method: 'POST' | 'PUT',
  jsonData: { [key: string]: any },
  files: File[]
): Promise<T> {
  const formData = new FormData();

  // Append the JSON data as a single string.
  // The backend will parse this string to get the project details.
  formData.append('data', JSON.stringify(jsonData));

  // Append each file. The key 'images' must match what the backend expects.
  files.forEach(file => {
    formData.append('images', file, file.name);
  });

  try {
    // IMPORTANT: Let the browser set the Content-Type header for FormData.
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: 'An unexpected error occurred.' }));
      throw new Error(errorBody.message || `API error: ${response.status}`);
    }

    return response.json() as T;
  } catch (error) {
    console.error(`API Fetch Error (${endpoint}):`, error);
    throw error;
  }
}

// A standard fetch helper for GET/DELETE requests
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {'Content-Type': 'application/json', ...options.headers };
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: 'An unexpected error occurred.' }));
      throw new Error(errorBody.message || `API error: ${response.status}`);
    }
    if (response.status === 204) return undefined as T;
    return response.json();
  } catch (error) {
      console.error(`API Fetch Error (${endpoint}):`, error);
      throw error;
  }
}

// --- PROJECTS PORTFOLIO API Calls ---

/**
 * Fetches all projects.
 * Corresponds to: GET /api/projects
 */
export const getProjects = (): Promise<Project[]> => {
  return apiFetch<Project[]>('/projects');
};

/**
 * Creates a new project with its data and files.
 * Corresponds to: POST /api/projects
 */
export const addProject = (data: NewProjectData, files: File[]): Promise<Project> => {
  return apiFetchWithFiles<Project>('/projects', 'POST', data, files);
};

/**
 * Updates an existing project.
 * Corresponds to: PUT /api/projects/:id
 * @param id - The ID of the project to update.
 * @param data - The form data, which should include a list of existing images to keep.
 * @param newFiles - An array of new files to upload.
 */
export const updateProject = (id: string, data: { [key: string]: any }, newFiles: File[]): Promise<Project> => {
  return apiFetchWithFiles<Project>(`/projects/${id}`, 'PUT', data, newFiles);
};

/**
 * Deletes a project.
 * Corresponds to: DELETE /api/projects/:id
 */
export const deleteProject = (id: string): Promise<void> => {
  return apiFetch(`/projects/${id}`, { method: 'DELETE' });
};

/**
 * Gets a temporary, secure download URL for a project document.
 */
export const getProjectDocumentUrl = (projectId: string, fileName: string): string => {
  // The filename needs to be encoded in case it contains special characters.
  return `${API_BASE_URL}/projects/${projectId}/download/${encodeURIComponent(fileName)}`;
};