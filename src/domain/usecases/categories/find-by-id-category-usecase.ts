import { Category, DomainError } from "@/domain/entities";

export interface IFindByIdCategoryUseCase {
  findById(id: number): Promise<IFindByIdCategoryUseCase.Result>;
}

export namespace IFindByIdCategoryUseCase {
  export type Result = Category | DomainError;
}
