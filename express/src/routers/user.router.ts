import express, { Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth-request";

export const userRouter = express.Router();
userRouter.post(
	"/login",
	[
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Please enter a valid password").isLength({ min: 8 }),
	],
	async (req: AuthRequest, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('errors')
			console.log(errors)
			return res.status(400).json({
				errors: errors.array()
			});
		}

		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email });
			if (!user || !bcrypt.compareSync(password, user.passHash)) {
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

userRouter.post(
	"/signup",
	[
		check("username", "Please Enter a valid username").not().isEmpty(),
		check("firstName", "Please Enter a valid first name").not().isEmpty(),
		check("lastName", "Please Enter a valid last name").not().isEmpty(),
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Please enter a valid password").isLength({ min: 8 }),
	],
	async (req: AuthRequest, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}

		const { username, email, password, firstName, lastName } = req.body;
		try {
			let user = await User.findOne({ $or: [{ email, username }] });
			if (user) {
				return res.status(400).json({
					errors: [
						{
							location: "body",
							msg: "Email is already registered",
							param: "email",
							value: email,
						},
					],
				});
			}
			const salt = await bcrypt.genSalt(10);
			const passHash = await bcrypt.hash(password, salt);
			user = new User({
				username,
				email,
				passHash,
				firstName,
				lastName
			});
			await user.save();
			const refreshToken = jwt.sign({sub: user._id},process.env.FLASH_SECRET, {expiresIn: 8035200000})
			const token = jwt.sign({sub: user._id}, process.env.FLASH_SECRET, { expiresIn: 360000});
			res.status(200).json({
				token,
				refreshToken,
				user
			});
		} catch (e) {
			console.log(e);
			res.status(500).send("Error saving user");
		}
	}
);

userRouter.get('/details', (req: AuthRequest, resp: Response) => {
});
