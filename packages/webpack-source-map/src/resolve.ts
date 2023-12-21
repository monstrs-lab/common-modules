/* eslint-disable n/no-sync */

import type { SourceMapPayload } from 'node:module'

import { execSync }              from 'node:child_process'
import { SourceMap }             from 'node:module'

export const load = (file: string, target: string): string | null => {
  try {
    const sourceUrl: string = file.replace(/\$/g, '\\$')

    return execSync(`grep -r "sourceURL=${sourceUrl}" ${target}`).toString()
  } catch (error) {
    if (error instanceof Error) {
      process.emitWarning(`Loading webpack source error: ${error.message}`)
    }

    return null
  }
}

export const parse = (source: string): SourceMapPayload | null => {
  try {
    // eslint-disable-next-line prefer-regex-literals
    const dataUriRegExp = new RegExp('(?<=base64,)(.*?)(?=\\\\n)')

    const [datauri] = source.match(dataUriRegExp) || []

    if (datauri) {
      return JSON.parse(Buffer.from(datauri, 'base64').toString()) as SourceMapPayload
    }
  } catch (error) {
    if (error instanceof Error) {
      process.emitWarning(`Parse webpack source error: ${error.message}`)
    }
  }

  return null
}

export const extract = (file: string, target: string): SourceMap | null => {
  const source = load(file, target)

  if (source) {
    const content = parse(source)

    if (content) {
      return new SourceMap(content)
    }
  }

  return null
}

export const resolve = (file: string, target: string): SourceMap | null => {
  if (!file.includes('webpack-internal://')) {
    return null
  }

  return extract(file, target)
}
