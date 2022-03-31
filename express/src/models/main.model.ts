import mongoose from "mongoose";
import { Role } from "./role.model";
import { User } from "./user.model";

const db = {
	mongoose,
	user: User,
	role: Role,
	ROLES: ["user","admin","moderator"]
};
