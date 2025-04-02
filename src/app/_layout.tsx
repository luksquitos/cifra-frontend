import { ThemeProvider } from 'styled-components/native'

import { Button } from '../components/button'
import { defaultTheme } from '../constants/theme'

export default function RootLayout() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
    </ThemeProvider>
  )
}
