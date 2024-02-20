export interface IFindAllCategoriesRepository {
  findAll(): Promise<IFindAllCategoriesRepository.Result>;
}

export namespace IFindAllCategoriesRepository {
  export type Result = {
    categoria_id: number;
    nome_categoria: string | null;
    descricao_categoria: string | null;
  }[];
}
