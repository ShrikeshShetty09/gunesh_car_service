import { z } from "zod";

export const bookingSchema = z.object({
  pickupLocation: z.string().min(2, "Pickup location required"),
  dropLocation: z.string().min(2, "Drop location required"),
  dateTime: z.string().min(1, "Date & time required"),
  passengers: z.coerce.number().min(1).max(7),
  tripType: z.enum(["NORMAL", "SPECIAL"]),
  phoneNumber: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  specialInstructions: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const priceSchema = z.object({
  bookingId: z.string().min(1),
  amount: z.coerce.number().min(1, "Enter valid price"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
