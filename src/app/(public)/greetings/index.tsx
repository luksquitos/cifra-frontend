import backgroundOnboarding from '@/assets/images/background-onboarding.png'
import illustration from '@/assets/images/greetings-illustration.png'
import { useRouter } from 'expo-router'
import { Image, ImageBackground } from 'react-native'

import { ArrowRight } from '@/components/icons/arrow-right'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { useTheme } from '@/providers/theme-provider'

export default function Greetings() {
  const { theme } = useTheme()
  const router = useRouter()

  return (
    <VStack justifyContent="flex-end" flex={1} backgroundColor={theme.colors.darkBlue[700]}>

      <ImageBackground
        style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
        imageStyle={{ resizeMode: 'cover', position: 'absolute', top: 75, height: 580, bottom: 0 }}
        source={backgroundOnboarding}
      >
        <Image source={illustration} />
      </ImageBackground>

      <VStack borderTopLeftRadius={theme.spacing['2xl']} borderTopRightRadius={theme.spacing['2xl']} paddingVertical={theme.spacing['10xl']} paddingHorizontal={theme.spacing['10xl']} height="40%" backgroundColor={theme.colors.gray[0]} width="100%">
        <VStack gap={theme.spacing['8xl']}>
          <Text width={240} fontSize={theme.font.size['3xl']} fontWeight={theme.font.weight.bold}>Bem vindo ao Cifra!</Text>
          <Text lineHeight={22} fontSize={theme.font.size.lg} color={theme.colors.gray[400]}>
            Simplifique sua busca por materiais de construção, compare preços e crie orçamentos personalizados de forma prática e rápida.
          </Text>
        </VStack>
        <HStack justifyContent="flex-end" flex={1} width="100%">
          <Button
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => router.push('/(public)/sign-in')}
            variant="secondary"
            height={56}
            width={56}
          >
            <ArrowRight />
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}
