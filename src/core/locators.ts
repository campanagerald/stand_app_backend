import { HuddleRepository } from '../features/huddle/domain/repositories/huddle.repository';
import HuddleRespositoryImpl from '../features/huddle/data/mongoose/repositories/huddle_repository_impl';
import HuddleInviteRepositoryImpl from '../features/huddle/data/mongoose/repositories/huddle_invite_repository.impl';
import { HuddleInviteRepository } from '../features/huddle/domain/repositories/huddle.invite.repository';
import CreateHuddle from '../features/huddle/domain/usecases/create.huddle';
import Signup from '../features/registration/domain/usecases/signup';
import { UserRepository } from '../features/user/domain/repositories/use.repository';
import UserRepositoryImpl from '../features/user/data/mongoose/repositories/user.repository.impl';
import BcryptService from './services/bcrypt.service';
import JWTService from './services/jwt.service';
import { JWT_SECRET } from '../environment.variables';

// services
const bcryptService: BcryptService = new BcryptService();
const jwtService: JWTService = new JWTService(JWT_SECRET);
// repositories
const userRepository: UserRepository = new UserRepositoryImpl();
const huddleRepository: HuddleRepository = new HuddleRespositoryImpl();
const huddleInviteRepository: HuddleInviteRepository = new HuddleInviteRepositoryImpl();

// use cases
export const createHuddle = new CreateHuddle(huddleRepository, huddleInviteRepository);
export const signup = new Signup({ userRepository, bcryptService, jwtService });
