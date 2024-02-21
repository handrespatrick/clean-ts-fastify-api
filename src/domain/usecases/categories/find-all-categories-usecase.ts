import { Category, DomainError } from "@/domain/entities";

export interface IFindAllCategoriesUseCase {
  findAll(): Promise<IFindAllCategoriesUseCase.Result>;
}

export namespace IFindAllCategoriesUseCase {
  export type Result = Category[] | DomainError;
}
