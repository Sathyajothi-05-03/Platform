import * as jwt from 'jsonwebtoken';
import { Role } from '../constants/roles.enum';

const JWT_SECRET = process.env.JWT_SECRET || 'change_me_to_a_secret';

export interface JwtPayload {
  sub: string; // user id
  email: string;
  role: Role;
}

/**
 * Sign a JWT token.
 * @param payload payload to embed
 * @param expiresIn optional expiration (e.g. '1h')
 */
export function signJwt(payload: JwtPayload, expiresIn = '1h'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify a JWT token and return the payload.
 * Throws jsonwebtoken errors on failure.
 */
export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
