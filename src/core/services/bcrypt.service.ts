import bcrypt from 'bcryptjs';

export default class BcryptService {
  private readonly salt = bcrypt.genSaltSync(10);

  async hash(s: string): Promise<string> {
    return bcrypt.hash(s, this.salt);
  }

  async compare(s: string, hash: string): Promise<boolean> {
    return bcrypt.compare(s, hash);
  }
}
