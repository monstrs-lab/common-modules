import type { ReadableLogRecord }   from '@opentelemetry/sdk-logs'
import type { ExportResult }        from '@opentelemetry/core'

import { ConsoleLogRecordExporter } from '@opentelemetry/sdk-logs'
import { ExportResultCode }         from '@opentelemetry/core'

import { build }                    from './sonic-boom.utils.js'

export class SonicBoomLogRecordExporter extends ConsoleLogRecordExporter {
  #stream: { write: (string) => void }

  constructor() {
    super()

    this.#stream = build()
  }

  public export(logs: ReadableLogRecord[], resultCallback: (result: ExportResult) => void) {
    this.sendLogRecords(logs, resultCallback)
  }

  private sendLogRecords(
    logRecords: ReadableLogRecord[],
    done?: (result: ExportResult) => void
  ): void {
    for (const logRecord of logRecords) {
      // @ts-ignore
      this.#stream.write(JSON.stringify(this._exportInfo(logRecord))) // eslint-disable-line
    }

    done?.({ code: ExportResultCode.SUCCESS })
  }
}
