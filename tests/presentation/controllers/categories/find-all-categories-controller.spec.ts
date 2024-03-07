import { IFindAllCategoriesUseCase } from '@/domain/usecases/categories'
import { FindAllCategoriesController } from '@/presentation/controllers/categories'
import { serverError, ok } from '@/presentation/helpers/http-helper'

describe('FindAllCategoriesController', () => {
  let findAllCategoriesController: FindAllCategoriesController
  let mockFindAllCategoriesUseCase: IFindAllCategoriesUseCase

  beforeEach(() => {
    mockFindAllCategoriesUseCase = {
      findAll: jest.fn()
    }

    findAllCategoriesController = new FindAllCategoriesController(mockFindAllCategoriesUseCase)
  })

  it('should call findAllCategoriesUseCase', async () => {
    await findAllCategoriesController.handle()

    expect(mockFindAllCategoriesUseCase.findAll).toHaveBeenCalled()
  })

  it('should return 200 with the found categories data if retrieval is successful', async () => {
    const categories = [
      { id: 1, name: 'Category 1', description: 'Description 1' },
      { id: 2, name: 'Category 2', description: 'Description 2' }
    ]

    jest.spyOn(mockFindAllCategoriesUseCase, 'findAll').mockResolvedValueOnce(categories)

    const result = await findAllCategoriesController.handle()

    expect(result).toEqual(ok(categories))
  })

  it('should return 500 if an unexpected error occurs', async () => {
    const error = new Error('Internal server error')

    jest.spyOn(mockFindAllCategoriesUseCase, 'findAll').mockRejectedValueOnce(error)

    const result = await findAllCategoriesController.handle()

    expect(result).toEqual(serverError(error))
  })
})
