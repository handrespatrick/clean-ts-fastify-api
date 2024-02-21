import { IAuthLoginUseCase } from '@/domain/usecases/auth'
import { AuthLoginController } from '@/presentation/controllers/auth'
import { ok, serverError, unauthorized } from '@/presentation/helpers/http-helper'

const requestBody = {
  email: 'test@example.com',
  password: 'password123'
}

const mockRequest = {
  id: '1',
  params: {},
  raw: {},
  query: {},
  log: {},
  body: {
    email: 'test@example.com',
    password: 'password123'
  }
}

describe('AuthLoginController', () => {
  let authLoginController: AuthLoginController
  let mockAuthLoginUseCase: IAuthLoginUseCase

  beforeEach(() => {
    mockAuthLoginUseCase = {
      authLogin: jest.fn()
    }
    authLoginController = new AuthLoginController(mockAuthLoginUseCase)
  })

  it('should call authLoginUsecase with correct parameters', async () => {
    const authResult: Partial<{
      accessToken: string
      email: string
      name: string
      type: 'success' | 'error'
      message: string
    }> = {
      type: 'success',
      accessToken: 'token',
      email: mockRequest.body.email,
      name: 'any_name',
      message: 'Login successful'
    }

    jest.spyOn(mockAuthLoginUseCase, 'authLogin').mockResolvedValueOnce(authResult)

    await authLoginController.handle(mockRequest)

    expect(mockAuthLoginUseCase.authLogin).toHaveBeenCalledWith(requestBody)
  })

  it('should return 200 with auth result if login is successful', async () => {
    const authResult: Partial<{
      accessToken: string
      email: string
      name: string
      type: 'success' | 'error'
      message: string
    }> = {
      type: 'success',
      accessToken: 'token',
      email: 'any_mail@mail.com',
      name: 'any_name',
      message: 'Login successful'
    }

    jest.spyOn(mockAuthLoginUseCase, 'authLogin').mockResolvedValueOnce(authResult)

    const result = await authLoginController.handle(mockRequest)

    expect(result).toEqual(ok(authResult))
  })

  it('should return 401 if login is unsuccessful', async () => {
    const errorResult: Partial<{
      accessToken: string
      email: string
      name: string
      type: 'success' | 'error'
      message: string
    }> = { type: 'error', message: 'Unauthorized' }

    jest.spyOn(mockAuthLoginUseCase, 'authLogin').mockResolvedValueOnce(errorResult)

    const result = await authLoginController.handle(mockRequest)

    expect(result).toEqual(unauthorized(errorResult))
  })

  it('should return 500 if an unexpected error occurs', async () => {
    jest.spyOn(mockAuthLoginUseCase, 'authLogin').mockRejectedValueOnce(new Error('Internal server error'))

    const result = await authLoginController.handle(mockRequest)

    expect(result).toEqual(serverError(new Error('Internal server error')))
  })
})
