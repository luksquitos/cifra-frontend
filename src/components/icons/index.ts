import type Svg from 'react-native-svg'

export type SvgIconProps = {
  width?: number
  height?: number
  size?: number
  color?: string
} & React.ComponentProps<typeof Svg>

export * from './magnifying-dolar'
export * from './map-marker'
export * from './share'
