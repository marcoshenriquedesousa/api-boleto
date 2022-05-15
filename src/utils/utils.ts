export function isDigit (number: string): boolean {
  return /^\d+$/.test(number)
}

export function modulo11 (digits: any): number {
  if (typeof digits === 'string') {
    digits = digits.split('')
  }

  digits.reverse()

  let sum = 0

  for (let i = 0; i < digits.length; i += 1) {
    sum += ((i % 8) + 2) * digits[i]
  }

  const result = (11 - (sum % 11)) % 10 || 1

  return result
}
