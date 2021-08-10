import { parseArgumentRange, parseArgumentRanges } from './parse-argument-range'

describe('parserArgumentRange', () => {
  it('parses single number', () => {
    expect(parseArgumentRange('1')).toMatchObject({ start: 1, end: 1 })
    expect(parseArgumentRange('54988797')).toMatchObject({ start: 54988797, end: 54988797 })
  })

  it('parses closed range', () => {
    expect(parseArgumentRange('1-1')).toMatchObject({ start: 1, end: 1 })
    expect(parseArgumentRange('1-5')).toMatchObject({ start: 1, end: 5 })
    expect(parseArgumentRange('54988797-54988800')).toMatchObject({ start: 54988797, end: 54988800 })
  })

  it('parses open range', () => {
    expect(parseArgumentRange('1+')).toMatchObject({ start: 1, end: null })
    expect(parseArgumentRange('54988797+')).toMatchObject({ start: 54988797, end: null })
  })

  it('fails on negative numbers', () => {
    expect(() => parseArgumentRange('-1')).toThrow('invalid range \'-1\'')
    expect(() => parseArgumentRange('-54988797')).toThrow('invalid range \'-54988797\'')
    expect(() => parseArgumentRange('8--4')).toThrow('invalid range \'8--4\'')
  })

  it('fails on zero', () => {
    expect(() => parseArgumentRange('0')).toThrow('range offsets are 1-based, zeros are not allowed in \'0\'')
    expect(() => parseArgumentRange('0-0')).toThrow('range offsets are 1-based, zeros are not allowed in \'0-0\'')
  })

  it('fails on inverse range', () => {
    expect(() => parseArgumentRange('5-1')).toThrow('range \'5-1\' ends must not end on lower offset than it starts')
  })
})

describe('parserArgumentRanges', () => {
  it('parses single range', () => {
    expect(parseArgumentRanges('1-9')).toMatchObject([{ start: 1, end: 9 }])
  })

  it('parses multiple ranges', () => {
    expect(parseArgumentRanges('1-4,6-9')).toMatchObject([
      { start: 1, end: 4 },
      { start: 6, end: 9 }
    ])
    expect(parseArgumentRanges('1-4,6-9,12+')).toMatchObject([
      { start: 1, end: 4 },
      { start: 6, end: 9 },
      { start: 12, end: null }
    ])
  })
})
