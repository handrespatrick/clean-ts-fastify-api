import { CategoryRepository } from '@/infra/db/categories/category-repository'
import { prismaClient } from '@/infra/db/prisma-client'

// jest.mock("../prisma-client");

describe('CategoryRepository', () => {
  let categoryRepository: CategoryRepository

  beforeEach(() => {
    categoryRepository = new CategoryRepository()
  })

  describe('create', () => {
    it('should create a new category and return the created category data', async () => {
      const categoryData = {
        name: 'Test Category',
        description: 'Test Description'
      }
      const createdCategory = {
        categoria_id: 1,
        nome_categoria: categoryData.name,
        descricao_categoria: categoryData.description
      }

      jest.spyOn(prismaClient.category, 'create').mockResolvedValueOnce(createdCategory)

      const result = await categoryRepository.create(categoryData)

      expect(result).toEqual(createdCategory)
      expect(prismaClient.category.create).toHaveBeenCalledWith({
        data: {
          nome_categoria: categoryData.name,
          descricao_categoria: categoryData.description
        }
      })
    })
  })

  describe('findAll', () => {
    it('should return all categories', async () => {
      const categories = [
        {
          categoria_id: 1,
          nome_categoria: 'Category 1',
          descricao_categoria: 'Description 1'
        },
        {
          categoria_id: 2,
          nome_categoria: 'Category 2',
          descricao_categoria: 'Description 2'
        }
      ]

      jest.spyOn(prismaClient.category, 'findMany').mockResolvedValueOnce(categories)

      const result = await categoryRepository.findAll()

      expect(result).toEqual(categories)
      expect(prismaClient.category.findMany).toHaveBeenCalled()
    })
  })

  describe('findById', () => {
    it('should return category data for the given id', async () => {
      const categoryId = 1
      const categoryData = {
        categoria_id: categoryId,
        nome_categoria: 'Test Category',
        descricao_categoria: 'Test Description'
      }

      jest.spyOn(prismaClient.category, 'findUnique').mockResolvedValueOnce(categoryData)

      const result = await categoryRepository.findById(categoryId)

      expect(result).toEqual(categoryData)
      expect(prismaClient.category.findUnique).toHaveBeenCalledWith({
        where: { categoria_id: categoryId }
      })
    })
  })

  describe('update', () => {
    it('should update the category and return the updated category data', async () => {
      const categoryId = 1
      const updatedCategoryData = {
        name: 'Updated Category',
        description: 'Updated Description'
      }
      const updatedCategory = {
        categoria_id: categoryId,
        nome_categoria: updatedCategoryData.name,
        descricao_categoria: updatedCategoryData.description
      }

      jest.spyOn(prismaClient.category, 'update').mockResolvedValueOnce(updatedCategory)

      const result = await categoryRepository.update({
        id: categoryId,
        ...updatedCategoryData
      })

      expect(result).toEqual(updatedCategory)
      expect(prismaClient.category.update).toHaveBeenCalledWith({
        where: { categoria_id: categoryId },
        data: {
          nome_categoria: updatedCategoryData.name,
          descricao_categoria: updatedCategoryData.description
        }
      })
    })
  })

  describe('delete', () => {
    it('should delete the category with the given id', async () => {
      const categoryId = 1

      jest.spyOn(prismaClient.category, 'delete').mockResolvedValueOnce({
        categoria_id: categoryId,
        nome_categoria: 'Test Category',
        descricao_categoria: 'Test Description'
      })

      const result = await categoryRepository.delete(categoryId)

      expect(result).toEqual({
        categoria_id: categoryId,
        nome_categoria: 'Test Category',
        descricao_categoria: 'Test Description'
      })
      expect(prismaClient.category.delete).toHaveBeenCalledWith({
        where: { categoria_id: categoryId }
      })
    })
  })
})
