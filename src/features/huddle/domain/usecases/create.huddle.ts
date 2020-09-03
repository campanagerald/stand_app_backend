import { HuddleRepository } from '../repositories/huddle.repository';
import HuddleEntity from '../entities/huddle.entity';
import { HuddleInviteRepository } from '../repositories/huddle.invite.repository';

export default class CreateHuddle {
  private huddleRepository: HuddleRepository;
  private huddleInviteRepository: HuddleInviteRepository;

  constructor(huddleRepository: HuddleRepository, huddleInviteRepository: HuddleInviteRepository) {
    this.huddleRepository = huddleRepository;
    this.huddleInviteRepository = huddleInviteRepository;
  }

  async execute({ name, participantsEmail }: { name: string; participantsEmail: Array<string> }): Promise<HuddleEntity> {
    const huddleEntity = await this.huddleRepository.createHuddle({ name });

    if (participantsEmail.length > 0) {
      for (const email of participantsEmail) {
        await this.huddleInviteRepository.createHuddleInvite({
          email,
          huddleId: huddleEntity.id,
        });
      }
    }

    return huddleEntity;
  }
}
