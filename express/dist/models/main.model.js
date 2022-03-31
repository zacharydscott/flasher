"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const role_model_1 = require("./role.model");
const user_model_1 = require("./user.model");
const db = {
    mongoose: mongoose_1.default,
    user: user_model_1.User,
    role: role_model_1.Role,
    ROLES: ["user", "admin", "moderator"]
};
//# sourceMappingURL=main.model.js.map