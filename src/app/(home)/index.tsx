import { ScrollView } from 'react-native'

import { Categories } from '@/components/home/home-categories'
import { Products } from '@/components/home/home-products'

export default function Index() {
  return (
    <ScrollView>
      <Categories />
      <Products />
    </ScrollView>
  )
}
