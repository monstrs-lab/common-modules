import { SeverityNumber } from '@opentelemetry/api-logs'

export class LoggerConfiguration {
  private static severityNumber: SeverityNumber

  private static debug: Array<string>

  private static getSeverityNumber() {
    if (!LoggerConfiguration.severityNumber) {
      LoggerConfiguration.severityNumber =
        process.env.LOG_LEVEL && SeverityNumber[process.env.LOG_LEVEL]
          ? SeverityNumber[process.env.LOG_LEVEL]
          : SeverityNumber.INFO
    }

    return LoggerConfiguration.severityNumber
  }

  private static getDebug() {
    if (!LoggerConfiguration.debug) {
      LoggerConfiguration.debug = (process.env.DEBUG || '').split(',') as Array<string>
    }

    return LoggerConfiguration.debug
  }

  private static acceptDebug(name?: string) {
    return name && LoggerConfiguration.getDebug().includes(name)
  }

  static accept(severityNumber: SeverityNumber, debug?: string) {
    return (
      severityNumber <= LoggerConfiguration.getSeverityNumber() ||
      LoggerConfiguration.acceptDebug(debug)
    )
  }
}
