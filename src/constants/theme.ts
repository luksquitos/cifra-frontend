export type ApplicationTheme = typeof defaultTheme

export const defaultTheme = {
  colors: {
    primary: {
      dark: '#0485BD',
      default: '#0BB1EF',
      light: '#6ED8FF',
    },
    secondary: {
      dark: '#2AB163',
      default: '#41DD83',
      light: '#79ECAA',
    },
    gray: {
      700: '#0A1D2E',
      600: '#29394A',
      500: '#475567',
      400: '#7C8999',
      300: '#A6AEB8',
      200: '#CDD1D6',
      100: '#EBEDF0',
      50: '#F5F6F8',
      25: '#FAFAFA',
      0: '#FFFFFF',
    },
    darkBlue: {
      50: '#ECF2FF',
      100: '#DCE7FF',
      200: '#C1D1FF',
      300: '#9BB2FF',
      400: '#7388FF',
      500: '#525FFF',
      600: '#3533F8',
      700: '#2723D2',
      800: '#2423B0',
      900: '#24258B',
      950: '#161551',
    },
    yellow: {
      50: '#FFFBE8',
      100: '#FFF4C6',
      200: '#FEEA89',
      300: '#FED641',
      400: '#FEC521',
      500: '#F8A408',
      600: '#DB7C04',
      700: '#B65707',
      800: '#94430C',
      900: '#79370E',
      950: '#461C02',
    },
  },
  radius: {
    'xs': 2,
    'sm': 4,
    'md': 6,
    'lg': 8,
    'xl': 12,
    '2xl': 16,
    '3xl': 24,
    'full': 9999,
  },
  spacing: {
    'xs': 2,
    'sm': 4,
    'md': 6,
    'lg': 8,
    'xl': 10,
    '2xl': 12,
    '3xl': 14,
    '4xl': 16,
    '5xl': 18,
    '6xl': 20,
    '7xl': 22,
    '8xl': 24,
    '9xl': 28,
    '10xl': 32,
    '11xl': 36,
  },
  font: {
    family: {
      regular: 'Inter',
      bold: 'Inter_Bold',
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    size: {
      'xs': 10,
      'sm': 12,
      'md': 14,
      'lg': 16,
      'xl': 20,
      '2xl': 24,
      '3xl': 32,
      '4xl': 40,
    },
  },
} as const
