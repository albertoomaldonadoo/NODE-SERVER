import { z } from "zod";

export const createProfileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  bio: z.string().min(5, "La biografía debe tener al menos 5 caracteres"),
  location: z.string().optional(),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
