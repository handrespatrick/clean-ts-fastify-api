import { serverError, ok } from "../../helpers/http-helper";
import { IController } from "../../protocols/controller-protocol";
import { IFindAllCategoriesUseCase } from "../../../domain/usecases/categories";

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
