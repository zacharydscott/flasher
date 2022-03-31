import { Response } from 'express';
import { AuthRequest } from '../types/auth-request';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function JWTauthMiddleware(req: AuthRequest, res: Response, next: () => void) {
	const token = req.headers.authorization;
	if (!token) {
		req.auth = { verified: false, sub: null};
		return next();
	}
	jwt.verify(token,process.env.FLASH_SECRET, (err, decodedToken: JwtPayload) => {
		if (err) {
			return res.status(401).json({error: {location: 'headers'}, message: 'Invalid authentication token'});
		} else if (decodedToken.payload.refresh) {
			return res.status(401).json({error: {location: 'headers'}, message: 'Refresh token sent, send normal token'});
		}
		console.log(decodedToken);
		req.auth = { verified: true, sub: decodedToken.sub};
		return next();

	})
}
