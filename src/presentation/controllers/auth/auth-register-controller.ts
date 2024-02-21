import { IAuthRegisterUseCase } from '@/domain/usecases/auth'
import { ok, serverError, conflict } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

export class AuthRegisterController implements IController {
  constructor(private readonly authRegisterUsecase: IAuthRegisterUseCase) {}

  public async handle(request: IController.Params): Promise<IController.Result> {
    try {
      const params = request.body as IAuthRegisterUseCase.Params

      const result = await this.authRegisterUsecase.authRegister(params)
      if (result === 'E-mail already in use') {
        return conflict(result)
      }

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
