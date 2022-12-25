import { z } from 'zod';

export const FormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must contain at least 3 characters.' })
    .max(50, { message: 'Name must contain at most 50 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Email is invalid.' }),
  message: z
    .string()
    .min(10, { message: 'Message must contain at least 10 characters.' })
    .max(4000, { message: 'Message must contain at most 4000 characters.' }),
});

export type IFormScheme = z.infer<typeof FormSchema>;
