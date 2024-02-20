import {
  IJwtDecrypter,
  IJwtEncrypter,
} from "../../../application/protocols/cryptography/jwt/jwt-protocol";
import jwt, { JwtPayload } from "jsonwebtoken";

export class JwtAdapter implements IJwtEncrypter, IJwtDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: object): Promise<string> {
    return jwt.sign(plaintext, this.secret);
  }

  async decrypt(ciphertext: string): Promise<string | JwtPayload> {
    return jwt.verify(ciphertext, this.secret);
  }
}
