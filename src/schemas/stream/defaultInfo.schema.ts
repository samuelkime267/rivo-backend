import { z } from "zod";

export const defaultStreamInfoSchema = z.object({
  name: z
    .string("Stream name is required")
    .min(3, "Stream name must be at lease 3 characters long"),
  description: z.string().nullable().default(null),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
});

export type DefaultStreamInfoSchemaType = z.infer<
  typeof defaultStreamInfoSchema
>;
