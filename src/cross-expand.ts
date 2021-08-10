import { sync } from 'glob'

import { isArgumentInRange } from './is-argument-in-range'
import { parseArgumentRanges } from './parse-argument-range'

export function expandArguments(rangeString: string, args: string[]): string[] {
    const ranges = parseArgumentRanges(rangeString)
    return args.flatMap((arg, index) =>
      isArgumentInRange(index + 1, ...ranges)
        ? sync(arg)
        : [arg]
    )
}
