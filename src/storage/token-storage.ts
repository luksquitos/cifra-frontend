import AsyncStorage from '@react-native-async-storage/async-storage'

import type { Tokens } from '@/@types/tokens'

import { TOKEN_STORAGE_KEY } from '@/constants/storage/token-storage-key'

export async function storeTokens(tokens: Tokens): Promise<void> {
  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens))
}

export async function getTokens(): Promise<Tokens> {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY)

  if (!token) {
    return {} as Tokens
  }

  return JSON.parse(token) as Tokens
}

export async function removeTokens(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
}
