import { IFindByIdCategoryRepository } from '@/application/protocols/db/categories'
import { FindByIdCategoryService } from '@/application/services/categories'

describe('FindByIdCategoryService', () => {
  let service: FindByIdCategoryService
  let findByIdCategoryRepositoryMock: IFindByIdCategoryRepository

  beforeEach(() => {
    findByIdCategoryRepositoryMock = {
      findById: jest.fn()
    }

    service = new FindByIdCategoryService(findByIdCategoryRepositoryMock)
  })

  describe('findById', () => {
    const categoryId = 123

    it('should return error message if category is not found', async () => {
      jest.spyOn(findByIdCategoryRepositoryMock, 'findById').mockResolvedValueOnce(null)

      const result = await service.findById(categoryId)

      expect(result).toEqual({
        type: 'error',
        message: `Category ${categoryId} not found`
      })
    })

    it('should return category details if category is found', async () => {
      const categoryDetails = {
        categoria_id: categoryId,
        nome_categoria: 'Test Category',
        descricao_categoria: 'Test Description'
      }

      jest.spyOn(findByIdCategoryRepositoryMock, 'findById').mockResolvedValueOnce(categoryDetails)

      const result = await service.findById(categoryId)

      expect(result).toEqual({
        id: categoryId,
        name: 'Test Category',
        description: 'Test Description'
      })
    })

    it('should throw if FindByIdCategoryRepository.findById throws', async () => {
      jest.spyOn(findByIdCategoryRepositoryMock, 'findById').mockRejectedValueOnce(new Error())

      const promise = service.findById(categoryId)

      expect(promise).rejects.toThrow(new Error())
    })
  })
})
