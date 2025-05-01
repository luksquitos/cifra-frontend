import Svg, { Polygon } from 'react-native-svg'

import type { SvgIconProps } from '.'

export function TriangleIcon({ width, height, size, color, ...props }: SvgIconProps) {
  const finalWidth = size ?? width ?? 24
  const finalHeight = size ?? height ?? 24
  const finalColor = color ?? '#000000'

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 490 490"
      fill="none"
      {...props}
    >
      <Polygon
        points="245,456.701 490,33.299 0,33.299"
        fill={finalColor}
      />
    </Svg>
  )
}
