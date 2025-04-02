import 'styled-components/native'

import type { ApplicationTheme } from '../constants/theme'

import { defaultTheme } from '../constants/theme'

declare module 'styled-components/native' {
  // eslint-disable-next-line ts/consistent-type-definitions
  export interface DefaultTheme extends ApplicationTheme {
  }
}
