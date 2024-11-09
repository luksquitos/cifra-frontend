import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabDescriptor,
  TabView,
} from 'react-native-tab-view'

import { ProductHeader } from '@/components/routes/search/details/product-detail-header'
import { Center } from '@/components/ui/center'
import { Divider } from '@/components/ui/divider'
import { lightTheme } from '@/components/ui/gluestack-ui-provider/config'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { productsByCategory } from '@/constants/items-mock'
import { MapPin } from '@/utils/icons'

type Store = {
  name: string
  price: string
  location: string
  isBestSeller: boolean
}

type Product = {
  id: string
  title: string
  price: string
  description: string
  cardAppend: string
  imageSrc: any
  stores: Store[]
}

type ProductDetailProps = {
  product: Product
}

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'whereToBuy', title: 'Onde comprar' },
    { key: 'history', title: 'Histórico' },
    { key: 'technicalSheet', title: 'Ficha técnica' },
  ])

  const product = productsByCategory
    .flatMap((category) => category.items)
    .find((item) => item.id === id)

  if (!product) {
    return (
      <VStack className="flex-1 items-center justify-center bg-background-0">
        <Text className="text-typography-400">Produto não encontrado</Text>
      </VStack>
    )
  }

  const renderScene = SceneMap({
    whereToBuy: () => <WhereToBuy product={product} />,
    history: History,
    technicalSheet: TechnicalSheet,
  })

  return (
    <VStack className="flex-1">
      <VStack className="mx-[20px]">
        <ProductHeader />
        <Center className="mt-[20px] h-[163px] rounded-lg bg-background-100">
          <Image
            source={product.imageSrc}
            alt=""
            style={{ width: '80%', height: '80%', resizeMode: 'contain' }}
          />
        </Center>
        <Text className="mt-[24px] font-interBold text-[20px]">
          {product.title}
        </Text>
      </VStack>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={CustomTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={{ backgroundColor: 'transparent' }}
      />
    </VStack>
  )
}

function WhereToBuy({ product }: ProductDetailProps) {
  const bestSeller = product.stores.find((store) => store.isBestSeller)
  const otherStores = product.stores.filter((store) => !store.isBestSeller)

  return (
    <VStack className="flex-1 bg-background-0">
      <ScrollView className="mx-[10px] my-[24px] flex-1 px-[10px]">
        {bestSeller && (
          <TouchableOpacity>
            <Text className="w-[180px] rounded-t-md bg-primary-600 text-center text-typography-50">
              Melhor local de compra
            </Text>
            <HStack className="h-[124px] rounded-md rounded-tl-none border-2 border-primary-600">
              <Center className="h-full w-[120px] rounded-md bg-background-50">
                <Image
                  style={{
                    width: '70%',
                    height: '70%',
                    resizeMode: 'contain',
                    borderRadius: 8,
                  }}
                  source={product.imageSrc}
                  alt=""
                />
              </Center>
              <VStack className="mx-[20px] my-[20px] ">
                <VStack>
                  <Text className="font-interMedium text-[16px]">
                    {bestSeller.name}
                  </Text>
                  <HStack className="items-center">
                    <MapPin className="text-primary-600" size={12} />
                    <Text className="mb-1 text-[12px] text-primary-600">
                      {bestSeller.location}
                    </Text>
                  </HStack>
                </VStack>
                <VStack>
                  <Text className="font-interBold">{bestSeller.price}</Text>
                  <Text className="mt-[-2px] text-typography-400">
                    {product.description}
                  </Text>
                </VStack>
              </VStack>
            </HStack>
            <Divider className="my-[24px] h-px bg-background-50" />
          </TouchableOpacity>
        )}
        <VStack className="gap-[24px]">
          {otherStores.map((store, index) => (
            <TouchableOpacity key={index}>
              <HStack className="h-[124px] rounded-md border-2 border-background-100">
                <Center className="h-full w-[120px] rounded-md bg-background-50">
                  <Image
                    style={{
                      width: '70%',
                      height: '70%',
                      resizeMode: 'contain',
                      borderRadius: 8,
                    }}
                    source={product.imageSrc}
                    alt=""
                  />
                </Center>
                <VStack className="mx-[20px] my-[20px] ">
                  <VStack>
                    <Text className="font-interMedium text-[16px]">
                      {store.name}
                    </Text>
                    <HStack className="items-center">
                      <MapPin className="text-primary-600" size={12} />
                      <Text className="mb-1 text-[12px] text-primary-600">
                        {store.location}
                      </Text>
                    </HStack>
                  </VStack>
                  <VStack>
                    <Text className="font-interBold">{store.price}</Text>
                    <Text className="mt-[-2px] text-typography-400">
                      {product.description}
                    </Text>
                  </VStack>
                </VStack>
              </HStack>
            </TouchableOpacity>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  )
}

function History() {
  return (
    <VStack className="flex-1 bg-white">
      <Text>Histórico</Text>
    </VStack>
  )
}

function TechnicalSheet() {
  return (
    <VStack className="flex-1 bg-white">
      <Text>Ficha Técnica</Text>
    </VStack>
  )
}

function CustomTabBar(
  props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string
      title: string
    }>
    options?:
      | Record<
          string,
          TabDescriptor<{
            key: string
            title: string
          }>
        >
      | undefined
  },
) {
  return (
    <TabBar
      {...props}
      style={{ backgroundColor: 'transparent', elevation: 0 }}
      indicatorStyle={{
        backgroundColor: lightTheme['--color-primary-700'],
        height: 2,
      }}
      pressColor="transparent"
      activeColor={lightTheme['--color-primary-700']}
      inactiveColor="gray"
      labelStyle={{ fontWeight: 'bold', textAlign: 'center' }}
    />
  )
}
