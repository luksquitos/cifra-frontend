import { useContext } from 'react'

import type { ThemeContextType } from '../providers/theme-provider'

import { ThemeContext } from '../providers/theme-provider'

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
