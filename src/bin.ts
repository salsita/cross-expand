// @ts-ignore
import crossEnv from 'cross-env'

import { expandArguments } from './cross-expand'

const [, , rangeString, command, ...args] = process.argv

if (command == null || rangeString == null) {
  console.error(`Invalid syntax. Expected:
cross-expand <argument-offsets> <command> [arguments]`)
  process.exit(1)
}

try {
  const expandedArgs = expandArguments(rangeString, args)
  crossEnv([command, ...expandedArgs])
} catch (error) {
  console.error(error.message || String(error))
  process.exit(1)
}
