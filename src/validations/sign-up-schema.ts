import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
  confirmPassword: z.string().min(1, { message: 'Confirmação de senha é obrigatória' }),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      path: ['confirmPassword'],
      message: 'As senhas não coincidem',
      code: z.ZodIssueCode.custom,
    })
  }
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>
