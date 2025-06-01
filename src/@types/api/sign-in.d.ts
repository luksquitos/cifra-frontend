import type { components } from '../openapi'

export type SignInPayload = components['schemas']['TokenObtainPair']
export type SignInResponse = components['schemas']['AuthTokenResponseSchema']
export type User = components['schemas']['User']
