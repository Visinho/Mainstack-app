import { ENV_VAR } from './../config/config';
import { Request, Response } from "express";
// import config from "config";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import { createSession, findSessions, updateSession } from "../services/session.service";
import { update } from "lodash";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    // { expiresIn: config.get("accessTokenTtl") } 
    { expiresIn: ENV_VAR.accessTokenTtl} 
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    // { expiresIn: config.get("refreshTokenTtl") } 
    { expiresIn: ENV_VAR.refreshTokenTtl} 
  );

  // return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({user: userId, valid: true});

  return res.send(sessions);
}
   
export async function deleteUserSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({
    _id: sessionId}, { 
      valid: false
  })

  return res.send({
    accessToken: null,
    refreshToken: null
  })
}
