import {} from '@fortawesome/free-regular-svg-icons'
import { Slot } from 'expo-router'

import { ProductDetailHero } from '@/components/product-detail/product-detail-hero'
import { Header } from '@/components/product-detail/products-detail-header'
import { VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'
import { ProductDetailProvider } from '@/providers/product-detail-provider'

export default function ProductDetailLayout() {
  return (
    <ProductDetailProvider>
      <VStack>
        <VStack marginHorizontal={defaultTheme.spacing['6xl']}>
          <Header />
          <ProductDetailHero />
        </VStack>
        <Slot />
      </VStack>
    </ProductDetailProvider>
  )
}
