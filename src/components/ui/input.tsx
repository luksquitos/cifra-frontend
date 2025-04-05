import type { ReactNode } from 'react'
import type { TextInputProps } from 'react-native'

import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import { defaultTheme } from '@/constants/theme'

import { HStack } from './view'

export type InputProps = {
  preppend?: ReactNode
  append?: ReactNode
} & TextInputProps

const styleSheet = StyleSheet.create({
  container: {
    backgroundColor: defaultTheme.colors.gray[0],
    borderRadius: defaultTheme.radius.xl,
    paddingHorizontal: defaultTheme.spacing['2xl'],
    paddingVertical: defaultTheme.spacing.sm,
    borderWidth: 1,
    gap: defaultTheme.spacing.lg,
  },
  input: {
    flex: 1,
  },
})

export function Input({ append, preppend, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <HStack
      style={[
        styleSheet.container,
        {
          borderColor: isFocused ? defaultTheme.colors.darkBlue[500] : defaultTheme.colors.gray[100],
        },
      ]}
    >
      {preppend && preppend}
      <TextInput
        {...props}
        style={[styleSheet.input, props.style]}
        placeholderTextColor={defaultTheme.colors.gray[300]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {append && append}
    </HStack>
  )
}
