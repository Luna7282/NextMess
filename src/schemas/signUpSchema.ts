import {z} from "zod"

export const usernamevalidation = z
  .string()
  .min(4,"username must be of 4 characters")
  .max(12,"username must not be more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/,"username must not contain special characters")

  export const signUpSchema = z.object({
    username : usernamevalidation,
    email : z.string().email({message: "Invalid email"}),
    password: z.string().min(6,{message:"password must be of 6 characters"}).max(12,{message:"password must not be more than 6 characters"})
})
  