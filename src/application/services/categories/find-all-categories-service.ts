import { IFindAllCategoriesUseCase } from "../../../domain/usecases/categories/find-all-categories-usecase";
import { IFindAllCategoriesRepository } from "../../protocols/db/categories/find-all-categories-repository-protocol";

export class FindAllCategoriesUseCase implements IFindAllCategoriesUseCase {
  constructor(
    private readonly _findAllCategoriesRepository: IFindAllCategoriesRepository
  ) {}

  async findAll(): Promise<IFindAllCategoriesUseCase.Result> {
    const allCategories = await this._findAllCategoriesRepository.findAll();
    if (!allCategories) {
      throw new Error("Nenhuma categoria encontrada");
    }

    return allCategories.map((category) => ({
      id: category.categoria_id,
      name: category.nome_categoria,
      description: category.descricao_categoria,
    }));
  }
}
