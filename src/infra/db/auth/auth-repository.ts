import { IAuthLoginRepository, IAuthRegisterRepository } from '@/application/protocols/db/auth'
import { User } from '@/domain/entities'
import { Pool } from 'pg'

export class AuthRepository implements IAuthLoginRepository, IAuthRegisterRepository {
  constructor(private readonly _postgresClient: Pool) {}

  async findUserByEmail(email: string): Promise<IAuthLoginRepository.User | null> {
    const result = await this._postgresClient.query('SELECT * FROM login WHERE email = $1', [email])
    if (result.rows.length > 0) {
      const row = result.rows[0]
      return new User({
        id: row.id,
        name: row.name,
        email: row.email,
        password: row.password
      })
    }
    return null
  }

  async addUser(user: IAuthRegisterRepository.AddUser): Promise<IAuthRegisterRepository.User | null> {
    const result = await this._postgresClient.query('INSERT INTO login (email, password) VALUES ($1, $2)', [
      user.email,
      user.password
    ])
    if (result.rows.length > 0) {
      const row = result.rows[0]
      return new User({
        id: row.id,
        name: row.name,
        email: row.email,
        password: row.password
      })
    }
  }
}
