export type UserType = {
  id: string
  name: string
  email: string
  password: string
}

export class User {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly password: string

  constructor({ id, name, email, password }: UserType) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }
}
