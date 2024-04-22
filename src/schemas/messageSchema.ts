import {z} from "zod"

export const messageSchema = z.object({
    content : z.string()
    .min(6,"message should be minimum of 6 characters")
    .max(300,"message should not be more than 300 characters")
})