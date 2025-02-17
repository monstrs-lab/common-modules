import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from '../factory/index.js'

export class NotInstanceGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    const targetTypeConstructors = Array.isArray(options.metadata!.targetTypeConstructor)
      ? options.metadata!.targetTypeConstructor
      : [options.metadata!.targetTypeConstructor]

    const isMatched = targetTypeConstructors.some(
      (targetTypeConstructor) =>
        targetTypeConstructor &&
        typeof targetTypeConstructor === 'function' &&
        paramValue instanceof targetTypeConstructor
    )

    if (!isMatched) {
      throw new GuardError(
        'guard.against.not-instance',
        options.parameter,
        paramValue,
        `not instance '${targetTypeConstructors
          .map(
            (targetTypeConstructor) =>
              (targetTypeConstructor?.name as string) || (targetTypeConstructor as string)
          )
          .join(' or ')}'`
      )
    }
  }
}
