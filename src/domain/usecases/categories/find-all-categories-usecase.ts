import { Category } from "../../entities/category";

export interface IFindAllCategoriesUseCase {
  findAll(): Promise<IFindAllCategoriesUseCase.Result>;
}

export namespace IFindAllCategoriesUseCase {
  export type Result = Category[];
}
