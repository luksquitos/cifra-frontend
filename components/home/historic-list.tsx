import { FlatList, useWindowDimensions, View } from 'react-native'
import { HistoricCard } from './historic-card'
import { Center } from '../ui/center'
import { Text } from '../ui/text'

export function HistoricList() {
  const data = [
    { title: 'A01-001', message: 'Saída em 02/03 às 13:30' },
    { title: 'A01-002', message: 'Chegada em 03/03 às 15:00' },
    { title: 'B02-003', message: 'Saída em 04/03 às 09:00' },
    { title: 'C03-004', message: 'Chegada em 05/03 às 11:30' },
    { title: 'D04-005', message: 'Saída em 06/03 às 14:00' },
    { title: 'E05-006', message: 'Chegada em 07/03 às 16:00' },
  ]

  const { height } = useWindowDimensions()
  const listHeight = height - 300

  return (
    <FlatList
      style={{ height: listHeight }}
      ItemSeparatorComponent={() => <View className="h-3" />}
      contentContainerStyle={{ paddingBottom: 150 }}
      data={data}
      keyExtractor={(item, index) => item.title + index}
      renderItem={({ item }) => <HistoricCard {...item} />}
      ListEmptyComponent={() => (
        <Center style={{ height: 300 }}>
          <Text className="text-2xl font-bold text-typography-100">
            Nenhum registro de utilização
          </Text>
        </Center>
      )}
    />
  )
}
