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
exports.getUser = exports.getUserListings = exports.deleteUser = exports.updateUser = exports.test = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const error_1 = require("../utils/error");
const listing_model_1 = __importDefault(require("../models/listing.model"));
const test = (req, res) => {
    res.json({
        message: "Api route is working!",
    });
};
exports.test = test;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.id !== req.params.id)
        return next((0, error_1.errorHandler)(401, "You can only update your own account!"));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs_1.default.hashSync(req.body.password, 10);
        }
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            },
        }, { new: true });
        const { password } = updatedUser, rest = __rest(updatedUser, ["password"]);
        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.id !== req.params.id)
        return next((0, error_1.errorHandler)(401, "You can only delete your own account!"));
    try {
        yield user_model_1.default.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json("User has been deleted!");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const getUserListings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.id === req.params.id) {
        try {
            const listings = yield listing_model_1.default.find({ userRef: req.params.id });
            res.status(200).json(listings);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        return next((0, error_1.errorHandler)(401, "You can only view your own listings!"));
    }
});
exports.getUserListings = getUserListings;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        if (!user)
            return next((0, error_1.errorHandler)(404, "User not found!"));
        const { password: pass } = user, rest = __rest(user, ["password"]);
        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
