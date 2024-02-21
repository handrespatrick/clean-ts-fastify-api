import {
  ICreateCategoryRepository,
  IDeleteCategoryRepository,
  IFindAllCategoriesRepository,
  IFindByIdCategoryRepository,
  IUpdateCategoryRepository
} from '@/application/protocols/db/categories'

import { prismaClient } from '../prisma-client'

export class CategoryRepository
  implements
    ICreateCategoryRepository,
    IFindAllCategoriesRepository,
    IFindByIdCategoryRepository,
    IUpdateCategoryRepository,
    IDeleteCategoryRepository
{
  async create({
    name,
    description
  }: ICreateCategoryRepository.CreateParams): Promise<ICreateCategoryRepository.CreateResult> {
    return prismaClient.category.create({
      data: {
        nome_categoria: name,
        descricao_categoria: description
      }
    })
  }

  async findAll(): Promise<IFindAllCategoriesRepository.Result> {
    return prismaClient.category.findMany()
  }

  async findById(id: number): Promise<IFindByIdCategoryRepository.Result> {
    return prismaClient.category.findUnique({
      where: {
        categoria_id: id
      }
    })
  }

  async update({ id, name, description }: IUpdateCategoryRepository.Params): Promise<IUpdateCategoryRepository.Result> {
    return prismaClient.category.update({
      where: {
        categoria_id: id
      },
      data: {
        nome_categoria: name,
        descricao_categoria: description
      }
    })
  }

  async delete(id: number): Promise<IDeleteCategoryRepository.Result> {
    return prismaClient.category.delete({
      where: {
        categoria_id: id
      }
    })
  }
}
