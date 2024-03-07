import { IUpdateCategoryUseCase } from '@/domain/usecases/categories'
import { UpdateCategoryController } from '@/presentation/controllers/categories'
import { serverError, ok, notFound } from '@/presentation/helpers/http-helper'

const mockRequest = {
  id: '1',
  params: { id: '1' },
  raw: {},
  query: {},
  log: {},
  body: {
    name: 'Updated Category',
    description: 'Updated Description'
  }
}

describe('UpdateCategoryController', () => {
  let updateCategoryController: UpdateCategoryController
  let mockUpdateCategoryUseCase: IUpdateCategoryUseCase

  beforeEach(() => {
    mockUpdateCategoryUseCase = {
      update: jest.fn()
    }

    updateCategoryController = new UpdateCategoryController(mockUpdateCategoryUseCase)
  })

  it('should call updateCategoryUseCase with correct parameters', async () => {
    await updateCategoryController.handle(mockRequest)

    expect(mockUpdateCategoryUseCase.update).toHaveBeenCalledWith({
      id: 1,
      ...mockRequest.body
    })
  })

  it('should return 200 with the updated category data if update is successful', async () => {
    const updatedCategory = {
      id: 1,
      name: 'Updated Category',
      description: 'Updated Description'
    }

    jest.spyOn(mockUpdateCategoryUseCase, 'update').mockResolvedValueOnce(updatedCategory)

    const result = await updateCategoryController.handle(mockRequest)

    expect(result).toEqual(ok(updatedCategory))
  })

  it('should return 404 if category to update is not found', async () => {
    const errorResult = { type: 'error', message: 'Category 1 not found' }

    jest.spyOn(mockUpdateCategoryUseCase, 'update').mockResolvedValueOnce(errorResult)

    const result = await updateCategoryController.handle(mockRequest)

    expect(result).toEqual(notFound(errorResult))
  })

  it('should return 500 if an unexpected error occurs', async () => {
    const error = new Error('Internal server error')

    jest.spyOn(mockUpdateCategoryUseCase, 'update').mockRejectedValueOnce(error)

    const result = await updateCategoryController.handle(mockRequest)

    expect(result).toEqual(serverError(error))
  })
})
