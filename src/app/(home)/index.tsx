import { Categories } from '@/components/home/home-categories'
import { Products } from '@/components/home/home-products'
import { ScrollView } from 'react-native'

export default function Index() {
  return (
    <ScrollView>
      <Categories />
      <Products />
    </ScrollView>
  )
}
