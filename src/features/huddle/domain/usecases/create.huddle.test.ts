import HuddleEntity from '../entities/huddle.entity';
import { HuddleRepository } from '../repositories/huddle.repository';
import CreateHuddle from './create.huddle';
import { HuddleInviteRepository } from '../repositories/huddle.invite.repository';

describe('huddle usecases', () => {
  describe('createHuddle', () => {
    const huddleName = 'Stand up';
    const huddleEntity = new HuddleEntity({
      id: '1',
      name: huddleName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const mockHuddleRepository: HuddleRepository = {
      createHuddle: jest.fn().mockResolvedValue(huddleEntity),
    };

    const mockHuddleInviteRepository: HuddleInviteRepository = {
      createHuddleInvite: jest.fn(),
    };

    const usecase = new CreateHuddle(mockHuddleRepository, mockHuddleInviteRepository);

    it('should call createHuddleUsecase.execute with correct parameters', async () => {
      await usecase.execute({
        name: huddleName,
        participantsEmail: [],
      });

      expect(mockHuddleRepository.createHuddle).toHaveBeenCalledWith({
        name: huddleName,
      });
      expect(mockHuddleInviteRepository.createHuddleInvite).not.toHaveBeenCalled();
    });

    it('should call createHuddleInviteUsecase.execute when there are participantsEmail', async () => {
      const participantsEmail = ['a@b.c', 'a@d.e'];

      await usecase.execute({
        name: huddleName,
        participantsEmail: participantsEmail,
      });

      expect(mockHuddleInviteRepository.createHuddleInvite).toHaveBeenNthCalledWith(1, {
        email: participantsEmail[0],
        huddleId: huddleEntity.id,
      });
      expect(mockHuddleInviteRepository.createHuddleInvite).toHaveBeenNthCalledWith(2, {
        email: participantsEmail[1],
        huddleId: huddleEntity.id,
      });
    });

    it('should return created huddle', async () => {
      const result = await usecase.execute({
        name: huddleName,
        participantsEmail: [],
      });

      expect(result).toBe(huddleEntity);
    });
  });
});
