import Svg, { Path } from 'react-native-svg'

import type { SvgIconProps } from '.'

export function FacebookIcon({ width, height, size, color, ...props }: SvgIconProps) {
  const finalWidth = size ?? width ?? 11
  const finalHeight = size ?? height ?? 20
  const finalColor = color ?? '#5A67DF'

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 11 20"
      fill="none"
      {...props}
    >
      <Path
        d="M6.73995 20V10.8919H9.81265L10.2694 7.32578H6.73995V5.05432C6.73995 4.02527 7.02666 3.32071 8.50356 3.32071H10.375V0.141321C9.46442 0.0437405 8.54917 -0.0033761 7.63342 0.000187992C4.91744 0.000187992 3.0527 1.65823 3.0527 4.70204V7.31912H0V10.8852H3.05937V20H6.73995Z"
        fill={finalColor}
      />
    </Svg>
  )
}
