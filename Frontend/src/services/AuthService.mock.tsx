/**
 * This is a MOCK service file.
 * It has the exact same functions as the real `authService.ts`, but instead of
 * making real API calls, it simulates them with a delay.
 * This allows us to test our component's loading, success, and error states
 * without needing a live backend.
 */

import { IndustryRegistrationPayload } from "./AuthServices"; // We can reuse the same type

/**
 * Simulates registering a new industry user.
 * @param payload The user registration data.
 * @returns A promise that resolves on success or rejects on failure.
 */
export const registerIndustryUser = (payload: IndustryRegistrationPayload): Promise<any> => {
  // Log to the browser console so we know the mock is being called.
  console.log("🚀 [MOCK API] Calling registerIndustryUser with payload:", payload);

  // Return a new Promise to simulate an asynchronous network request.
  return new Promise((resolve, reject) => {
    // Simulate a 1.5-second network delay
    setTimeout(() => {
      // --- MOCK LOGIC: Simulate different backend responses ---

      // SCENARIO 1: Simulate a "409 Conflict" error (email already exists)
      if (payload.email === "already-exists@example.com") {
        console.error("🚫 [MOCK API] Simulating: Email already exists.");
        // Reject the promise to simulate an API error.
        // This is what `axios` would do on a 4xx or 5xx response.
        reject(new Error("This email address is already registered."));
        return;
      }

      // SCENARIO 2: Simulate a generic "500 Internal Server Error"
      if (payload.companyName.toLowerCase() === "error") {
        console.error("🚫 [MOCK API] Simulating: Internal Server Error.");
        reject(new Error("The server encountered an unexpected error. Please try again."));
        return;
      }

      // --- MOCK SUCCESS ---
      // If no error conditions were met, simulate a successful registration.
      console.log("✅ [MOCK API] Simulating: Success.");
      resolve({
        success: true,
        message: "Account created successfully!",
        data: {
          userId: `usr_mock_${Date.now()}`,
          company: payload.companyName,
        },
      });

    }, 1500);
  });
};