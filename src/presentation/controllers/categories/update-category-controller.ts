import { serverError, ok, notFound } from "../../helpers/http-helper";
import { IController } from "../../protocols/controller-protocol";
import { IUpdateCategoryUseCase } from "../../../domain/usecases/categories";

export class UpdateCategoryController implements IController {
  constructor(
    private readonly _updateCategoryUseCase: IUpdateCategoryUseCase
  ) {}

  async handle(request: IController.Params): Promise<IController.Result> {
    try {
      const { id } = request.params;
      const updateData = request.body;

      const parsedId = parseInt(id);
      const result = await this._updateCategoryUseCase.update({
        id: parsedId,
        ...updateData,
      });
      if (result.type === "error") {
        return notFound(result);
      }

      return ok(result);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
