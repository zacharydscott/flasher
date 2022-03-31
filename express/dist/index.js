"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const user_router_1 = require("./routers/user.router");
const jwt_auth_1 = require("./middleware/jwt-auth");
const app = (0, express_1.default)();
const port = 8080;
const corsOptions = {
    origin: "http://localhost:4200",
};
app.use(jwt_auth_1.JWTauthMiddleware);
app.use(express_winston_1.default.logger({
    transports: [
        new winston_1.default.transports.Console()
    ],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute(req, res) { return false; }
}));
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("hello world");
});
app.use("/user", user_router_1.userRouter);
app.listen(port);
//# sourceMappingURL=index.js.map