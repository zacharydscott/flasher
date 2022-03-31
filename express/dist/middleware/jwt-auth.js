"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTauthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function JWTauthMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        req.auth = { verified: false, sub: null };
        return next();
    }
    jsonwebtoken_1.default.verify(token, process.env.FLASH_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: { location: 'headers' }, message: 'Invalid authentication token' });
        }
        console.log(decodedToken);
        req.auth = { verified: true, sub: decodedToken.sub };
        return next();
    });
}
exports.JWTauthMiddleware = JWTauthMiddleware;
//# sourceMappingURL=jwt-auth.js.map