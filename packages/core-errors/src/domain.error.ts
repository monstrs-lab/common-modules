export class DomainError extends Error {
  constructor(
    message: string,
    public readonly id: string,
    options?: ErrorOptions
  ) {
    super(message, options)
  }
}
