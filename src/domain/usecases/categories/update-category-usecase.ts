import { Category, DomainError } from "@/domain/entities";

export interface IUpdateCategoryUseCase {
  update(
    data: IUpdateCategoryUseCase.Params
  ): Promise<IUpdateCategoryUseCase.Result>;
}

export namespace IUpdateCategoryUseCase {
  export type Params = Category;
  export type Result = Category | DomainError;
}
