import { IFindByIdCategoryRepository } from "./find-by-id-category-repository-protocol";

export interface IDeleteCategoryRepository {
  findById(id: number): Promise<IFindByIdCategoryRepository.Result>;
  delete(id: number): Promise<IDeleteCategoryRepository.Result>;
}

export namespace IDeleteCategoryRepository {
  export type Result = {
    categoria_id: number;
    nome_categoria: string | null;
    descricao_categoria: string | null;
  };
}
