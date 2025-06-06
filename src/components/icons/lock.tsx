import Svg, { Path } from 'react-native-svg'

import type { SvgIconProps } from '.'

export function LockIcon({ width, height, size, color, ...props }: SvgIconProps) {
  const finalWidth = size ?? width ?? 14
  const finalHeight = size ?? height ?? 17
  const finalColor = color ?? '#A6AEB8'

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 14 17"
      fill="none"
      {...props}
    >
      <Path
        d="M3 6.5V4.5C3 2.3125 4.78125 0.5 7 0.5C9.1875 0.5 11 2.3125 11 4.5V6.5H12C13.0938 6.5 14 7.40625 14 8.5V14.5C14 15.625 13.0938 16.5 12 16.5H2C0.875 16.5 0 15.625 0 14.5V8.5C0 7.40625 0.875 6.5 2 6.5H3ZM4.5 6.5H9.5V4.5C9.5 3.125 8.375 2 7 2C5.59375 2 4.5 3.125 4.5 4.5V6.5ZM1.5 14.5C1.5 14.7812 1.71875 15 2 15H12C12.25 15 12.5 14.7812 12.5 14.5V8.5C12.5 8.25 12.25 8 12 8H2C1.71875 8 1.5 8.25 1.5 8.5V14.5Z"
        fill={finalColor}
      />
    </Svg>
  )
}
