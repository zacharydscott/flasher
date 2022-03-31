import { Request } from 'express';
export interface AuthRequest extends Request {
	auth: { verified: boolean, sub: any};
}
