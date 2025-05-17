import { useEffect } from 'react'
import { ScrollView } from 'react-native'

import { Categories } from '@/components/home/home-categories'
import { Header } from '@/components/home/home-header'
import { Products } from '@/components/home/home-products'
import { useTheme } from '@/providers/theme-provider'

export default function Index() {
  const { setStatusBarStyle } = useTheme()

  useEffect(() => {
    setStatusBarStyle('light')
  }, [])

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
