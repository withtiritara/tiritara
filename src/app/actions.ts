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

  // --- Integration with Google Sheets ---
  const googleScriptUrl = "https://script.google.com/macros/s/AKfycbzlh680A1gkpXw0JEiNLC_HYWtL1igVkS1Px_g_ya9HyJ1qnHhKGdk-WVnk_sNxA4AM/exec";
  const sheetData = {
    name: data.name,
    phoneNumber: data.phone,
    email: data.email,
    destination: data.destination,
    price: 10000,
    createdBy: data.name,
    updatedBy: data.name,
    createdDate: new Date().toISOString(),
    lastUpdatedDate: new Date().toISOString()
  };

  try {
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
    });
    const result = await response.json();
    console.log("Submitted to Google Sheet:", result);
  } catch (err) {
    console.error("Google Sheet submission error:", err);
    // Optionally handle sheet submission error, maybe return an error to the user
  }

  // --- Redirect to confirmation page ---
  console.log("Form submitted successfully:", data);

  const paymentId = `pi_${Date.now()}${Math.random().toString(36).substring(2, 9)}`;
  const queryString = new URLSearchParams({
    ...data,
    paymentId: paymentId,
    status: "success",
  }).toString();
  
  redirect(`/confirmation?${queryString}`);
}
