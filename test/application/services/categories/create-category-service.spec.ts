import { ICreateCategoryRepository } from '@/application/protocols/db/categories'
import { CreateCategoryService } from '@/application/services/categories'

describe('CreateCategoryService', () => {
  let createCategoryService: CreateCategoryService
  let createCategoryRepositoryMock: ICreateCategoryRepository

  beforeEach(() => {
    createCategoryRepositoryMock = {
      create: jest.fn()
    }

    createCategoryService = new CreateCategoryService(createCategoryRepositoryMock)
  })

  describe('create', () => {
    it('should create a category and return its details', async () => {
      const categoryData = {
        name: 'Test Category',
        description: 'Test Description'
      }

      const categoryCreated = {
        categoria_id: 123,
        nome_categoria: 'Test Category',
        descricao_categoria: 'Test Description'
      }

      jest.spyOn(createCategoryRepositoryMock, 'create').mockResolvedValueOnce(categoryCreated)

      const result = await createCategoryService.create(categoryData)

      expect(result).toEqual({
        id: 123,
        name: 'Test Category',
        description: 'Test Description'
      })
    })
  })
})
