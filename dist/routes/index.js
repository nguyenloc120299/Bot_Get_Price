"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PriceController_1 = require("../controllers/PriceController");
const router = express_1.default.Router();
router.get('/token', PriceController_1.getPriceCorkAll);
router.get('/price-daily', PriceController_1.getPriceCorkDaily);
router.get('/price-now', PriceController_1.getPriceCorkNow);
exports.default = router;
//# sourceMappingURL=index.js.map