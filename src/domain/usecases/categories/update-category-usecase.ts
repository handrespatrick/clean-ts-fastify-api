import { Category } from "../../entities/category";
import { DomainError } from "../../entities/error";

export interface IUpdateCategoryUseCase {
  update(
    data: IUpdateCategoryUseCase.Params
  ): Promise<IUpdateCategoryUseCase.Result>;
}

export namespace IUpdateCategoryUseCase {
  export type Params = Category;
  export type Result = Category | DomainError;
}
