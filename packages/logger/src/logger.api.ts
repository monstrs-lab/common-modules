import { LoggerProvider }             from '@opentelemetry/sdk-logs'
import { NoopLoggerProvider }         from '@opentelemetry/api-logs'
import { SimpleLogRecordProcessor }   from '@opentelemetry/sdk-logs'
import { logs }                       from '@opentelemetry/api-logs'

import { SonicBoomLogRecordExporter } from './sonic-boom-log-record.exporter.js'

export class LoggerApi {
  private static initialized: boolean = false

  static getLoggerProvider() {
    if (!LoggerApi.initialized) {
      if (logs.getLoggerProvider() instanceof NoopLoggerProvider) {
        const loggerProvider = new LoggerProvider()

        loggerProvider.addLogRecordProcessor(
          new SimpleLogRecordProcessor(new SonicBoomLogRecordExporter())
        )

        logs.setGlobalLoggerProvider(loggerProvider)

        LoggerApi.initialized = true
      }
    }

    return logs.getLoggerProvider()
  }
}
