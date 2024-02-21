import { IDeleteCategoryRepository } from "@/application/protocols/db/categories";
import { IDeleteCategoryUseCase } from "@/domain/usecases/categories";

export class DeleteCategoryService implements IDeleteCategoryUseCase {
  constructor(
    private readonly _categoryRepository: IDeleteCategoryRepository
  ) {}

  async delete(id: number): Promise<IDeleteCategoryUseCase.Result> {
    const hasCategory = await this._categoryRepository.findById(id);
    if (!hasCategory) {
      return {
        type: "error",
        message: `Category ${id} not found`,
      };
    }

    const categoryDeleted = await this._categoryRepository.delete(id);

    return {
      id: categoryDeleted.categoria_id,
      name: categoryDeleted.nome_categoria,
      description: categoryDeleted.descricao_categoria,
    };
  }
}
