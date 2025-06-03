import Svg, { Path } from 'react-native-svg'

import type { SvgIconProps } from '.'

export function ChevronRight({ width, height, size, color, ...props }: SvgIconProps) {
  const finalWidth = size ?? width ?? 7
  const finalHeight = size ?? height ?? 13
  const finalColor = color ?? '#29394A'

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 7 13"
      fill="none"
      {...props}
    >
      <Path
        d="M1.71484 1.0625L6.71875 6.28516C6.82813 6.42187 6.91016 6.58594 6.91016 6.75C6.91016 6.91406 6.82813 7.07812 6.71875 7.1875L1.71484 12.4102C1.46875 12.6836 1.03125 12.6836 0.785156 12.4375C0.511718 12.1914 0.511718 11.7812 0.757812 11.5078L5.35156 6.72266L0.757812 1.96484C0.511718 1.71875 0.511718 1.28125 0.785156 1.03516C1.03125 0.789062 1.46875 0.789062 1.71484 1.0625Z"
        fill={finalColor}
      />
    </Svg>
  )
}
