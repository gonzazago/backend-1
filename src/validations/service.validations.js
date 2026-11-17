import * as z from "zod";

const ServiceSchema = z.object(
    {
        name: z.string(),
        description: z.string(),
        duration: z.number().min(0),
        price: z.number().min(0),
        category: z.string(),
        availability: z.boolean().optional()
    }
)

export default ServiceSchema;