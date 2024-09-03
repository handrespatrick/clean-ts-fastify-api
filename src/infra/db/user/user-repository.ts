import {
  ICreateUserRepository,
  IDeleteUserRepository,
  IFindAllUserRepository,
  IFindByIdUserRepository,
  IUpdateUserRepository
} from '@/application/protocols/db/user'
import { User } from '@/domain/entities'
import { Pool } from 'pg'

export class UserRepository
  implements
    ICreateUserRepository,
    IFindAllUserRepository,
    IFindByIdUserRepository,
    IUpdateUserRepository,
    IDeleteUserRepository
{
  constructor(private readonly _postgresClient: Pool) {}

  async create(user: ICreateUserRepository.CreateUser): Promise<void> {
    await this._postgresClient.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)', [
      user.id,
      user.name,
      user.email,
      user.password
    ])
  }

  async findAll(): Promise<IFindAllUserRepository.AllUsers> {
    const result = await this._postgresClient.query('SELECT * FROM users')
    return result.rows.map(
      (row) =>
        new User({
          id: row.id,
          name: row.name,
          email: row.email,
          password: row.password
        })
    )
  }

  async findById(id: string): Promise<IFindByIdUserRepository.FindUser> {
    const result = await this._postgresClient.query('SELECT * FROM users WHERE id = $1', [id])
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

  async update(user: IUpdateUserRepository.UpdateUser): Promise<void> {
    await this._postgresClient.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [
      user.name,
      user.email,
      user.password,
      user.id
    ])
  }

  async delete(id: string): Promise<void> {
    await this._postgresClient.query('DELETE FROM users WHERE id = $1', [id])
  }
}
