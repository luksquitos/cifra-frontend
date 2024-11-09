import { ScrollView, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { CategoryItem } from '@/components/routes/search/category-item'
import { ProductItem } from '@/components/routes/search/product-item'
import { HStack } from '@/components/ui/hstack'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { categories } from '@/constants/category-mock'
import { productsByCategory } from '@/constants/items-mock'
import { ArrowRight, Bell, MapPin, Search } from '@/utils/icons'

export default function SearchPage() {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 14

  return (
    <VStack className="flex-1 gap-5" style={{ paddingTop }}>
      <VStack className="mx-[20px] gap-[16px]">
        <HStack className=" items-center justify-between gap-1">
          <HStack className="items-center gap-1">
            <MapPin className="text-typography-600" size={12} />
            <Text className="text-sm">Anápolis, GO - 75020000</Text>
          </HStack>
          <TouchableOpacity>
            <Bell className="text-typography-600" size={14} />
          </TouchableOpacity>
        </HStack>
        <Input
          size="xl"
          className="rounded-md bg-background-0 px-2"
          variant="rounded"
        >
          <InputSlot>
            <InputIcon className="text-typography-300" as={Search} />
          </InputSlot>
          <InputField
            placeholder="Procure por..."
            className="placeholder:text-typography-300"
          />
        </Input>
      </VStack>
      <VStack className="flex-1 bg-background-50 px-[20px] pt-[16px]">
        <VStack className="gap-[16px]">
          <Text className="font-interMedium text-lg">Categorias</Text>
          <ScrollView className="pb-[16px]" horizontal>
            {categories.map((categorie, index) => (
              <CategoryItem {...categorie} key={categorie.title + index} />
            ))}
            <TouchableOpacity className="h-[70px] w-[190px] flex-row items-center rounded-lg border-2 border-background-100 bg-primary-500">
              <Text className="px-[12px] text-typography-50">
                Todas as categorias
              </Text>
              <ArrowRight className="text-typography-50" />
            </TouchableOpacity>
          </ScrollView>
        </VStack>
        <ScrollView>
          {productsByCategory.map(({ category, items }, index) => (
            <VStack className="mb-[8px] gap-[16px]" key={category + index}>
              <Text className="font-interMedium text-lg">{category}</Text>
              <ScrollView className="pb-[16px]" horizontal>
                {items.map((item, index) => (
                  <ProductItem key={item.title + index} {...item} />
                ))}
              </ScrollView>
            </VStack>
          ))}
        </ScrollView>
      </VStack>
    </VStack>
  )
}
