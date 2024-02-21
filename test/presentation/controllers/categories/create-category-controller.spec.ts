import { ICreateCategoryUseCase } from '@/domain/usecases/categories'
import { CreateCategoryController } from '@/presentation/controllers/categories'
import { ok, serverError } from '@/presentation/helpers/http-helper'

const requestBody = {
  name: 'Test Category',
  description: 'Test Description'
}

const mockRequest = {
  id: '1',
  params: {},
  raw: {},
  query: {},
  log: {},
  body: {
    name: 'Test Category',
    description: 'Test Description'
  }
}

describe('CreateCategoryController', () => {
  let createCategoryController: CreateCategoryController
  let mockCreateCategoryUseCase: ICreateCategoryUseCase

  beforeEach(() => {
    mockCreateCategoryUseCase = {
      create: jest.fn()
    }

    createCategoryController = new CreateCategoryController(mockCreateCategoryUseCase)
  })

  it('should call createCategoryUseCase with correct parameters', async () => {
    const createdCategory = {
      id: 1,
      name: 'Test Category',
      description: 'Test Description'
    }

    jest.spyOn(mockCreateCategoryUseCase, 'create').mockResolvedValueOnce(createdCategory)

    await createCategoryController.handle(mockRequest)

    expect(mockCreateCategoryUseCase.create).toHaveBeenCalledWith(requestBody)
  })

  it('should return 200 with created category data if creation is successful', async () => {
    const createdCategory = {
      id: 1,
      name: 'Test Category',
      description: 'Test Description'
    }

    jest.spyOn(mockCreateCategoryUseCase, 'create').mockResolvedValueOnce(createdCategory)

    const result = await createCategoryController.handle(mockRequest)

    expect(result).toEqual(ok(createdCategory))
  })

  it('should return 500 if an unexpected error occurs', async () => {
    jest.spyOn(mockCreateCategoryUseCase, 'create').mockRejectedValueOnce(new Error('Internal server error'))

    const result = await createCategoryController.handle(mockRequest)

    expect(result).toEqual(serverError(new Error('Internal server error')))
  })
})
