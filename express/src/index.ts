import express, {Request, Response} from "express";
import cors from "cors";
import {connect} from "mongoose";
import { User } from "./models/user.model";
import bodyParser from "body-parser";
import { check, validationResult } from "express-validator";
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import winston from 'winston';
import expressWinston from 'express-winston';
import https from 'https';
import { userRouter } from "./routers/user.router";
import { JWTauthMiddleware } from "./middleware/jwt-auth";


const app = express();
const port = 8080;
const corsOptions = {
	origin: "http://localhost:4200",
};
app.use(JWTauthMiddleware);
app.use(expressWinston.logger({
	transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: false,
  msg: "HTTP  ",
  expressFormat: true,
  colorize: false,
  ignoreRoute (req: any, res: any) { return false; }
}));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
	res.send("hello world");
});
app.use("/user",userRouter);
app.listen(port);
