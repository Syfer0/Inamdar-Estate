"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const verifyUser_1 = require("../utils/verifyUser");
const router = express_1.default.Router();
router.get("/test", user_controller_1.test);
router.post("/update/:id", verifyUser_1.verifyToken, user_controller_1.updateUser);
router.delete("/delete/:id", verifyUser_1.verifyToken, user_controller_1.deleteUser);
router.get("/listings/:id", verifyUser_1.verifyToken, user_controller_1.getUserListings);
router.get("/:id", verifyUser_1.verifyToken, user_controller_1.getUser);
exports.default = router;
