import { IAuthRegisterRepository } from "@/application/protocols/db/auth";
import { IBcryptHasher } from "@/application/protocols/cryptography/bcrypt/bcrypt-protocol";
import { AuthRegisterService } from "@/application/services/auth";

describe("AuthRegisterService", () => {
  let authRegisterService: AuthRegisterService;
  let authRegisterRepositoryMock: IAuthRegisterRepository;
  let bcryptHasherMock: IBcryptHasher;

  beforeEach(() => {
    authRegisterRepositoryMock = {
      findUserByEmail: jest.fn(),
      addUser: jest.fn(),
    };

    bcryptHasherMock = {
      hash: jest.fn(),
    };

    authRegisterService = new AuthRegisterService(
      authRegisterRepositoryMock,
      bcryptHasherMock
    );
  });

  describe("authRegister", () => {
    it('should return "E-mail already in use" if email is already registered', async () => {
      jest
        .spyOn(authRegisterRepositoryMock, "findUserByEmail")
        .mockResolvedValueOnce({
          cliente_id: 123,
          email: "any_mail@mail.com",
          username: "any_username",
          senha: "any_password",
          nome: "any_name",
          cpf: "any_cpf",
          telefone: "any_phone",
          data_nascimento: null,
        });

      const result = await authRegisterService.authRegister({
        email: "existing@example.com",
        password: "password",
      });

      expect(result).toBe("E-mail already in use");
    });

    it('should return "User created successfully" if registration is successful', async () => {
      jest
        .spyOn(authRegisterRepositoryMock, "findUserByEmail")
        .mockResolvedValueOnce(null);
      jest
        .spyOn(bcryptHasherMock, "hash")
        .mockResolvedValueOnce("hashedPassword");
      jest.spyOn(authRegisterRepositoryMock, "addUser").mockResolvedValueOnce({
        cliente_id: 123,
        email: "any_mail@mail.com",
        username: "any_username",
        senha: "any_password",
        nome: "any_name",
        cpf: "any_cpf",
        telefone: "any_phone",
        data_nascimento: null,
      });

      const result = await authRegisterService.authRegister({
        email: "new@example.com",
        password: "password",
      });

      expect(result).toBe("User created successfully");
    });

    it('should return "User creation failed" if registration fails', async () => {
      jest
        .spyOn(authRegisterRepositoryMock, "findUserByEmail")
        .mockResolvedValueOnce(null);
      jest
        .spyOn(bcryptHasherMock, "hash")
        .mockResolvedValueOnce("hashedPassword");
      jest
        .spyOn(authRegisterRepositoryMock, "addUser")
        .mockResolvedValueOnce(null);

      const result = await authRegisterService.authRegister({
        email: "new@example.com",
        password: "password",
      });

      expect(result).toBe("User creation failed");
    });
  });
});
