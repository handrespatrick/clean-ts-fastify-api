import { IDeleteCategoryUseCase } from "../../../domain/usecases/categories/delete-category-usecase";
import { IDeleteCategoryRepository } from "../../protocols/db/categories/delete-category-repository-protocol";

export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
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
