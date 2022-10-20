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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const PriceCork_1 = __importDefault(require("./models/PriceCork"));
const web3_1 = require("./web3");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// middlware
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use('/api', routes_1.default);
// Datatbase
const URI = process.env.MONGODB_URL;
mongoose_1.default.connect(URI, {
    autoIndex: false,
}, (err) => {
    if (err)
        throw err;
    console.log('Mongodb connection.');
});
const addPrice = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const price = yield (0, web3_1.getPriceCork)();
        const newPrice = new PriceCork_1.default({
            price,
            date: new Date().getTime()
        });
        yield newPrice.save();
    }
    catch (error) {
        console.log(error);
    }
});
setInterval(() => {
    addPrice();
}, 1000 * 60 * 60);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map