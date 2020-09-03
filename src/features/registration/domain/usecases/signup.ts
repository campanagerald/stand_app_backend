import { UserRepository } from '../../../user/domain/repositories/use.repository';
import JWTService from '../../../../core/services/jwt.service';
import BcryptService from '../../../../core/services/bcrypt.service';
import UserEntity from '../../../user/domain/entities/user.entity';
import { Conflict } from '../../../../core/utils/errors';

export default class Signup {
  private jWTService: JWTService;
  private bcryptService: BcryptService;
  private userRepository: UserRepository;

  constructor({ jWTService, userRepository, bcryptService }: { jWTService: JWTService; userRepository: UserRepository; bcryptService: BcryptService }) {
    this.jWTService = jWTService;
    this.userRepository = userRepository;
    this.bcryptService = bcryptService;
  }

  async execute({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }) {
    const isEmailExists = await this.userRepository.isEmailExists(email);
    if (isEmailExists) {
      throw new Conflict('email exists');
    }

    const hashedPassword = await this.bcryptService.hash(password);

    const userEntity = await this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = this.jWTService.sign({
      id: userEntity.id,
      email: userEntity.email,
    });

    return { user: userEntity, token };
  }
}
