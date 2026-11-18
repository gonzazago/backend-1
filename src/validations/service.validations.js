import * as z from "zod";

const ServiceSchema = z.object(
    {
        name: z.string(),
        description: z.string(),
        duration: z.number().min(0),
        price: z.number().min(0),
        category: z.string(),
        availability: z.boolean().optional(),
        capacity: z.number().min(1).optional()
    }
)

export default ServiceSchema;