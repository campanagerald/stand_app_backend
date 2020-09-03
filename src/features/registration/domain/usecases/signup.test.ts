import UserEntity from '../../../user/domain/entities/user.entity';
import Signup from './signup';
import JWTService from '../../../../core/services/jwt.service';
import BcryptService from '../../../../core/services/bcrypt.service';
import { UserRepository } from '../../../user/domain/repositories/use.repository';
import { Conflict } from '../../../../core/utils/errors';

describe('User usecases', () => {
  describe('signup', () => {
    let mockJwtService: JWTService;
    let mockBcryptService: BcryptService;
    let mockUserRepository: UserRepository;
    let usecase: Signup;

    mockJwtService = {} as JWTService;
    mockBcryptService = {} as BcryptService;
    mockUserRepository = {} as UserRepository;

    usecase = new Signup({
      jWTService: mockJwtService,
      bcryptService: mockBcryptService,
      userRepository: mockUserRepository,
    });

    // setup data
    const tUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@test.com',
      password: 'password',
    };

    const tHashedPassword = 'xxxxx';
    const tToken = 'thisisatoken';

    const tUserEntity = new UserEntity({
      id: '1',
      firstName: tUser.firstName,
      lastName: tUser.firstName,
      email: tUser.email,
      password: tHashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    describe('error', () => {
      it('should throw a conflict error when email is already existed', async () => {
        // arrange
        mockUserRepository.isEmailExists = jest.fn().mockResolvedValue(true);
        const error = new Conflict('email exists');

        // act
        try {
          await usecase.execute(tUser);
        } catch (err) {
          expect(err).toMatchObject(error);
        }

        // assert
        expect(mockUserRepository.isEmailExists).toBeCalledWith(tUser.email);
      });
    });

    describe('success', () => {
      beforeEach(() => {
        // arrange
        mockUserRepository.isEmailExists = jest.fn().mockResolvedValue(false);
        mockUserRepository.create = jest.fn().mockResolvedValue(tUserEntity);
        mockBcryptService.hash = jest.fn().mockResolvedValue(tHashedPassword);
        mockJwtService.sign = jest.fn().mockReturnValue(tToken);
      });

      it('should hash the password', async () => {
        // act
        await usecase.execute(tUser);

        // assert
        expect(mockBcryptService.hash).toBeCalledWith(tUser.password);
      });

      it('should create user entity', async () => {
        // act
        await usecase.execute(tUser);

        // assert
        expect(mockUserRepository.create).toHaveBeenCalledWith({ ...tUser, password: tHashedPassword });
      });

      it('should create jwt token', async () => {
        // act
        await usecase.execute(tUser);

        // assert
        expect(mockJwtService.sign).toHaveBeenCalledWith({ id: tUserEntity.id, email: tUserEntity.email });
      });

      it('should return the created user entity and jwt token', async () => {
        // act
        const result = await usecase.execute(tUser);

        // assert
        expect(result.user).toBe(tUserEntity);
        expect(result.token).toBe(tToken);
      });
    });
  });
});
