import { Category, DomainError } from "@/domain/entities";

export interface IDeleteCategoryUseCase {
  delete(id: number): Promise<IDeleteCategoryUseCase.Result>;
}

export namespace IDeleteCategoryUseCase {
  export type Result = Category | DomainError;
}
