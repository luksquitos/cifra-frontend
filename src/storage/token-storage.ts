import AsyncStorage from '@react-native-async-storage/async-storage'

import type { Tokens } from '@/@types/tokens'

import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '@/constants/storage/token-storage-key'

export async function storeTokens(tokens: Tokens): Promise<void> {
  await storeAccessToken(tokens.accessToken)
  await storeRefreshToken(tokens.refreshToken)
}

export async function storeAccessToken(accessToken: string): Promise<void> {
  await AsyncStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken)
}

export async function storeRefreshToken(refreshToken: string): Promise<void> {
  await AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken)
}

export async function getTokens(): Promise<Tokens> {
  const accessToken = await getAccessToken()
  const refreshToken = await getRefreshToken()

  if (!accessToken || !refreshToken) {
    throw new Error('Tokens not found')
  }

  return {
    accessToken,
    refreshToken,
  }
}

export async function getAccessToken(): Promise<string | null> {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)

  if (!token) {
    return null
  }

  return token
}

export async function getRefreshToken(): Promise<string | null> {
  const token = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)

  if (!token) {
    return null
  }

  return token
}

export async function removeTokens(): Promise<void> {
  await AsyncStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
  await AsyncStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
}
