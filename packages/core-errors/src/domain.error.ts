export class DomainError extends Error {
  constructor(
    message: string,
    public readonly id: string,
    public readonly metadata?: Record<string, string>,
    options?: ErrorOptions
  ) {
    super(message, options)
  }
}
