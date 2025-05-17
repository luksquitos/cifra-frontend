import { SESSION_STORAGE_KEY } from '@/constants/storage/session-storage-key'
import AsyncStorage from '@react-native-async-storage/async-storage'

import type { User } from '@/@types/user'

export async function storeSession(session: User): Promise<void> {
  await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
}

export async function getSession(): Promise<User | null> {
  const session = await AsyncStorage.getItem(SESSION_STORAGE_KEY)

  if (!session) {
    return null
  }

  return JSON.parse(session) as User
}

export async function removeSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_STORAGE_KEY)
}
