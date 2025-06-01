import Svg, { Path } from 'react-native-svg'

import type { SvgIconProps } from '.'

export function UserIcon({ width, height, size, color, ...props }: SvgIconProps) {
  const finalWidth = size ?? width ?? 18
  const finalHeight = size ?? height ?? 21
  const finalColor = color ?? '#7C8999'

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 18 21"
      fill="none"
      {...props}
    >
      <Path
        d="M9 10.5C6.22656 10.5 4 8.27344 4 5.5C4 2.76562 6.22656 0.5 9 0.5C11.7344 0.5 14 2.76562 14 5.5C14 8.27344 11.7344 10.5 9 10.5ZM9 1.75C6.92969 1.75 5.25 3.46875 5.25 5.5C5.25 7.57031 6.92969 9.25 9 9.25C11.0312 9.25 12.75 7.57031 12.75 5.5C12.75 3.46875 11.0312 1.75 9 1.75ZM10.9531 12.375C14.7031 12.375 17.75 15.4219 17.75 19.1719C17.75 19.9141 17.125 20.5 16.3828 20.5H1.57812C0.835938 20.5 0.25 19.9141 0.25 19.1719C0.25 15.4219 3.25781 12.375 7.00781 12.375H10.9531ZM16.3828 19.25C16.4219 19.25 16.5 19.2109 16.5 19.1719C16.5 16.125 14 13.625 10.9531 13.625H7.00781C3.96094 13.625 1.5 16.125 1.5 19.1719C1.5 19.2109 1.53906 19.25 1.57812 19.25H16.3828Z"
        fill={finalColor}
      />
    </Svg>
  )
}
