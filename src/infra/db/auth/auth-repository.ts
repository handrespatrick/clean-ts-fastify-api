import { IAuthLoginRepository, IAuthRegisterRepository } from '@/application/protocols/db/auth'
import { prismaClient } from '../prisma-client'

export class AuthRepository implements IAuthLoginRepository, IAuthRegisterRepository {
  async findUserByEmail(email: string): Promise<IAuthLoginRepository.Result> {
    return prismaClient.user.findUnique({
      where: {
        email
      }
    })
  }

  async addUser(userData: IAuthRegisterRepository.Params): Promise<IAuthRegisterRepository.Result> {
    return prismaClient.user.create({
      data: {
        email: userData.email,
        username: null,
        senha: userData.password,
        nome: null,
        cpf: '',
        telefone: null,
        data_nascimento: null
      }
    })
  }
}
