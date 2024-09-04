import { HistoricList } from '@/components/home/historic-list'
import { TopMessage } from '@/components/home/top-message'
import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { History } from 'lucide-react-native'
import { useWindowDimensions } from 'react-native'

export default function Home() {
  const { height } = useWindowDimensions()

  return (
    <Box>
      <TopMessage />
      <Box>
        <VStack className="max-h-full pt-4">
          <Text className="text-lg font-bold text-typography-100">
            Histórico
          </Text>
          <HistoricList />
        </VStack>
      </Box>
    </Box>
  )
}
