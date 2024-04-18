import SessionModel, { SessionDocument } from "../models/session.model";


export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

