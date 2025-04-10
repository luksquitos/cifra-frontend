import { faBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableOpacity } from 'react-native'
import { SvgFromXml } from 'react-native-svg'

import type { EachCategory } from '@/@types/api/categories'

import { Text } from '@/components/ui/text'
import { defaultTheme } from '@/constants/theme'

type CategoryCardProps = {
  item: EachCategory
}

export function CategoryCard({ item }: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={{
        width: 90,
        height: 90,
        paddingHorizontal: defaultTheme.spacing['2xl'],
        paddingVertical: defaultTheme.spacing['2xl'],
        gap: defaultTheme.spacing['5xl'],
        borderRadius: defaultTheme.radius.xl,
        backgroundColor: defaultTheme.colors.gray[0],
      }}
    >
      {item.svg
        ? <SvgFromXml xml={item.svg} />
        : (
            <FontAwesomeIcon
              color={defaultTheme.colors.yellow[300]}
              size={defaultTheme.spacing['6xl']}
              icon={faBell}
            />
          )}
      <Text fontSize={defaultTheme.font.size.sm}>{item.name}</Text>
    </TouchableOpacity>
  )
}
