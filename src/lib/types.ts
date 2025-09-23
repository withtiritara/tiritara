import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  destination: z.string({ required_error: "Please select a destination." }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
