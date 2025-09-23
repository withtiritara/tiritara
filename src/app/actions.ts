"use server";

import { redirect } from "next/navigation";
import { bookingSchema, type BookingFormValues } from "@/lib/types";

export async function submitBooking(
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = bookingSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error: Please check the form fields.",
    };
  }

  const data: BookingFormValues = validatedFields.data;

  // --- Integration Simulation ---
  // In a real-world application, you would perform the following actions here:
  
  // 1. Save to Google Sheets/Excel:
  // Use the Google Sheets API to append a new row with the form data.
  // console.log("Simulating: Saving to Google Sheets...", data);

  // 2. Redirect to Zoho for Payment:
  // Construct the Zoho/PhonePe payment URL with user details and amount.
  // This redirect would lead the user to the payment gateway.
  // After payment, Zoho would redirect back to your /confirmation or /error page.
  
  // For this demo, we'll redirect directly to the confirmation page,
  // passing form data and a simulated payment ID in the URL.
  
  console.log("Form submitted successfully:", data);

  const paymentId = `pi_${Date.now()}${Math.random().toString(36).substring(2, 9)}`;
  const queryString = new URLSearchParams({
    ...data,
    paymentId: paymentId,
    status: "success",
  }).toString();
  
  redirect(`/confirmation?${queryString}`);
}
