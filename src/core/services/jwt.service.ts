import jwt from 'jsonwebtoken';

export default class JWTService {
  private secretOrPrivateKey: string;

  constructor(secretOrPrivateKey: string) {
    this.secretOrPrivateKey = secretOrPrivateKey;
  }

  sign(payload: string | object | Buffer, options?: jwt.SignOptions | undefined) {
    return jwt.sign(payload, this.secretOrPrivateKey, options);
  }

  verify(token: string, options?: jwt.VerifyOptions | undefined) {
    return jwt.verify(token, this.secretOrPrivateKey, options);
  }
}
