import { ICreateCategoryUseCase } from "../../../domain/usecases/categories/create-category-usecase";
import { ICreateCategoryRepository } from "../../protocols/db/categories/create-category-repository-protocol";

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(
    private readonly _categoryRepository: ICreateCategoryRepository
  ) {}

  async create(
    data: ICreateCategoryUseCase.Params
  ): Promise<ICreateCategoryUseCase.Result> {
    const categoryCreated = await this._categoryRepository.create(data);

    return {
      id: categoryCreated.categoria_id,
      name: categoryCreated.nome_categoria,
      description: categoryCreated.descricao_categoria,
    };
  }
}
