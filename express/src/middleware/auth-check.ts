import { AuthRequest } from "../types/auth-request";
import { Response } from "express";

export function checkIfAuthenticated(req: AuthRequest, res: Response, next: () => void) {
	if (req.auth.verified) {
		return next();
	}
	return res.status(401).json({
		error: "Unauthorized",
		message: "Attach token as authorization header"
	});
}
