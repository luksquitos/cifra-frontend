import AsyncStorage from '@react-native-async-storage/async-storage'

import { SHIPMENT_STORAGE_KEY } from '@/constants/storage/transporter-key'

export async function storeShipmentId(anId: string): Promise<void> {
  await AsyncStorage.setItem(`${SHIPMENT_STORAGE_KEY}-id`, anId)
}

export async function getShipmentId(): Promise<string | null> {
  const shipment = await AsyncStorage.getItem(`${SHIPMENT_STORAGE_KEY}-id`)

  if (!shipment) {
    return null
  }

  return shipment
}

export async function removeShipmentId(): Promise<void> {
  await AsyncStorage.removeItem(`${SHIPMENT_STORAGE_KEY}-id`)
}
