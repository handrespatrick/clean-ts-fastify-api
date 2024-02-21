import { ICreateCategoryRepository } from "@/application/protocols/db/categories";
import { ICreateCategoryUseCase } from "@/domain/usecases/categories";

export class CreateCategoryService implements ICreateCategoryUseCase {
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
