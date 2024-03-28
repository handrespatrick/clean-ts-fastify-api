import { IUpdateCategoryRepository } from '@/application/protocols/db/categories'
import { UpdateCategoryService } from '@/application/services/categories'

describe('UpdateCategoryService', () => {
  let service: UpdateCategoryService
  let updateCategoryRepositoryMock: IUpdateCategoryRepository

  beforeEach(() => {
    updateCategoryRepositoryMock = {
      findById: jest.fn(),
      update: jest.fn()
    }

    service = new UpdateCategoryService(updateCategoryRepositoryMock)
  })

  describe('update', () => {
    it('should return error message if category is not found', async () => {
      const categoryId = 123
      const categoryData = {
        id: categoryId,
        name: 'Test Category',
        description: 'Test Description'
      }

      jest.spyOn(updateCategoryRepositoryMock, 'findById').mockResolvedValueOnce(null)

      const result = await service.update(categoryData)

      expect(result).toEqual({
        type: 'error',
        message: `Category ${categoryId} not found`
      })
      expect(updateCategoryRepositoryMock.update).not.toHaveBeenCalled()
    })

    it('should update category and return updated details', async () => {
      const categoryId = 123
      const categoryData = {
        id: categoryId,
        name: 'Updated Category',
        description: 'Updated Description'
      }
      const updatedCategoryDetails = {
        categoria_id: categoryId,
        nome_categoria: 'Updated Category',
        descricao_categoria: 'Updated Description'
      }

      jest.spyOn(updateCategoryRepositoryMock, 'findById').mockResolvedValueOnce({
        categoria_id: categoryId,
        nome_categoria: 'Test Category',
        descricao_categoria: 'Test Description'
      })
      jest.spyOn(updateCategoryRepositoryMock, 'update').mockResolvedValueOnce(updatedCategoryDetails)

      const result = await service.update(categoryData)

      expect(result).toEqual({
        id: categoryId,
        name: 'Updated Category',
        description: 'Updated Description',
        updatedAt: expect.any(Date)
      })
    })

    it('should throw if UpdateCategoryRepository.findById throws', async () => {
      const categoryData = {
        id: 123,
        name: 'Test Category',
        description: 'Test Description'
      }

      jest.spyOn(updateCategoryRepositoryMock, 'findById').mockRejectedValueOnce(new Error())

      const promise = service.update(categoryData)

      expect(promise).rejects.toThrow(new Error())
    })
  })
})
