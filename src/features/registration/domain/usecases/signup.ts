import { UserRepository } from '../../../user/domain/repositories/use.repository';
import JWTService from '../../../../core/services/jwt.service';
import BcryptService from '../../../../core/services/bcrypt.service';
import { Conflict } from '../../../../core/utils/errors';

export default class Signup {
  private jwtService: JWTService;
  private bcryptService: BcryptService;
  private userRepository: UserRepository;

  constructor({ jwtService, userRepository, bcryptService }: { jwtService: JWTService; userRepository: UserRepository; bcryptService: BcryptService }) {
    this.jwtService = jwtService;
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

    const token = this.jwtService.sign({
      id: userEntity.id,
      email: userEntity.email,
    });

    // assign null property to the password

    return { user: userEntity, token };
  }
}
