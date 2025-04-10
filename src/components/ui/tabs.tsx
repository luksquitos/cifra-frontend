import * as TabsPrimitive from '@rn-primitives/tabs'
import React from 'react'

import { defaultTheme } from '@/constants/theme'

import { Text } from './text'

export const TabsRoot = TabsPrimitive.Root

export const TabsTrigger = React.forwardRef<TabsPrimitive.TriggerRef, TabsPrimitive.TriggerProps>(({ children, ...props }, ref) => {
  const { value } = TabsPrimitive.useRootContext()

  return (
    <TabsPrimitive.Trigger
      style={[{
        flex: 1,
        alignItems: 'center',
        paddingVertical: defaultTheme.spacing['4xl'],
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
      }, value === props.value && { borderBottomColor: defaultTheme.colors.darkBlue[700] }]}
      ref={ref}
      {...props}
    >
      <Text
        style={
          [value === props.value
            && {
              color: defaultTheme.colors.darkBlue[700],
              fontWeight: 500,
            }, {
          }]
        }
      >
        {typeof children === 'function' ? children({ pressed: false, hovered: false }) : children}
      </Text>

    </TabsPrimitive.Trigger>
  )
})

TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = TabsPrimitive.Content
