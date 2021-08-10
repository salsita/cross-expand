export interface ArgumentRange {
  start: number
  end: number | null
  text: string
}

const argumentRangePattern = /^([0-9]+)(-([0-9]+)|\+)?$/

export function parseArgumentRange (rangeString: string): ArgumentRange {
  const [, startString, plus, endString] = argumentRangePattern.exec(rangeString) ?? []
  if (startString == null) {
    throw new Error(`invalid range '${rangeString}'`)
  }
  const start = Number(startString)
  const end = endString == null ? start : Number(endString)
  if (start < 1) {
    throw new Error(`range offsets are 1-based, zeros are not allowed in '${rangeString}'`)
  }
  if (end < start) {
    throw new Error(`range '${rangeString}' ends must not end on lower offset than it starts`)
  }

  return {
    start,
    end: plus === '+' ? null : end,
    text: rangeString
  }
}

export function parseArgumentRanges (rangeString: string): ArgumentRange[] {
  return rangeString
    .split(',')
    .map(parseArgumentRange)
}
