import { z } from "zod";
import { id } from "zod/locales";

export const createProfileSchema = z.object({
  id: z.int,
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  bio: z.string().min(5, "La biografía debe tener al menos 5 caracteres"),
  location: z.string(),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
