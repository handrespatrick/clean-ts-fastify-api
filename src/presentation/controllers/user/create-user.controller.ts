import { ICreateUserUseCase } from '@/domain/usecases/user'
import { serverError, ok } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

export class CreateUserController implements IController {
  constructor(private readonly _createUserUseCase: ICreateUserUseCase) {}

  async handle(request: IController.Params): Promise<IController.Result> {
    try {
      const { id, name, email, password } = request.body
      await this._createUserUseCase.handle({ id, name, email, password })
      return ok('User created successfully')
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
