import { ArgumentRange } from './parse-argument-range'

export function isArgumentInRange (argumentOffset: number, ...ranges: ArgumentRange[]): boolean {
  return ranges.some(range =>
    argumentOffset >= range.start && (range.end == null || argumentOffset <= range.end)
  )
}
