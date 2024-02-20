import { serverError, ok, notFound } from "../../helpers/http-helper";
import { IController } from "../../protocols/controller-protocol";
import { IDeleteCategoryUseCase } from "../../../domain/usecases/categories";

export class DeleteCategoryController implements IController {
  constructor(
    private readonly _deleteCategoryUseCase: IDeleteCategoryUseCase
  ) {}

  async handle(request: IController.Params): Promise<IController.Result> {
    try {
      const { id } = request.params;

      const parsedId = parseInt(id);
      const result = await this._deleteCategoryUseCase.delete(parsedId);
      if (result.type === "error") {
        return notFound(result);
      }

      return ok(result);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
