import { IFindByIdCategoryUseCase } from "../../../domain/usecases/categories/find-by-id-category-usecase";
import { IFindByIdCategoryRepository } from "../../protocols/db/categories/find-by-id-category-repository-protocol";

export class FindByIdCategoryUseCase implements IFindByIdCategoryUseCase {
  constructor(
    private readonly _findByIdCategoryRepository: IFindByIdCategoryRepository
  ) {}

  async findById(id: number): Promise<IFindByIdCategoryUseCase.Result> {
    const category = await this._findByIdCategoryRepository.findById(id);
    if (!category) {
      return {
        type: "error",
        message: `Category ${id} not found`,
      };
    }

    return {
      id: category.categoria_id,
      name: category.nome_categoria,
      description: category.descricao_categoria,
    };
  }
}
