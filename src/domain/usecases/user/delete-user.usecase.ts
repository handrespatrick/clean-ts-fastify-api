export interface IDeleteUserUseCase {
  handle(id: string): Promise<void>
}
