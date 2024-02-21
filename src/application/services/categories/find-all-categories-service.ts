import { IFindAllCategoriesRepository } from "@/application/protocols/db/categories";
import { IFindAllCategoriesUseCase } from "@/domain/usecases/categories";

export class FindAllCategoriesService implements IFindAllCategoriesUseCase {
  constructor(
    private readonly _findAllCategoriesRepository: IFindAllCategoriesRepository
  ) {}

  async findAll(): Promise<IFindAllCategoriesUseCase.Result> {
    const allCategories = await this._findAllCategoriesRepository.findAll();

    return allCategories.map((category) => ({
      id: category.categoria_id,
      name: category.nome_categoria,
      description: category.descricao_categoria,
    }));
  }
}
