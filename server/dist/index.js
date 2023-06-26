"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_data_1 = require("./utils/user-data");
const userPath = "db/data.json";
const initialData = (0, user_data_1.getJSONData)(userPath);
let userData = initialData;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Express on Vercel");
});
app.get("/comments", (req, res) => {
    console.log("new get request");
    res.json(userData);
});
app.post("/comments", (req, res) => {
    const { content, user, parentIdx, replyingTo } = req.body;
    console.log("new post request");
    userData = (0, user_data_1.insertNewComment)({ content, user, parentIdx, replyingTo }, userData, 10);
    console.log("comment inserted");
    res.status(201).json(userData);
});
app.patch("/comments", (req, res) => {
    const { type, parentIdx, content, replyingTo, score } = req.body;
    console.log("new patch request");
    if (type === "DELETE") {
        console.log("data deleted");
        userData = (0, user_data_1.deleteComment)(parentIdx, userData);
    }
    else if (type === "EDIT") {
        console.log("data edited");
        userData = (0, user_data_1.editComment)(parentIdx, content, userData, replyingTo);
    }
    else if (type === "SCORE") {
        console.log("data score edited");
        userData = (0, user_data_1.scoreComment)(parentIdx, score, userData);
    }
    res.json(userData);
});
app.post("/reset", (req, res) => {
    console.log("new reset request");
    if (userData != initialData) {
        (0, user_data_1.insertNewComment)({
            content: "",
            user: { image: { png: "", webp: "" }, username: "" },
            parentIdx: [],
        }, userData, 100, true);
        userData = initialData;
        console.log("data reseted");
    }
    res.status(200).json(userData);
});
exports.default = app;
