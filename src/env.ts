import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  EXPO_PUBLIC_API_URL: z.string().url(),

})

// eslint-disable-next-line node/no-process-env
const parsedEnv = envSchema.safeParse(process.env)

if (parsedEnv.error) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
