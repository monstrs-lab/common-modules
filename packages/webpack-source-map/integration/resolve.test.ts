import { join }          from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe }      from '@jest/globals'
import { beforeAll }     from '@jest/globals'
import { it }            from '@jest/globals'
import { expect }        from '@jest/globals'
import webpack           from 'webpack'

import { resolve }       from '../src/index.js'

describe('resolve webpack source map', () => {
  beforeAll(async () => {
    const compiler = webpack({
      context: fileURLToPath(new URL('.', import.meta.url)),
      mode: 'development',
      target: 'async-node',
      devtool: 'eval-cheap-module-source-map',
      entry: {
        index: join(fileURLToPath(new URL('.', import.meta.url)), 'fixtures', 'index.mjs'),
      },
      output: {
        module: true,
        chunkFormat: 'module',
        libraryTarget: 'module',
        path: join(fileURLToPath(new URL('.', import.meta.url)), 'fixtures', 'dist'),
      },
      experiments: {
        outputModule: true,
      },
      externalsPresets: {
        node: true,
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        extensionAlias: {
          '.js': ['.js', '.ts'],
          '.jsx': ['.jsx', '.tsx'],
          '.cjs': ['.cjs', '.cts'],
          '.mjs': ['.mjs', '.mts'],
        },
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-shadow
    await new Promise((resolve, reject) => {
      compiler.run((error) => {
        if (error && !error.message) {
          reject(error)
        } else {
          resolve(null)
        }
      })
    })
  })

  it('simple', () => {
    const sourceMap = resolve(
      'webpack-internal:///./fixtures/index.mjs',
      join(fileURLToPath(new URL('.', import.meta.url)), 'fixtures', 'dist', 'index.mjs')
    )!

    expect(sourceMap).toBeDefined()

    const entry = sourceMap.findEntry(5, 0)

    expect(entry).toBeDefined()
    expect(entry.originalLine).toBe(1)
  })
})
