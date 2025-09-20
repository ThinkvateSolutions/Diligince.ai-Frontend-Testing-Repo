// src/components/ui/EmailOTPInput.tsx

import React from "react";
import { UseFormReturn, Path, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormItem, FormLabel, FormMessage, FormField } from "@/components/ui/form";
import { Mail, Loader2 } from "lucide-react";

// --- PROPS INTERFACE (UPDATED) ---
// Props are updated to be controlled by the parent form.
// This component is now "dumber" and more reusable.
export interface EmailOTPInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  emailName: Path<T>;
  otpName: Path<T>;
  /** The function to call when the user clicks "Send Code" or "Resend Code". */
  onSendCode: (email: string) => Promise<void> | void;
  /** Prop to indicate if the OTP is currently being sent (for loading states). */
  isSending: boolean;
  /** Prop to control if the email input should be disabled (after OTP is sent). */
  isEmailDisabled: boolean;
  emailLabel?: string;
  otpLabel?: string;
}

// The separate 'otpverify' function is removed as it's not part of the new, streamlined workflow.

export function EmailOTPInput<T extends FieldValues>({
  form,
  emailName,
  otpName,
  onSendCode,
  isSending,
  isEmailDisabled,
  emailLabel = "Email Address",
  otpLabel = "Verification Code",
}: EmailOTPInputProps<T>) {

  // This handler is now simplified. It just calls the function passed via props.
  // The parent form is responsible for validation before calling this.
  const handleSendOrResendCode = async () => {
    // We don't need to get the email value here, as the parent's handler will do it.
    // This makes the component more generic.
    await onSendCode(form.getValues(emailName));
  };

  return (
    <div className="space-y-4">
      {/* --- EMAIL INPUT FIELD --- */}
      <FormField
        control={form.control}
        name={emailName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{emailLabel}</FormLabel>
            <FormControl>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="you@example.com"
                  className="pl-10" // Padding is adjusted for a cleaner look
                  {...field}
                  // The input is disabled based on the prop from the parent form.
                  disabled={isEmailDisabled || isSending}
                />
                {/* The "Send Code" button is only shown if the email is not yet verified */}
                {!isEmailDisabled && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="bg-[#006FFF] text-white absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
                    onClick={handleSendOrResendCode}
                    // Disable the button while an OTP is being sent.
                    disabled={isSending}
                  >
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Send Code"
                    )}
                  </Button>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* --- OTP INPUT FIELD (Conditional) --- */}
      {/* This section now appears based on the prop from the parent, not internal state. */}
      {isEmailDisabled && (
        <FormField
          control={form.control}
          name={otpName}
          render={({ field }) => (
            <FormItem className="animate-fade-in">
              <div className="flex justify-between items-center">
                <FormLabel>{otpLabel}</FormLabel>
                {/* "Resend Code" button is a better user experience. */}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-xs"
                  onClick={handleSendOrResendCode}
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Resend Code"}
                </Button>
              </div>
              <FormControl>
                <Input
                  placeholder="Enter the 6-digit code"
                  maxLength={6}
                  {...field}
                  onChange={(e) => {
                    // Only allow numeric input
                    const numericValue = e.target.value.replace(/\D/g, '');
                    field.onChange(numericValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}