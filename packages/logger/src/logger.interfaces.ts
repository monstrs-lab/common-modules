export type AttributeValue =
  | string
  | number
  | boolean
  | Array<null | undefined | string>
  | Array<null | undefined | number>
  | Array<null | undefined | boolean>

export interface Attributes {
  [attributeKey: string]: AttributeValue | undefined
}

export type BodyData = { [key: string]: any }

export type Body = string | Error | BodyData | any

export type SeverityNumber = number

// eslint-disable-next-line no-shadow
export enum SeverityText {
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

export interface SeverityKind {
  text: SeverityText
  number: SeverityNumber
}

export class Severity {
  static TRACE: SeverityKind = {
    text: SeverityText.TRACE,
    number: 1,
  }

  static DEBUG: SeverityKind = {
    text: SeverityText.DEBUG,
    number: 5,
  }

  static INFO: SeverityKind = {
    text: SeverityText.INFO,
    number: 9,
  }

  static WARN: SeverityKind = {
    text: SeverityText.WARN,
    number: 13,
  }

  static ERROR: SeverityKind = {
    text: SeverityText.ERROR,
    number: 17,
  }

  static FATAL: SeverityKind = {
    text: SeverityText.FATAL,
    number: 21,
  }
}

export interface Record {
  timestamp: number
  traceId?: string
  spanId?: string
  severityText: SeverityText
  severityNumber: SeverityNumber
  name?: string
  body: Body
  attributes?: Attributes
  resource?: any
}
