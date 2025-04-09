import { z } from "zod";

export const userBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
export type UserBodyInput = z.infer<typeof userBodySchema>;

export const userParamsSchema = z.object({
  id: z.string().transform(Number),
});
export type UserParamsInput = z.infer<typeof userParamsSchema>;
