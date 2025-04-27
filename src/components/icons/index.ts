import type Svg from 'react-native-svg'

export type SvgIconProps = {
  width?: number
  height?: number
  size?: number
  color?: string
} & React.ComponentProps<typeof Svg>
