import * as React from 'react'
import { Path, Rect, Svg } from 'react-native-svg'

import type { SvgIconProps } from '.'

export function PointerIcon({ width, height, size, color, ...props }: SvgIconProps) {
  const finalWidth = size ?? width ?? 14
  const finalHeight = size ?? height ?? 14
  const finalColor = color ?? '#000'

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <Rect x="0.5" y="0.5" width="13" height="13" rx="6.5" fill="white" />
      <Rect x="0.5" y="0.5" width="13" height="13" rx="6.5" stroke={finalColor} />
      <Path
        d="M3.64062 7.35938C3.4375 7.17188 3.4375 6.84375 3.64062 6.65625L5.64062 4.65625C5.78125 4.51562 6 4.46875 6.1875 4.54688C6.375 4.625 6.5 4.79688 6.5 5V9C6.5 9.20312 6.375 9.39062 6.1875 9.46875C6 9.54688 5.78125 9.5 5.64062 9.35938L3.64062 7.35938Z"
        fill={finalColor}
      />
      <Path
        d="M10.3438 7.35938L8.34375 9.35938C8.20312 9.5 7.98438 9.54688 7.79688 9.46875C7.60938 9.39062 7.48438 9.20312 7.48438 9V5C7.48438 4.79688 7.60938 4.625 7.79688 4.54688C7.98438 4.46875 8.20312 4.51562 8.34375 4.65625L10.3438 6.65625C10.5469 6.84375 10.5469 7.17188 10.3438 7.35938Z"
        fill={finalColor}
      />
    </Svg>
  )
}
