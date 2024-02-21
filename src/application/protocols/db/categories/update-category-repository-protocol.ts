import { IFindByIdCategoryRepository } from './find-by-id-category-repository-protocol'

export interface IUpdateCategoryRepository {
  findById(id: number): Promise<IFindByIdCategoryRepository.Result>
  update(data: IUpdateCategoryRepository.Params): Promise<IUpdateCategoryRepository.Result>
}

export namespace IUpdateCategoryRepository {
  export type Params = {
    id: number
    name: string | null
    description: string | null
  }
  export type Result = {
    categoria_id: number
    nome_categoria: string | null
    descricao_categoria: string | null
  }
}
