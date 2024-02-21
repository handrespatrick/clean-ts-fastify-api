import { IBcryptHasher } from '@/application/protocols/cryptography/bcrypt/bcrypt-protocol'
import { IAuthRegisterRepository } from '@/application/protocols/db/auth'
import { IAuthRegisterUseCase } from '@/domain/usecases/auth'

export class AuthRegisterService implements IAuthRegisterUseCase {
  constructor(
    private readonly _authRegisterRepository: IAuthRegisterRepository,
    private readonly _bcryptHasher: IBcryptHasher
  ) {}

  async authRegister(params: IAuthRegisterUseCase.Params): Promise<string | null> {
    const existingUser = await this._authRegisterRepository.findUserByEmail(params.email)
    if (existingUser) {
      return 'E-mail already in use'
    }

    const hashedPassword = await this._bcryptHasher.hash(params.password)
    const userId = await this._authRegisterRepository.addUser({
      email: params.email,
      password: hashedPassword
    })

    return userId ? 'User created successfully' : 'User creation failed'
  }
}
