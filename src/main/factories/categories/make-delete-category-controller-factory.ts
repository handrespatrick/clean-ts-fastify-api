import { DeleteCategoryUseCase } from "../../../application/services/categories";
import { CategoryRepository } from "../../../infra/db/categories/category-repository";
import { DeleteCategoryController } from "../../../presentation/controllers/categories";
import { IController } from "../../../presentation/protocols/controller-protocol";

export const makeDeleteCategoryController = (): IController => {
  const categoryRepository = new CategoryRepository();
  const categoryUseCase = new DeleteCategoryUseCase(categoryRepository);
  return new DeleteCategoryController(categoryUseCase);
};
