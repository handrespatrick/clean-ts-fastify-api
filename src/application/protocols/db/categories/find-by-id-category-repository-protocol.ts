export interface IFindByIdCategoryRepository {
  findById(id: number): Promise<IFindByIdCategoryRepository.Result>
}

export namespace IFindByIdCategoryRepository {
  export type Result = {
    categoria_id: number
    nome_categoria: string | null
    descricao_categoria: string | null
  } | null
}
