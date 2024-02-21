import { Category } from "@/domain/entities";

export interface ICreateCategoryUseCase {
  create(
    data: ICreateCategoryUseCase.Params
  ): Promise<ICreateCategoryUseCase.Result>;
}

export namespace ICreateCategoryUseCase {
  export type Params = {
    name: string;
    description: string;
  };

  export type Result = Category;
}
