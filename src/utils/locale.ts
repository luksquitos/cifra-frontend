export function currencyFormatter(
  value: number,
  locale: string = 'pt-BR',
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value)
}
