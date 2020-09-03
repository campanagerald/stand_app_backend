import { UserRepository } from '../../../domain/repositories/use.repository';
import UserEntity from '../../../domain/entities/user.entity';
import { UserModel } from '../models/user';

export default class UserRepositoryImpl implements UserRepository {
  async create({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }): Promise<UserEntity> {
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    return new UserEntity({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt as Date,
      updatedAt: user.updatedAt as Date,
    });
  }
}
