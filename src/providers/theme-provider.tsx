import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'

import React, { createContext, useContext, useState } from 'react'

import { defaultTheme } from '@/constants/theme'

export enum ThemeVariants {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export type Theme = typeof defaultTheme

export type ThemeContextType = {
  theme: Theme
  themeVariant: string
  toggleTheme: () => void
  setThemeVariant: Dispatch<SetStateAction<ThemeVariants>>
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { theme: Theme } & PropsWithChildren) {
  const [theme] = useState<Theme>(defaultTheme)
  const [themeVariant, setThemeVariant] = useState<ThemeVariants>(ThemeVariants.SYSTEM)

  const toggleTheme = React.useCallback(() => {
    setThemeVariant((prevTheme: ThemeVariants) => {
      if (prevTheme === ThemeVariants.LIGHT)
        return ThemeVariants.DARK
      if (prevTheme === ThemeVariants.DARK)
        return ThemeVariants.SYSTEM
      return ThemeVariants.LIGHT
    })
  }, [])

  const contextValue = React.useMemo(() => ({ themeVariant, toggleTheme, setThemeVariant, theme }), [themeVariant, setThemeVariant, toggleTheme, theme])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
