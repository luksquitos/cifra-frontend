import Svg, { Path } from 'react-native-svg'

import type { SvgIconProps } from '.'

export function SearchIcon({ width, height, size, color, ...props }: SvgIconProps) {
  const finalWidth = size ?? width ?? 21
  const finalHeight = size ?? height ?? 21
  const finalColor = color ?? '#7C8999'

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 21 21"
      fill="none"
      {...props}
    >
      <Path
        d="M19.8047 19.4453C20.0391 19.6797 20.0391 20.1094 19.8047 20.3438C19.6875 20.4609 19.5312 20.5 19.375 20.5C19.1797 20.5 19.0234 20.4609 18.8672 20.3438L13.3594 14.7969C11.9141 16.0469 10.0781 16.75 8.08594 16.75C3.63281 16.75 0 13.1172 0 8.625C0 4.17188 3.59375 0.5 8.08594 0.5C12.5391 0.5 16.2109 4.17188 16.2109 8.625C16.2109 10.6562 15.5078 12.4922 14.2578 13.9375L19.8047 19.4453ZM8.125 15.5C11.9141 15.5 15 12.4531 15 8.625C15 4.83594 11.9141 1.75 8.125 1.75C4.29688 1.75 1.25 4.83594 1.25 8.625C1.25 12.4141 4.29688 15.5 8.125 15.5Z"
        fill={finalColor}
      />
    </Svg>
  )
}
