import { z } from 'zod'

export const createListSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
})

export type CreateListSchemaType = z.infer<typeof createListSchema>
