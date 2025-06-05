import type { ReactNode } from 'react'
import type { TextInputProps } from 'react-native'

import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import { useTheme } from '@/providers/theme-provider'

import type { StackProps } from './view'

import { HStack } from './view'

export type InputProps = {
  preppend?: ReactNode
  append?: ReactNode

} & StackProps & Omit<TextInputProps, 'style'>

export const Input = React.forwardRef<TextInput, InputProps>(({ append, preppend, ...props }: InputProps, ref) => {
  const { theme } = useTheme()

  const [isFocused, setIsFocused] = useState(false)

  const styleSheet = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.gray[0],
      borderRadius: theme.radius.xl,
      paddingHorizontal: theme.spacing['2xl'],
      paddingVertical: theme.spacing['4xl'],
      borderWidth: 1,
      gap: 8,
    },
    input: {
      flex: 1,
    },
  })

  return (
    <HStack
      style={[
        styleSheet.container,
        {
          borderColor: isFocused ? theme.colors.darkBlue[500] : theme.colors.gray[100],
        },
        props.style,
      ]}
    >
      {preppend && preppend}
      <TextInput
        {...props}
        ref={ref}
        style={[styleSheet.input]}
        placeholderTextColor={theme.colors.gray[300]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {append && append}
    </HStack>
  )
},
)

Input.displayName = 'Input'
