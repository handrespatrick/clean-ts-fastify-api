import { IUpdateUserUseCase } from '@/domain/usecases/user'
import { serverError, ok } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

export class UpdateUserController implements IController {
  constructor(private readonly _updateUserUseCase: IUpdateUserUseCase) {}

  async handle(request: IController.Params): Promise<IController.Result> {
    try {
      const { id } = request.params
      const updateData = request.body
      await this._updateUserUseCase.handle({ id, ...updateData })
      return ok('User updated successfully')
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
