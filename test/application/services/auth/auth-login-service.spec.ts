import { IAuthLoginRepository } from "@/application/protocols/db/auth";
import { IBcryptHashComparer } from "@/application/protocols/cryptography/bcrypt/bcrypt-protocol";
import { IJwtEncrypter } from "@/application/protocols/cryptography/jwt/jwt-protocol";
import { AuthLoginService } from "@/application/services/auth";

describe("AuthLoginService", () => {
  let authLoginService: AuthLoginService;
  let authLoginRepositoryMock: IAuthLoginRepository;
  let hashComparerMock: IBcryptHashComparer;
  let jwtEncrypterMock: IJwtEncrypter;

  beforeEach(() => {
    authLoginRepositoryMock = {
      findUserByEmail: jest.fn(),
    };

    hashComparerMock = {
      compare: jest.fn(),
    };

    jwtEncrypterMock = {
      encrypt: jest.fn(),
    };

    authLoginService = new AuthLoginService(
      authLoginRepositoryMock,
      hashComparerMock,
      jwtEncrypterMock
    );
  });

  describe("authLogin", () => {
    it("should return error if email is not found", async () => {
      jest
        .spyOn(authLoginRepositoryMock, "findUserByEmail")
        .mockResolvedValue(null);

      const result = await authLoginService.authLogin({
        email: "nonexistent@example.com",
        password: "password",
      });

      expect(result).toEqual({
        type: "error",
        message: "E-mail not found",
      });
    });

    it("should return error if password is invalid", async () => {
      const userAccount = {
        cliente_id: 123,
        email: "any_mail@mail.com",
        username: "any_username",
        senha: "any_password",
        nome: "any_name",
        cpf: "any_cpf",
        telefone: "any_phone",
        data_nascimento: null,
      };

      jest
        .spyOn(authLoginRepositoryMock, "findUserByEmail")
        .mockResolvedValueOnce(userAccount);
      jest.spyOn(hashComparerMock, "compare").mockResolvedValueOnce(false);

      const result = await authLoginService.authLogin({
        email: "existing@example.com",
        password: "incorrectPassword",
      });

      expect(result).toEqual({
        type: "error",
        message: "Invalid password",
      });
    });

    it("should return success with access token if authentication is successful", async () => {
      const userAccount = {
        cliente_id: 123,
        email: "any_mail@mail.com",
        username: "any_username",
        senha: "any_password",
        nome: "any_name",
        cpf: "any_cpf",
        telefone: "any_phone",
        data_nascimento: null,
      };

      jest
        .spyOn(authLoginRepositoryMock, "findUserByEmail")
        .mockResolvedValueOnce(userAccount);
      jest.spyOn(hashComparerMock, "compare").mockResolvedValueOnce(true);
      jest
        .spyOn(jwtEncrypterMock, "encrypt")
        .mockResolvedValueOnce("accessToken");

      const result = await authLoginService.authLogin({
        email: "existing@example.com",
        password: "correctPassword",
      });

      expect(result).toEqual({
        type: "success",
        accessToken: "accessToken",
        message: "User logged in successfully",
      });
    });
  });
});
