import { FindAllCategoriesUseCase } from "../../../application/services/categories";
import { CategoryRepository } from "../../../infra/db/categories/category-repository";
import { FindAllCategoriesController } from "../../../presentation/controllers/categories";
import { IController } from "../../../presentation/protocols/controller-protocol";

export const makeFindAllCategoriesController = (): IController => {
  const categoryRepository = new CategoryRepository();
  const categoryUseCase = new FindAllCategoriesUseCase(categoryRepository);
  return new FindAllCategoriesController(categoryUseCase);
};
