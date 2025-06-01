import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email({ message: 'Email invalido' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
})

export type SignInSchemaType = z.infer<typeof signInSchema>
