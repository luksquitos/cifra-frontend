import Svg, { Path } from 'react-native-svg'

import type { SvgIconProps } from '.'

export function User2Icon({ width, height, size, color, ...props }: SvgIconProps) {
  const finalWidth = size ?? width ?? 14
  const finalHeight = size ?? height ?? 16
  const finalColor = color ?? '#A6AEB8'

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 14 16"
      fill="none"
      {...props}
    >
      <Path
        d="M8.5 9.5C11.5312 9.5 14 11.9688 14 15C14 15.5625 13.5312 16 13 16H1C0.4375 16 0 15.5625 0 15C0 11.9688 2.4375 9.5 5.5 9.5H8.5ZM1.5 14.5H12.4688C12.2188 12.5312 10.5312 11 8.5 11H5.5C3.4375 11 1.75 12.5312 1.5 14.5ZM7 8C4.78125 8 3 6.21875 3 4C3 1.8125 4.78125 0 7 0C9.1875 0 11 1.8125 11 4C11 6.21875 9.1875 8 7 8ZM7 1.5C5.59375 1.5 4.5 2.625 4.5 4C4.5 5.40625 5.59375 6.5 7 6.5C8.375 6.5 9.5 5.40625 9.5 4C9.5 2.625 8.375 1.5 7 1.5Z"
        fill={finalColor}
      />
    </Svg>
  )
}
