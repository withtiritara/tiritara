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

  // --- Redirect to Zoho for payment ---
  const zohoUrl = "https://zohosecurepay.com/checkout/t3p6cag-w4enp3wgf23e1/Travel-Bookings-and-Tour-Packages";
  
  const destinationPrices: { [key: string]: number } = {
    paris: 12000,
    maldives: 15000,
  };
  const price = destinationPrices[data.destination] || 10000;


  const queryString = new URLSearchParams({
    "redirect_url": `https://9000-firebase-studio-1758655134525.cluster-ejd22kqny5htuv5dfowoyipt52.cloudworkstations.dev/confirmation`,
    "name": data.name,
    "email": data.email,
    "phone": data.phone,
    "destination": data.destination,
    "amount": price.toString()
  }).toString();

  redirect(`${zohoUrl}?${queryString}`);
}
