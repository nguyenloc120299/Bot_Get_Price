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
exports.getPriceCorkNow = exports.getPriceCorkDaily = exports.getPriceCorkAll = void 0;
const PriceCork_1 = __importDefault(require("../models/PriceCork"));
const lodash_1 = __importDefault(require("lodash"));
const web3_1 = require("../web3");
const getPriceCorkAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prices = yield PriceCork_1.default.find();
        return res.json(prices);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPriceCorkAll = getPriceCorkAll;
const getPriceCorkNow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const price = yield (0, web3_1.getPriceCork)();
        return res.json(price);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPriceCorkNow = getPriceCorkNow;
const getPriceCorkDaily = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log(today.getTime());
        // let first = today.getDate() - today.getDay();
        // let last = first + 6;
        // let firstday = new Date(today.setDate(first)).toUTCString();
        //let lastday = new Date(today.setDate(last)).toUTCString();
        // let firstDayMonth = new Date(today.setDate(1));
        // let lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        // lastDayMonth.setHours(23, 59, 59, 0);
        // today = new Date().setHours(0, 0, 0, 0);
        // console.log(today);
        const priceDaily = yield PriceCork_1.default.find({
            date: {
                $gte: today.getTime() - 86400000,
                // $lte: new Date().getTime()
            },
        })
            .sort({ date: 1 })
            .select('price date -_id');
        const priceMax = lodash_1.default.maxBy(priceDaily, 'price');
        const priceMin = lodash_1.default.minBy(priceDaily, 'price');
        return res.json({
            price: priceDaily,
            priceMax,
            priceMin,
        });
        // const priceDaily= await Promise.all([
        //   Price.find({
        //     created: {
        //       $gte: today,
        //     },
        //   }).exec(),
        //   Price.find({
        //     created: {
        //       $gte: firstday,
        //       $lte: lastday,
        //     },
        //   }).exec(),
        //   Price.find({
        //     created: {
        //       $gte: firstDayMonth,
        //       $lte: lastDayMonth,
        //     },
        //   }).exec(),
        // ]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPriceCorkDaily = getPriceCorkDaily;
const getpriceWeekly = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=PriceController.js.map