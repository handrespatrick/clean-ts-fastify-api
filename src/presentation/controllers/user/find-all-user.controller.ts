import { IFindAllUserUseCase } from '@/domain/usecases/user'
import { serverError, ok } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

export class FindAllUserController implements IController {
  constructor(private readonly _findAllUserUseCase: IFindAllUserUseCase) {}

  async handle(): Promise<IController.Result> {
    try {
      const result = await this._findAllUserUseCase.handle()
      return ok(result)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
