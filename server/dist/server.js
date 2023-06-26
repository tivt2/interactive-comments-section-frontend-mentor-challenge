"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const PORT = 3004;
index_1.default.listen(PORT, () => {
    console.log(`now listening on port ${PORT}`);
});
exports.default = index_1.default;
