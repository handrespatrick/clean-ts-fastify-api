import { IFindByIdCategoryUseCase } from '@/domain/usecases/categories'
import { serverError, ok, notFound } from '@/presentation/helpers/http-helper'
import { IController } from '@/presentation/protocols/controller-protocol'

export class FindByIdCategoryController implements IController {
  constructor(private readonly _findbyIdCategoryUseCase: IFindByIdCategoryUseCase) {}

  async handle(request: IController.Params): Promise<IController.Result> {
    try {
      const { id } = request.params

      const parsedId = parseInt(id)
      const result = await this._findbyIdCategoryUseCase.findById(parsedId)
      if ('type' in result && result.type === 'error') {
        return notFound(result)
      }

      return ok(result)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
