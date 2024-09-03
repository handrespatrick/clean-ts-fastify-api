import { IDeleteUserUseCase } from '@/domain/usecases/user'
import { serverError, ok } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

export class DeleteUserController implements IController {
  constructor(private readonly _deleteUserUseCase: IDeleteUserUseCase) {}

  async handle(request: IController.Params): Promise<IController.Result> {
    try {
      const { id } = request.params
      await this._deleteUserUseCase.handle(id)
      return ok('User deleted successfully')
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
