"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/login", [
    (0, express_validator_1.check)("email", "Please enter a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Please enter a valid password").isLength({ min: 8 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log('errors');
        console.log(errors);
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.User.findOne({ email });
        if (!user || !bcrypt_1.default.compareSync(password, user.passHash)) {
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
        const refreshToken = jsonwebtoken_1.default.sign({ sub: user._id }, process.env.FLASH_SECRET, { expiresIn: 8035200000 });
        const token = jsonwebtoken_1.default.sign({ sub: user._id }, process.env.FLASH_SECRET, { expiresIn: 360000 });
        res.status(200).json({
            token,
            refreshToken,
            user
        });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Error saving user");
    }
}));
exports.userRouter.post("/signup", [
    (0, express_validator_1.check)("username", "Please Enter a valid username").not().isEmpty(),
    (0, express_validator_1.check)("firstName", "Please Enter a valid first name").not().isEmpty(),
    (0, express_validator_1.check)("lastName", "Please Enter a valid last name").not().isEmpty(),
    (0, express_validator_1.check)("email", "Please enter a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Please enter a valid password").isLength({ min: 8 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { username, email, password, firstName, lastName } = req.body;
    try {
        let user = yield user_model_1.User.findOne({ $or: [{ email, username }] });
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
        const salt = yield bcrypt_1.default.genSalt(10);
        const passHash = yield bcrypt_1.default.hash(password, salt);
        user = new user_model_1.User({
            username,
            email,
            passHash,
            firstName,
            lastName
        });
        yield user.save();
        const refreshToken = jsonwebtoken_1.default.sign({ sub: user._id }, process.env.FLASH_SECRET, { expiresIn: 8035200000 });
        const token = jsonwebtoken_1.default.sign({ sub: user._id }, process.env.FLASH_SECRET, { expiresIn: 360000 });
        res.status(200).json({
            token,
            refreshToken,
            user
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Error saving user");
    }
}));
//# sourceMappingURL=user.router.js.map