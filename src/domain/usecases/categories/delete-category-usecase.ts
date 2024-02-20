import { Category } from "../../entities/category";
import { DomainError } from "../../entities/error";

export interface IDeleteCategoryUseCase {
  delete(id: number): Promise<IDeleteCategoryUseCase.Result>;
}

export namespace IDeleteCategoryUseCase {
  export type Result = Category | DomainError;
}
