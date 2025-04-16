import type { TextProps as RNTextProps, TextStyle } from 'react-native'

import { Text as RNText } from 'react-native'

export type TextProps = RNTextProps & {
  fontSize?: TextStyle['fontSize']
  fontWeight?: TextStyle['fontWeight']
  color?: TextStyle['color']
  textAlign?: TextStyle['textAlign']
} & Omit<TextStyle, 'fontSize' | 'fontWeight' | 'color' | 'textAlign'>

export function Text({ children, style, fontSize, fontWeight, color, textAlign, ...props }: TextProps) {
  return (
    <RNText
      style={[
        { fontSize, fontWeight, color, textAlign },
        props,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  )
}
