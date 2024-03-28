import { IDeleteCategoryRepository } from '@/application/protocols/db/categories'
import { DeleteCategoryService } from '@/application/services/categories'

describe('DeleteCategoryService', () => {
  let service: DeleteCategoryService
  let deleteCategoryRepositoryMock: IDeleteCategoryRepository

  beforeEach(() => {
    deleteCategoryRepositoryMock = {
      findById: jest.fn(),
      delete: jest.fn()
    }

    service = new DeleteCategoryService(deleteCategoryRepositoryMock)
  })

  const categoryId = 123

  describe('delete', () => {
    it('should return error if category with given id is not found', async () => {
      jest.spyOn(deleteCategoryRepositoryMock, 'findById').mockResolvedValueOnce(null)

      const result = await service.delete(categoryId)

      expect(result).toEqual({
        type: 'error',
        message: `Category ${categoryId} not found`
      })
    })

    it('should delete a category and return its details', async () => {
      const categoryToDelete = {
        categoria_id: categoryId,
        nome_categoria: 'Test Category',
        descricao_categoria: 'Test Description'
      }

      jest.spyOn(deleteCategoryRepositoryMock, 'findById').mockResolvedValueOnce(categoryToDelete)
      jest.spyOn(deleteCategoryRepositoryMock, 'delete').mockResolvedValueOnce(categoryToDelete)

      const result = await service.delete(categoryId)

      expect(result).toEqual({
        id: categoryId,
        name: 'Test Category',
        description: 'Test Description'
      })
    })

    it('should throw if DeleteCategoryRepository.findById throws', async () => {
      jest.spyOn(deleteCategoryRepositoryMock, 'findById').mockRejectedValueOnce(new Error())

      const promise = service.delete(categoryId)

      expect(promise).rejects.toThrow(new Error())
    })

    it('should throw if DeleteCategoryRepository.delete throws', async () => {
      const categoryToDelete = {
        categoria_id: categoryId,
        nome_categoria: 'Test Category',
        descricao_categoria: 'Test Description'
      }

      jest.spyOn(deleteCategoryRepositoryMock, 'findById').mockResolvedValueOnce(categoryToDelete)
      jest.spyOn(deleteCategoryRepositoryMock, 'delete').mockRejectedValueOnce(new Error())

      const promise = service.delete(categoryId)

      expect(promise).rejects.toThrow(new Error())
    })
  })
})
