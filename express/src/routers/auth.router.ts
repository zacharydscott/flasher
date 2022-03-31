import express, { Response } from "express";
import { check, validationResult } from "express-validator";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth-request";

export const authRouter = express.Router();
authRouter.get(
	"/token",
	async (req: AuthRequest, res: Response) => {
		try {
			const newToken = jwt.sign({sub: req.auth.sub}, process.env.FLASH_SECRET, {expiresIn: 3600});
			const user = await User.findOne({ _id: req. });
				return res.status(400).json({
					errors: [
						{
							location: "body",
							msg: "Email or password is incorrect",
							param: "email",
							value: email,
						},
					],
				});
			}
			const refreshToken = jwt.sign({sub: user._id},process.env.FLASH_SECRET, {expiresIn: 8035200000})
			const token = jwt.sign({sub: user._id}, process.env.FLASH_SECRET, { expiresIn: 360000});
			res.status(200).json({
				token,
				refreshToken,
				user
			});
		} catch (e) {
			console.log(e.message);
			res.status(500).send("Error saving user");
		}
	}
);
