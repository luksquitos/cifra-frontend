import Svg, { Path } from 'react-native-svg'

import type { SvgIconProps } from '.'

export function ArrowRight({ width, height, size, color, ...props }: SvgIconProps) {
  const finalWidth = size ?? width ?? 22
  const finalHeight = size ?? height ?? 20
  const finalColor = color ?? '#29394A'

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 22 20"
      fill="none"
      {...props}
    >
      <Path
        d="M12.875 1.32812L21.125 9.20312C21.3594 9.4375 21.5 9.71875 21.5 10.0469C21.5 10.3281 21.3594 10.6094 21.125 10.8438L12.875 18.7188C12.4531 19.1406 11.7031 19.1406 11.2812 18.6719C10.8594 18.25 10.8594 17.5 11.3281 17.0781L17.5625 11.1719H1.625C0.96875 11.1719 0.5 10.6562 0.5 10.0469C0.5 9.39062 0.96875 8.92188 1.625 8.92188H17.5625L11.3281 2.96875C10.8594 2.54688 10.8594 1.79688 11.2812 1.375C11.7031 0.90625 12.4062 0.90625 12.875 1.32812Z"
        fill={finalColor}
      />
    </Svg>
  )
}
