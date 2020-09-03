import UserEntity from '../entities/user.entity';

export interface UserRepository {
  create({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }): Promise<UserEntity>;
  isEmailExists(email: string): Promise<boolean>;
}
