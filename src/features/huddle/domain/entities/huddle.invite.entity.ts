export default class HuddleInviteEntity {
  id: string;
  email: string;
  huddleId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, email, huddleId, createdAt, updatedAt }: { id: string; email: string; huddleId: string; createdAt: Date; updatedAt: Date }) {
    this.id = id;
    this.email = email;
    this.huddleId = huddleId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
