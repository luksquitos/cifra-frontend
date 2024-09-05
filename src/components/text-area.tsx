import { Text as RNText, TextInput, TextInputProps, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { cn } from '@/utils/cn'
import { forwardRef, ReactNode } from 'react'

export interface TextAreaInputProps extends TextInputProps {}

export const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        {...props}
        className={cn(
          'flex-1 px-4 py-4 placeholder:color-typography-400 align-top',
          className,
        )}
      />
    )
  },
)

TextAreaInput.displayName = 'TextAreaInput'

interface TextAreaProps extends React.ComponentProps<typeof View> {
  children: ReactNode
}

export function TextArea({ children, className, ...props }: TextAreaProps) {
  return (
    <VStack
      style={{ minHeight: 100 }}
      {...props}
      className={cn('rounded-lg bg-background-700 py-2 ', className)}
    >
      {children}
    </VStack>
  )
}

interface TextAreaLabel extends React.ComponentProps<typeof RNText> {
  children: ReactNode
}

export function TextAreaLabel({
  children,
  className,
  ...props
}: TextAreaLabel) {
  return (
    <Text
      {...props}
      className={cn('px-4 font-robotoMedium text-typography-400', className)}
    >
      {children}
    </Text>
  )
}
