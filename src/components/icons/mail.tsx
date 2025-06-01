import Svg, { Path } from 'react-native-svg'

import type { SvgIconProps } from '.'

export function MailIcon({ width, height, size, color, ...props }: SvgIconProps) {
  const finalWidth = size ?? width ?? 16
  const finalHeight = size ?? height ?? 13
  const finalColor = color ?? '#A6AEB8'

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 16 13"
      fill="none"
      {...props}
    >
      <Path
        d="M2 2C1.71875 2 1.5 2.25 1.5 2.5V3.21875L6.875 7.625C7.53125 8.15625 8.4375 8.15625 9.09375 7.625L14.5 3.21875V2.5C14.5 2.25 14.25 2 14 2H2ZM1.5 5.15625V10.5C1.5 10.7812 1.71875 11 2 11H14C14.25 11 14.5 10.7812 14.5 10.5V5.15625L10.0625 8.78125C8.84375 9.78125 7.125 9.78125 5.9375 8.78125L1.5 5.15625ZM0 2.5C0 1.40625 0.875 0.5 2 0.5H14C15.0938 0.5 16 1.40625 16 2.5V10.5C16 11.625 15.0938 12.5 14 12.5H2C0.875 12.5 0 11.625 0 10.5V2.5Z"
        fill={finalColor}
      />
    </Svg>
  )
}
