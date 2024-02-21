import { ICreateCategoryUseCase } from "@/domain/usecases/categories";
import { serverError, ok } from "@/presentation/helpers/http-helper";
import { IController } from "@/presentation/protocols/controller-protocol";

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
