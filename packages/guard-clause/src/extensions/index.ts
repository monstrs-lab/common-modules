import { GuardFactory }                          from '../factory/index.js'
import { NotEmptyGuardExtensionFactory }         from './not-empty-guard.extension.factory.js'
import { NotUUIDGuardExtensionFactory }          from './not-uuid-guard.extension.factory.js'
import { NotNumberBetweenGuardExtensionFactory } from './not-number-between.extension.factory.js'
import { NotInstanceGuardExtensionFactory }      from './not-instance-guard.extension.factory.js'
import { NotIntegerGuardExtensionFactory }       from './not-integer-guard.extension.factory.js'
import { NotEnumGuardExtensionFactory }          from './not-enum-guard.extension.factory.js'
import { NotOneOfGuardExtensionFactory }         from './not-one-of-guard.extension.factory.js'

export * from './not-empty-guard.extension.factory.js'
export * from './not-uuid-guard.extension.factory.js'
export * from './not-number-between.extension.factory.js'
export * from './not-instance-guard.extension.factory.js'
export * from './not-integer-guard.extension.factory.js'
export * from './not-enum-guard.extension.factory.js'
export * from './not-one-of-guard.extension.factory.js'

GuardFactory.registerExtension(new NotEmptyGuardExtensionFactory())
GuardFactory.registerExtension(new NotUUIDGuardExtensionFactory())
GuardFactory.registerExtension(new NotNumberBetweenGuardExtensionFactory())
GuardFactory.registerExtension(new NotInstanceGuardExtensionFactory())
GuardFactory.registerExtension(new NotIntegerGuardExtensionFactory())
GuardFactory.registerExtension(new NotEnumGuardExtensionFactory())
GuardFactory.registerExtension(new NotOneOfGuardExtensionFactory())