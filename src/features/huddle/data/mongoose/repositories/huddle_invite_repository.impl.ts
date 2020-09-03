import { HuddleInviteRepository } from '../../../domain/repositories/huddle.invite.repository';
import HuddleInviteEntity from '../../../domain/entities/huddle.invite.entity';
import { HuddleInviteModel, HuddleInviteDoc } from '../models/huddle.invite';

export default class HuddleInviteRepositoryImpl implements HuddleInviteRepository {
  async createHuddleInvite({ email, huddleId }: { email: string; huddleId: string }): Promise<HuddleInviteEntity> {
    const huddleInvite: HuddleInviteDoc = await HuddleInviteModel.create({
      email,
      huddleId,
    });

    return new HuddleInviteEntity({
      id: huddleInvite._id,
      email: huddleInvite.email,
      huddleId: huddleInvite.huddleId,
      createdAt: huddleInvite.createdAt as Date,
      updatedAt: huddleInvite.updatedAt as Date,
    });
  }
}
