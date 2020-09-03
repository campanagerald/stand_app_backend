import HuddleInviteEntity from '../entities/huddle.invite.entity';

export interface HuddleInviteRepository {
  createHuddleInvite({ email, huddleId }: { email: string; huddleId: string }): Promise<HuddleInviteEntity>;
}
