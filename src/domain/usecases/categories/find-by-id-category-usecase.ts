import { Category } from "../../entities/category";
import { DomainError } from "../../entities/error";

export interface IFindByIdCategoryUseCase {
  findById(id: number): Promise<IFindByIdCategoryUseCase.Result>;
}

export namespace IFindByIdCategoryUseCase {
  export type Result = Category | DomainError;
}
