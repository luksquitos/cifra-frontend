import type { LineChartPropsType } from 'react-native-gifted-charts'

import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { format, formatDate, subMonths } from 'date-fns'
import { useEffect, useMemo } from 'react'
import { ActivityIndicator, Dimensions, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'

import type { ProductHistory } from '@/@types/api/products'

import { defaultTheme } from '@/constants/theme'
import { useProductDetail } from '@/providers/product-detail-provider'
import { useTheme } from '@/providers/theme-provider'
import { currencyFormatter } from '@/utils/locale'

import { PointerIcon } from '../icons/pointer-icon'
import { Button } from '../ui/button'
import { Text } from '../ui/text'
import { HStack, VStack } from '../ui/view'

const screenWidth = Dimensions.get('window').width

function customLabel(date: Date) {
  return (
    <View style={{ width: 70, marginLeft: 7 }}>
      <Text style={{ color: defaultTheme.colors.gray[400], fontWeight: 'bold' }}>
        {formatDate(date, 'dd/MM')}
      </Text>
    </View>
  )
}

const abbreviatedMonths = [
  'Jan.',
  'Fev.',
  'Mar.',
  'Abr.',
  'Mai.',
  'Jun.',
  'Jul.',
  'Ago.',
  'Set.',
  'Out.',
  'Nov.',
  'Dez.',
]

function formatData(data: ProductHistory[]): LineChartPropsType['data'] {
  const sortedByDate = data.sort((a, b) => {
    const dateA = new Date(a.created_at)
    const dateB = new Date(b.created_at)
    return dateA.getTime() - dateB.getTime()
  })

  return sortedByDate.map((item) => {
    const date = new Date(item.created_at)
    const day = format(date, 'dd')
    const month = abbreviatedMonths[date.getMonth()]

    return {
      value: Number.parseFloat(item.price),
      label: `${day} de ${month}`,
      labelComponent: () => customLabel(date),
    }
  })
}

function getMaxMinValue(data: ProductHistory[]): number[] {
  return [
    Math.min(...data.map(item => Number.parseFloat(item.price))),
    Math.max(...data.map(item => Number.parseFloat(item.price))),
  ]
}

export function History() {
  const { theme } = useTheme()
  const { productHistoryData, setEndAt, setStartAt, setRangeInMonths, rangeInMonths, isFetchingHistory } = useProductDetail()

  const updateRange = (months: number) => {
    const endAt = new Date()
    const startAt = subMonths(endAt, months)

    setStartAt(startAt)
    setEndAt(endAt)
    setRangeInMonths(months)
  }

  useEffect(() => {
    if (!rangeInMonths) {
      updateRange(1)
    }
  }, [])

  const productHistoryList = useMemo(() => productHistoryData?.results ?? [], [productHistoryData])

  const formattedData = useMemo(() => formatData(productHistoryList), [productHistoryList])
  const minMaxValue = useMemo(() => getMaxMinValue(productHistoryList), [productHistoryList])

  const customYAxisValues = useMemo(() => {
    const [min, max] = minMaxValue
    const diff = max - min
    const padding = diff < 1 ? diff * 0.2 : diff * 0.1
    return [min - padding, max + padding]
  }, [minMaxValue])

  return (
    <VStack alignItems="center" overflow="hidden" flex={1} width="100%" paddingVertical={theme.spacing['8xl']} gap={theme.spacing['8xl']}>
      <VStack width="100%" paddingHorizontal={theme.spacing['6xl']} gap={theme.spacing['4xl']}>
        <Text fontWeight="500" fontSize={theme.spacing['5xl']}>Históricos de preços</Text>
        <HStack gap={theme.spacing['4xl']}>
          {[1, 3, 6, 12].map(months => (
            <Button
              key={months}
              style={{ width: 72, paddingHorizontal: 0, alignItems: 'center' }}
              variant={rangeInMonths === months ? 'secondary' : 'outlined'}
              onPress={() => updateRange(months)}
            >
              {months === 12 ? '1 ano' : `${months} mês${months > 1 ? 'es' : ''}`}
            </Button>
          ))}
        </HStack>
      </VStack>

      <HStack width={screenWidth - 30}>
        {isFetchingHistory
          ? (
              <HStack flex={1} justifyContent="center" alignItems="center" height={220}>
                <ActivityIndicator size={32} />
              </HStack>
            )

          : (
              <LineChart
                width={screenWidth - 80}
                data={formattedData}
                areaChart
                color="#2723D2"
                yAxisThickness={0}
                hideDataPoints
                curved
                height={220}
                startFillColor="rgb(39,35,210)"
                startOpacity={0.4}
                endOpacity={0.04}
                initialSpacing={20}
                noOfSections={6}
                maxValue={customYAxisValues[1] + 5}
                roundToDigits={2}
                isAnimated
                endFillColor="rgb(23, 44, 46)"
                rulesType="solid"
                yAxisTextStyle={{ color: theme.colors.gray[400], fontWeight: 'normal' }}
                rulesColor={theme.colors.gray[400]}
                xAxisColor={theme.colors.gray[400]}
                pointerConfig={{
                  pointerStripColor: theme.colors.gray[700],
                  pointerStripWidth: 1,
                  persistPointer: true,
                  initialPointerIndex: productHistoryList.length !== 0 ? Math.floor(productHistoryList.length / 2) : undefined,
                  initialPointerAppearDelay: 4,
                  strokeDashArray: [4, 5],
                  pointerComponent: () => (
                    <HStack marginLeft={-3} justifyContent="center">
                      <PointerIcon size={16} />
                    </HStack>
                  ),
                  radius: 4,
                  pointerLabelWidth: 86,
                  pointerLabelHeight: 60,
                  autoAdjustPointerLabelPosition: true,
                  pointerLabelComponent: (items: any) => (
                    <VStack borderRadius={4} paddingHorizontal={theme.spacing['2xl']} paddingVertical={8} justifyContent="center" backgroundColor={theme.colors.yellow[300]}>
                      <Text fontSize={theme.font.size.sm} style={{ color: theme.colors.gray[600], fontWeight: 'light' }}>
                        {items[0].label}
                      </Text>
                      <Text fontSize={theme.font.size.sm} style={{ color: theme.colors.gray[600], fontWeight: 'bold' }}>
                        {currencyFormatter(items[0].value)}
                      </Text>
                    </VStack>
                  ),
                }}
              />
            )}
      </HStack>
    </VStack>
  )
}
