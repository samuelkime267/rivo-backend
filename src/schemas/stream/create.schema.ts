import { z } from "zod";

export const createStreamSchema = z.object({
  name: z
    .string("Stream name is required")
    .min(3, "Stream name must be at lease 3 characters long"),
  description: z.string().nullable().default(null),
  scheduledFor: z.date("This is not a valid date").nullable().default(null),
  isLive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
});

export type CreateStreamSchemaType = z.infer<typeof createStreamSchema>;
