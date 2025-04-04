import type { ReactNode } from 'react'
import type { TextInputProps } from 'react-native'

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
    borderColor: defaultTheme.colors.gray[100],
    gap: defaultTheme.spacing.lg,
  },
  input: {
    flex: 1,

  },
})

export function Input({ append, preppend, ...props }: InputProps) {
  return (
    <HStack style={styleSheet.container}>
      {preppend && preppend}
      <TextInput style={[styleSheet.input, props.style]} placeholderTextColor={defaultTheme.colors.gray[300]} {...props} />
      {append && append}
    </HStack>
  )
}
