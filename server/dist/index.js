"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const listing_route_1 = __importDefault(require("./routes/listing.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const mongoUri = process.env.MONGO;
if (!mongoUri) {
    throw new Error("MONGO environment variable is not defined");
}
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log("Connected to MongoDB!");
})
    .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});
const app = (0, express_1.default)();
const projectRoot = path_1.default.resolve();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("combined"));
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});
app.use("/api/user", user_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/listing", listing_route_1.default);
const staticPath = path_1.default.join(projectRoot, "client", "dist");
app.use(express_1.default.static(staticPath));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(staticPath, "index.html"));
});
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
