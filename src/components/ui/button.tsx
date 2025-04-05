import type { ReactNode } from 'react'

import { Text, TouchableOpacity } from 'react-native'

export type ButtonProps = {
  children: string | ReactNode
  variant: 'primary' | 'secondary'
}

export function Button({ children }: ButtonProps) {
  return (
    <TouchableOpacity>
      {
        typeof children === 'string' ? <Text>{children}</Text> : children
      }
    </TouchableOpacity>
  )
}
