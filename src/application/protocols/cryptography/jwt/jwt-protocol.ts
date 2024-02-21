export interface IJwtDecrypter {
  decrypt(ciphertext: string): Promise<string | JwtPayload>;
}

export interface IJwtEncrypter {
  encrypt(plaintext: object): Promise<string>;
}

type JwtPayload = {
  [key: string]: any;
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
};
