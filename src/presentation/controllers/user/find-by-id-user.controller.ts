import { IFindByIdUserUseCase } from '@/domain/usecases/user'
import { serverError, ok, notFound } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

export class FindByIdUserController implements IController {
  constructor(private readonly _findbyIdUserUseCase: IFindByIdUserUseCase) {}

  async handle(request: IController.Params): Promise<IController.Result> {
    try {
      const { id } = request.params
      const result = await this._findbyIdUserUseCase.handle(id)
      if (!result) {
        return notFound(result)
      }
      return ok(result)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
