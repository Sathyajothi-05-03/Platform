import { Role } from '../constants/roles.enum';
export interface JwtPayload {
    sub: string;
    email: string;
    role: Role;
}
export declare function signJwt(payload: JwtPayload, expiresIn?: string): string;
export declare function verifyJwt(token: string): JwtPayload;
