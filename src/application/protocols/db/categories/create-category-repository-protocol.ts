export interface ICreateCategoryRepository {
  create(data: ICreateCategoryRepository.CreateParams): Promise<ICreateCategoryRepository.CreateResult>
}

export namespace ICreateCategoryRepository {
  export type CreateParams = {
    name: string
    description: string
  }
  export type CreateResult = {
    categoria_id: number
    nome_categoria: string | null
    descricao_categoria: string | null
  }
}
