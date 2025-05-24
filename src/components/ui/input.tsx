import type { ReactNode } from 'react'
import type { TextInputProps } from 'react-native'

import React, { useState } from 'react'
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
    paddingVertical: defaultTheme.spacing['4xl'],
    borderWidth: 1,
    gap: 2,
    flex: 1,
  },
  input: {
    flex: 1,
  },
})

export const Input = React.forwardRef<TextInput, InputProps>(({ append, preppend, ...props }: InputProps, ref) => {
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
        ref={ref}
        style={[styleSheet.input, props.style]}
        placeholderTextColor={defaultTheme.colors.gray[300]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {append && append}
    </HStack>
  )
},
)

Input.displayName = 'Input'
