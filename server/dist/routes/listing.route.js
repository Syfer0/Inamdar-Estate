"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listing_controller_1 = require("../controllers/listing.controller");
const verifyUser_1 = require("../utils/verifyUser");
const router = express_1.default.Router();
router.post("/create", verifyUser_1.verifyToken, listing_controller_1.createListing);
router.delete("/delete/:id", verifyUser_1.verifyToken, listing_controller_1.deleteListing);
router.post("/update/:id", verifyUser_1.verifyToken, listing_controller_1.updateListing);
router.get("/get/:id", listing_controller_1.getListing);
router.get("/get", listing_controller_1.getListings);
exports.default = router;
