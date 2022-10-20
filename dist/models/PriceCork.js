"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const corkSchema = new mongoose_1.default.Schema({
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});
const Price = mongoose_1.default.model("cork_token", corkSchema);
exports.default = Price;
//# sourceMappingURL=PriceCork.js.map