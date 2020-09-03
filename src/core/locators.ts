import { HuddleRepository } from '../features/huddle/domain/repositories/huddle.repository';
import HuddleRespositoryImpl from '../features/huddle/data/mongoose/repositories/huddle_repository_impl';
import HuddleInviteRepositoryImpl from '../features/huddle/data/mongoose/repositories/huddle_invite_repository.impl';
import { HuddleInviteRepository } from '../features/huddle/domain/repositories/huddle.invite.repository';
import CreateHuddle from '../features/huddle/domain/usecases/create.huddle';

// repositories
const huddleRepository: HuddleRepository = new HuddleRespositoryImpl();
const huddleInviteRepository: HuddleInviteRepository = new HuddleInviteRepositoryImpl();

// use cases
export const createHuddle = new CreateHuddle(huddleRepository, huddleInviteRepository);
