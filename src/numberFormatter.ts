import { fillFraction, fillInteger, grouping, isMinus, toNumber } from './utils'

export default (value: string, meta: DecimalMetadata): string => {
  if (!value) {
    return ''
  }

  value = value.replace(/[^\d.]/g, '')

  const isMinusValue = isMinus(value)
  const pointPosition = value.indexOf('.')

  if (pointPosition === -1) {
    value = fillInteger(grouping(value), meta.integer.fill) + fillFraction('', meta.fraction.fill)
  } else {
    value = fillInteger(grouping(value.substring(0, pointPosition)), meta.integer.fill)
    value += fillFraction(toNumber(value.substring(pointPosition + 1)), meta.fraction.fill)
  }

  value = meta.prefix + value + meta.suffix

  return isMinusValue ? `-${value}` : value
}
