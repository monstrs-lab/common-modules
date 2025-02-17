import type { AbstractGuardExtensionFactoryOptions } from '../factory/index.js'

import { GuardError }                                from '../errors/index.js'
import { AbstractGuardExtensionFactory }             from '../factory/index.js'

export class NotEnumGuardExtensionFactory extends AbstractGuardExtensionFactory {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  override performParamValue(paramValue: any, options: AbstractGuardExtensionFactoryOptions): void {
    const targetEnums = Array.isArray(options.metadata!.targetEnum)
      ? options.metadata!.targetEnum
      : [options.metadata!.targetEnum]

    const isMatched = targetEnums.some(
      (targetEnum) =>
        targetEnum &&
        typeof targetEnum === 'object' &&
        Object.values(targetEnum as object).includes(paramValue)
    )

    if (!isMatched) {
      throw new GuardError(
        'guard.against.not-enum',
        options.parameter,
        paramValue,
        `not enum value of '${targetEnums
          .map((targetEnum) => (targetEnum?.name as string) || (targetEnum as string))
          .join(' or ')}'`
      )
    }
  }
}
