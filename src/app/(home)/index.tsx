import { ScrollView } from 'react-native'

import { Categories } from '@/components/home/home-categories'
import { Header } from '@/components/home/home-header'
import { Products } from '@/components/home/home-products'

export default function Index() {
  return (
    <>
      <Header />
      <ScrollView>
        <Categories />
        <Products />
      </ScrollView>
    </>
  )
}
