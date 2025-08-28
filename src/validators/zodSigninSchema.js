import { z } from 'zod';

export const zodSigninSchema = z.object({
    password: z.string().min(5),
}).and(
    z.object({
        email: z.string().email()
    }).or(
        z.object({
            username: z.string().min(5)
        })
    )
);