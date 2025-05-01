import type { ReactNode } from 'react'
import type { TouchableOpacityProps } from 'react-native'

import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { useTheme } from '@/providers/theme-provider'

export type ButtonProps = {
  children: string | ReactNode
  variant: 'primary' | 'secondary' | 'ghost' | 'outlined'
} & TouchableOpacityProps

export function Button({ children, variant, style, ...props }: ButtonProps) {
  const { theme } = useTheme()

  const buttonStyles = StyleSheet.create({
    shared: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 100,
    },
    primary: {
      backgroundColor: theme.colors.primary.dark,
    },
    secondary: {
      backgroundColor: theme.colors.yellow[300],
    },
    outlined: {
      borderWidth: 1,
      borderColor: theme.colors.gray[600],
    },
    ghost: {}, // caso você queira adicionar estilo depois
  })

  function defineButtonStyle(variant: ButtonProps['variant']) {
    switch (variant) {
      case 'primary':
        return buttonStyles.primary
      case 'secondary':
        return buttonStyles.secondary
      case 'outlined':
        return buttonStyles.outlined
      case 'ghost':
        return buttonStyles.ghost
      default:
        return {}
    }
  }

  return (
    <TouchableOpacity
      style={[buttonStyles.shared, defineButtonStyle(variant), style]}
      {...props}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </TouchableOpacity>
  )
}
