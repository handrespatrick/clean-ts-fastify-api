import { serverError, ok } from "../../helpers/http-helper";
import { IController } from "../../protocols/controller-protocol";
import { ICreateCategoryUseCase } from "../../../domain/usecases/categories";

export class CreateCategoryController implements IController {
  constructor(
    private readonly _createCategoryUseCase: ICreateCategoryUseCase
  ) {}

  async handle(request: IController.Params): Promise<IController.Result> {
    try {
      const { name, description } = request.body;

      const result = await this._createCategoryUseCase.create({
        name,
        description,
      });

      return ok(result);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
