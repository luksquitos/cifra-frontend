import type Svg from 'react-native-svg'

export type SvgIconProps = {
  width?: number
  height?: number
  size?: number
  color?: string
} & React.ComponentProps<typeof Svg>

export * from './eye'
export * from './lock'
export * from './magnifying-dolar'
export * from './mail'
export * from './map-marker'
export * from './share'
export * from './user'
export * from './form'
export * from './search'