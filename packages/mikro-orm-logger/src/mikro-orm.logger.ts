import type { Logger as ILogger } from '@mikro-orm/core'
import type { LoggerNamespace }   from '@mikro-orm/core'
import type { LogContext }        from '@mikro-orm/core'
import type { LoggerOptions }     from '@mikro-orm/core'
import type { Attributes }        from '@monstrs/logger'

import { Logger }                 from '@monstrs/logger'

export class MikroORMLogger implements ILogger {
  #logger: Logger = new Logger('mikro-orm')

  public debugMode = this.options.debugMode ?? false

  constructor(private readonly options: LoggerOptions) {}

  setDebugMode(debugMode: boolean | LoggerNamespace[]): void {
    this.debugMode = debugMode
  }

  isEnabled(namespace: LoggerNamespace): boolean {
    return (
      !!this.debugMode && (!Array.isArray(this.debugMode) || this.debugMode.includes(namespace))
    )
  }

  log(namespace: LoggerNamespace, message: string, context?: LogContext): void {
    if (!this.isEnabled(namespace)) {
      return
    }

    const msg = message.replace(/\n/g, '').replace(/ +/g, ' ').trim()

    const attributes: Attributes = {}

    if (context?.query) {
      attributes.sql = context.query
    }

    if (context?.params) {
      attributes.params = context.params as any[]
    }

    if (context?.connection?.type) {
      attributes.conntectionType = context.connection.type
    }

    if (context?.connection?.name) {
      attributes.conntectionName = context.connection.name
    }

    if (context?.took) {
      attributes.took = context.took
    }

    if (context?.level === 'error') {
      this.#logger.child(namespace).error(msg, attributes)
    } else if (context?.level === 'warning') {
      this.#logger.child(namespace).warn(msg, attributes)
    } else {
      this.#logger.child(namespace).info(msg, attributes)
    }
  }

  error(namespace: LoggerNamespace, message: string, context?: LogContext): void {
    this.log(namespace, message, { ...context, level: 'error' })
  }

  warn(namespace: LoggerNamespace, message: string, context?: LogContext): void {
    this.log(namespace, message, { ...context, level: 'warning' })
  }

  logQuery(context: { query: string } & LogContext): void {
    this.log('query', context.took ? `Exec query took ${context.took} ms` : 'Exec query', context)
  }
}
