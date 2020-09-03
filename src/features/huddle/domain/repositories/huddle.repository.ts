import HuddleEntity from '../entities/huddle.entity';

export interface HuddleRepository {
  createHuddle({ name }: { name: string }): Promise<HuddleEntity>;
}
