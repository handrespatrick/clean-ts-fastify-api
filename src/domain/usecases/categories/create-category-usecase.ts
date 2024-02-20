import { Category } from "../../entities/category";

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
