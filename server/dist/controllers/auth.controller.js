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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.google = exports.signin = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_1 = require("../utils/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    const newUser = new user_model_1.default({ username, email, password: hashedPassword });
    try {
        yield newUser.save();
        res.status(201).json("User created successfully!");
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const validUser = yield user_model_1.default.findOne({ email });
        if (!validUser)
            return next((0, error_1.errorHandler)(404, "User not found!"));
        const validPassword = bcryptjs_1.default.compareSync(password, validUser.password);
        if (!validPassword)
            return next((0, error_1.errorHandler)(401, "Wrong credentials!"));
        const token = jsonwebtoken_1.default.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass } = validUser, rest = __rest(validUser, ["password"]);
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(rest);
    }
    catch (error) {
        next(error);
    }
});
exports.signin = signin;
const google = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass } = user, rest = __rest(user, ["password"]);
            res
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs_1.default.hashSync(generatedPassword, 10);
            const newUser = new user_model_1.default({
                username: req.body.name.split(" ").join("").toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            yield newUser.save();
            const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass } = newUser, rest = __rest(newUser, ["password"]);
            res
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.google = google;
const signOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("access_token");
        res.status(200).json("User has been logged out!");
    }
    catch (error) {
        next(error);
    }
});
exports.signOut = signOut;
