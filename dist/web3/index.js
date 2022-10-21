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
exports.getPriceCork = void 0;
const web3_1 = __importDefault(require("web3"));
const price_getter_abi_json_1 = __importDefault(require("../abi/price_getter_abi.json"));
const RPC_URL = process.env.RPC_URL;
const BSCProvider = new web3_1.default.providers.HttpProvider(RPC_URL);
const web3 = new web3_1.default(BSCProvider);
const getContract = (abi, address) => __awaiter(void 0, void 0, void 0, function* () {
    return new web3.eth.Contract(abi, address);
});
const getPriceCork = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contract = yield getContract(price_getter_abi_json_1.default, '0xC8485D39FD1f5419c0029960112D04cfE0Ca8722');
        const result = yield contract.methods
            .getPrice('0xe7EAdA32CAF827d3bA8Cb1074830d803C9bD48c3', 18)
            .call();
        const priceCork = web3_1.default.utils.fromWei(result, 'ether');
        return priceCork;
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getPriceCork = getPriceCork;
//# sourceMappingURL=index.js.map