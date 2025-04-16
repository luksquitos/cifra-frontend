import type { ViewProps, ViewStyle } from 'react-native'

import { View } from 'react-native'

type CustomViewProps = ViewProps & {
  flexDirection?: ViewStyle['flexDirection']
  alignItems?: ViewStyle['alignItems']
  justifyContent?: ViewStyle['justifyContent']
  gap?: number
} & Omit<ViewStyle, 'flexDirection' | 'alignItems' | 'justifyContent' | 'gap'>

function CustomView({
  children,
  style,
  gap,
  flexDirection,
  alignItems,
  justifyContent,
  ...props
}: CustomViewProps) {
  return (
    <View
      style={[
        { flexDirection, alignItems, justifyContent, gap },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

type StackProps = CustomViewProps

export function HStack({ children, style, gap, ...props }: StackProps) {
  return (
    <CustomView
      flexDirection="row"
      alignItems="center"
      gap={gap}
      style={style}
      {...props}
    >
      {children}
    </CustomView>
  )
}

export function VStack({ children, style, gap, ...props }: StackProps) {
  return (
    <CustomView
      flexDirection="column"
      alignItems="flex-start"
      gap={gap}
      style={style}
      {...props}
    >
      {children}
    </CustomView>
  )
}
