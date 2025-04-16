import { useState } from 'react'
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts'

import { Header } from '@/components/search/search-header'
import { Products } from '@/components/search/search-products'

export default function Search() {
  const [search, setSearch] = useDebounceValue('', 500)
  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <Products search={search} />
    </>
  )
}
