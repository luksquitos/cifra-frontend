import {} from '@fortawesome/free-regular-svg-icons'
import { Slot } from 'expo-router'

import { ProductDetailHero } from '@/components/product-detail/product-detail-hero'
import { Header } from '@/components/product-detail/products-detail-header'
import { VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'
import { ProductDetailProvider } from '@/providers/product-detail-provider'
import { useTheme } from '@/providers/theme-provider'

export default function ProductDetailLayout() {
  const { theme } = useTheme()
  return (
    <ProductDetailProvider>
      <VStack style={{ flex: 1 }}>
        <VStack backgroundColor={theme.colors.gray[0]} paddingHorizontal={defaultTheme.spacing['6xl']}>
          <Header />
          <ProductDetailHero />
        </VStack>
        <VStack style={{ flex: 1 }}>
          <Slot />
        </VStack>
      </VStack>
    </ProductDetailProvider>
  )
}
