import { z } from "zod";

export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Outside Nigeria",
] as const;

// E.164-ish check that also tolerates local Nigerian formats like 08012345678.
const phoneRegex = /^(\+?\d{10,15})$/;

export const waitlistSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Name is too long.")
    .regex(/^[a-zA-Z\s'.-]+$/, "Name can only contain letters, spaces, and punctuation."),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Enter a valid email address.")
    .max(190),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .transform((val) => val.replace(/[\s\-()]/g, ""))
    .refine((val) => phoneRegex.test(val), {
      message: "Enter a valid phone number.",
    }),
  state: z.enum(NIGERIAN_STATES, {
    errorMap: () => ({ message: "Select your state." }),
  }),
  occupation: z
    .string()
    .trim()
    .max(120, "Occupation is too long.")
    .optional()
    .or(z.literal("")),
  consent: z.boolean().optional().default(false),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
