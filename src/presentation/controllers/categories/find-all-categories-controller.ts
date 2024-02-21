import { IFindAllCategoriesUseCase } from "@/domain/usecases/categories";
import { serverError, ok, notFound } from "@/presentation/helpers/http-helper";
import { IController } from "@/presentation/protocols/controller-protocol";

export class FindAllCategoriesController implements IController {
  constructor(
    private readonly _findAllCategoriesUseCase: IFindAllCategoriesUseCase
  ) {}

  async handle(): Promise<IController.Result> {
    try {
      const result = await this._findAllCategoriesUseCase.findAll();

      return ok(result);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
