import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { FlatList, StyleSheet, Touchable, TouchableOpacity } from 'react-native'

import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'

import { Input } from '../components/ui/input'
import { defaultTheme } from '../constants/theme'
import { ThemeProvider } from '../providers/theme-provider'

const styleSheet = StyleSheet.create({
  header: {
    backgroundColor: defaultTheme.colors.darkBlue[700],
    padding: defaultTheme.spacing['6xl'],
    gap: defaultTheme.spacing['4xl'],
    borderBottomLeftRadius: defaultTheme.radius['2xl'],
    borderBottomRightRadius: defaultTheme.radius['2xl'],
  },
  mapPinIcon: {
    color: defaultTheme.colors.yellow[300],
  },
  bellIcon: {
    color: defaultTheme.colors.gray[0],
  },
  text: {
    color: defaultTheme.colors.gray[0],
  },
  magnifyingGlass: {
    color: defaultTheme.colors.gray[300],
  },
})

export default function RootLayout() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <VStack backgroundColor={defaultTheme.colors.gray[50]} flex={1}>
        <VStack style={styleSheet.header}>
          <HStack justifyContent="space-between" width="100%">
            <HStack gap={defaultTheme.spacing.lg} alignItems="center">
              <FontAwesomeIcon icon={faLocationDot} style={styleSheet.mapPinIcon} />
              <Text color={defaultTheme.colors.gray[0]}>Anápolis, GO - 75020000</Text>
            </HStack>
            <FontAwesomeIcon icon={faBell} style={styleSheet.bellIcon} />
          </HStack>
          <Input preppend={<FontAwesomeIcon icon={faMagnifyingGlass} color={styleSheet.magnifyingGlass.color} />} placeholder="Procure por..." />
        </VStack>
        <VStack gap={defaultTheme.spacing['4xl']} paddingHorizontal={defaultTheme.spacing['6xl']} marginTop={defaultTheme.spacing['6xl']}>
          <Text fontSize={defaultTheme.font.size.lg} fontWeight="500">Categorias</Text>
          <HStack>
            <FlatList
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              keyExtractor={(item, idx) => item + idx.toString()}
              horizontal
              style={{ gap: defaultTheme.spacing.lg, paddingBottom: defaultTheme.spacing.xl }}
              ItemSeparatorComponent={() => <HStack width={defaultTheme.spacing.lg} />}
              renderItem={
                ({ item, index }) =>
                  (
                    <TouchableOpacity>
                      <VStack
                        width={90}
                        height={90}
                        paddingHorizontal={defaultTheme.spacing['2xl']}
                        paddingVertical={defaultTheme.spacing['2xl']}
                        justifyContent="space-between"
                        borderRadius={defaultTheme.radius.xl}
                        backgroundColor={defaultTheme.colors.gray[0]}
                        key={index}
                      >
                        <FontAwesomeIcon
                          color={defaultTheme.colors.yellow[300]}
                          size={defaultTheme.spacing['6xl']}
                          icon={faBell}
                          style={styleSheet.bellIcon}
                        />
                        <Text fontSize={defaultTheme.font.size.sm}>Pisos e revestimentos</Text>
                      </VStack>
                    </TouchableOpacity>
                  )
              }
            />
          </HStack>
        </VStack>
        <VStack gap={defaultTheme.spacing['4xl']} paddingHorizontal={defaultTheme.spacing['6xl']} marginTop={defaultTheme.spacing['6xl']}>
          <Text fontSize={defaultTheme.font.size.lg} fontWeight="500">Categorias</Text>
          <HStack>
            <FlatList
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              keyExtractor={(item, idx) => item + idx.toString()}
              horizontal
              style={{ gap: defaultTheme.spacing.lg, paddingBottom: defaultTheme.spacing.xl }}
              ItemSeparatorComponent={() => <HStack width={defaultTheme.spacing.lg} />}
              renderItem={
                ({ item, index }) =>
                  (
                    <TouchableOpacity>
                      <VStack
                        width={90}
                        height={90}
                        paddingHorizontal={defaultTheme.spacing['2xl']}
                        paddingVertical={defaultTheme.spacing['2xl']}
                        justifyContent="space-between"
                        borderRadius={defaultTheme.radius.xl}
                        backgroundColor={defaultTheme.colors.gray[0]}
                        key={index}
                      >
                        <FontAwesomeIcon
                          color={defaultTheme.colors.yellow[300]}
                          size={defaultTheme.spacing['6xl']}
                          icon={faBell}
                          style={styleSheet.bellIcon}
                        />
                        <Text fontSize={defaultTheme.font.size.sm}>Pisos e revestimentos</Text>
                      </VStack>
                    </TouchableOpacity>
                  )
              }
            />
          </HStack>
        </VStack>
      </VStack>

    </ThemeProvider>
  )
}
