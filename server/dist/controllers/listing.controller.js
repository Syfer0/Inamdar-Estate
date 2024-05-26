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
exports.getListings = exports.getListing = exports.updateListing = exports.deleteListing = exports.createListing = void 0;
const listing_model_1 = __importDefault(require("../models/listing.model"));
const error_1 = require("../utils/error");
const createListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield listing_model_1.default.create(req.body);
        return res.status(201).json(listing);
    }
    catch (error) {
        next(error);
    }
});
exports.createListing = createListing;
const deleteListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield listing_model_1.default.findById(req.params.id);
    if (!listing) {
        return next((0, error_1.errorHandler)(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
        return next((0, error_1.errorHandler)(401, 'You can only delete your own listings!'));
    }
    try {
        yield listing_model_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteListing = deleteListing;
const updateListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield listing_model_1.default.findById(req.params.id);
    if (!listing) {
        return next((0, error_1.errorHandler)(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
        return next((0, error_1.errorHandler)(401, 'You can only update your own listings!'));
    }
    try {
        const updatedListing = yield listing_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedListing);
    }
    catch (error) {
        next(error);
    }
});
exports.updateListing = updateListing;
const getListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = yield listing_model_1.default.findById(req.params.id);
        if (!listing) {
            return next((0, error_1.errorHandler)(404, 'Listing not found!'));
        }
        res.status(200).json(listing);
    }
    catch (error) {
        next(error);
    }
});
exports.getListing = getListing;
const getListings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }
        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }
        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }
        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';
        const listings = yield listing_model_1.default.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);
        return res.status(200).json(listings);
    }
    catch (error) {
        next(error);
    }
});
exports.getListings = getListings;
