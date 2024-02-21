import { IUpdateCategoryRepository } from "@/application/protocols/db/categories";
import { IUpdateCategoryUseCase } from "@/domain/usecases/categories";

export class UpdateCategoryService implements IUpdateCategoryUseCase {
  constructor(
    private readonly _categoryRepository: IUpdateCategoryRepository
  ) {}

  async update(
    data: IUpdateCategoryUseCase.Params
  ): Promise<IUpdateCategoryUseCase.Result> {
    const { id } = data;

    const hasCategory = await this._categoryRepository.findById(id);
    if (!hasCategory) {
      return {
        type: "error",
        message: `Category ${id} not found`,
      };
    }

    const categoryUpdated = await this._categoryRepository.update(data);

    return {
      id: categoryUpdated.categoria_id,
      name: categoryUpdated.nome_categoria,
      description: categoryUpdated.descricao_categoria,
      updatedAt: new Date(),
    };
  }
}
