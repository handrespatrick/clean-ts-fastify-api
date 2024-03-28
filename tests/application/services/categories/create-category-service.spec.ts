import { ICreateCategoryRepository } from '@/application/protocols/db/categories'
import { CreateCategoryService } from '@/application/services/categories'

describe('CreateCategoryService', () => {
  let service: CreateCategoryService
  let createCategoryRepositoryMock: ICreateCategoryRepository

  beforeEach(() => {
    createCategoryRepositoryMock = {
      create: jest.fn()
    }

    service = new CreateCategoryService(createCategoryRepositoryMock)
  })

  const categoryData = {
    name: 'Test Category',
    description: 'Test Description'
  }

  describe('create', () => {
    it('should create a category and return its details', async () => {
      const categoryCreated = {
        categoria_id: 123,
        nome_categoria: 'Test Category',
        descricao_categoria: 'Test Description'
      }

      jest.spyOn(createCategoryRepositoryMock, 'create').mockResolvedValueOnce(categoryCreated)

      const result = await service.create(categoryData)

      expect(result).toEqual({
        id: 123,
        name: 'Test Category',
        description: 'Test Description'
      })
    })

    it('should throw if CreateCategoryRepository.create throws', async () => {
      jest.spyOn(createCategoryRepositoryMock, 'create').mockRejectedValueOnce(new Error())

      const promise = service.create(categoryData)

      expect(promise).rejects.toThrow(new Error())
    })
  })
})
