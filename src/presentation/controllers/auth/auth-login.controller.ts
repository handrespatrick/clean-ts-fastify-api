import { IAuthLoginUseCase } from '@/domain/usecases/auth'
import { ok, serverError, unauthorized } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

export class AuthLoginController implements IController {
  constructor(private readonly authLoginUsecase: IAuthLoginUseCase) {}

  public async handle(request: IController.Params): Promise<IController.Result> {
    try {
      const params = request.body as IAuthLoginUseCase.Params
      const result = await this.authLoginUsecase.handle(params)
      if (result.type === 'error') {
        return unauthorized(result)
      }
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
