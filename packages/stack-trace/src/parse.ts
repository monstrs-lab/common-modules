import type { StackFrame } from './stack-trace.js'

import StackUtils          from 'stack-utils'

import { StackTrace }      from './stack-trace.js'

export const parse = (stack: string): StackTrace => {
  const lines = stack.split('\n')

  const cwd = process.cwd()
  const stackUtils = new StackUtils({ cwd })

  const frames = lines.reduce((result: Array<StackFrame>, line) => {
    const frame: StackFrame | null = stackUtils.parseLine(line.trim())

    if (frame) {
      result.push(frame)
    }

    return result
  }, [])

  return new StackTrace(frames)
}
