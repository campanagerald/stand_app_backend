import { HuddleRepository } from '../../../domain/repositories/huddle.repository';
import HuddleEntity from '../../../domain/entities/huddle.entity';
import { HuddleModel } from '../models/huddle';

export default class HuddleRespositoryImpl implements HuddleRepository {
  async createHuddle({ name }: { name: string }): Promise<HuddleEntity> {
    const huddle = await HuddleModel.create({
      name,
    });

    return new HuddleEntity({
      id: huddle._id,
      name: huddle.name,
      createdAt: huddle.createdAt as Date,
      updatedAt: huddle.updatedAt as Date,
    });
  }
}
