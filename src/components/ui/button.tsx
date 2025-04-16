import type { ReactNode } from 'react'
import type { TouchableOpacityProps } from 'react-native'

import { Text, TouchableOpacity } from 'react-native'

export type ButtonProps = {
  children: string | ReactNode
  variant: 'primary' | 'secondary'
} & TouchableOpacityProps

export function Button({ children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity {...props}>
      {
        typeof children === 'string' ? <Text>{children}</Text> : children
      }
    </TouchableOpacity>
  )
}
