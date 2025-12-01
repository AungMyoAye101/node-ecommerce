import * as z from 'zod';

export const addressSchmea = z.object({
    street: z.string().min(3, "Street must be at least 3 characters long."),
    city: z.string("City is required."),
    state: z.string().optional(),
    country: z.string("Country is required."),
    postalCode: z.string("Postal code is required."),
    phone: z.string("Phone number is required."),
    userId: z.uuid()
})

export type addressType = z.infer<typeof addressSchmea>