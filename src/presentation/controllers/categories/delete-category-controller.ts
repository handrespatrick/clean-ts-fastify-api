import { IDeleteCategoryUseCase } from '@/domain/usecases/categories'
import { serverError, ok, notFound } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

export class DeleteCategoryController implements IController {
  constructor(private readonly _deleteCategoryUseCase: IDeleteCategoryUseCase) {}

  async handle(request: IController.Params): Promise<IController.Result> {
    try {
      const { id } = request.params

      const parsedId = parseInt(id)
      const result: IDeleteCategoryUseCase.Result = await this._deleteCategoryUseCase.delete(parsedId)
      if ('type' in result && result.type === 'error') {
        return notFound(result)
      }

      return ok(result)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
