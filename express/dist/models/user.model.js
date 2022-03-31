"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.conn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseURI = `mongodb+srv://${process.env.TANGO_USR}:${process.env.TANGO_PASS}@cluster0.tv3i9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
exports.conn = mongoose_1.default.createConnection(mongooseURI);
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    passHash: { type: String, required: true }
});
exports.User = exports.conn.model('User', userSchema);
//# sourceMappingURL=user.model.js.map