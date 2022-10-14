import Price from '../models/PriceCork';
import _ from 'lodash'
import { getPriceCork } from '../web3';
const getPriceCorkAll = async (req, res) => {
  try {
    const prices = await Price.find();
    return res.json(prices);
  } catch (error) {
    console.log(error);
  }
};
const getPriceCorkNow = async (req, res) => {
  try {
       const price = await getPriceCork();
       return res.json(price);
  } catch (error) {
    console.log(error);
    
  }
}
const getPriceCorkDaily = async (req, res) => {
  try {
    let today: any = new Date();
    today.setHours(0, 0, 0, 0);
    let first = today.getDate() - today.getDay();
    let last = first + 6;
    let firstday = new Date(today.setDate(first)).toUTCString();
    let lastday = new Date(today.setDate(last)).toUTCString();
    let firstDayMonth = new Date(today.setDate(1));
    let lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    lastDayMonth.setHours(23, 59, 59, 0);
    today = new Date().setHours(0, 0, 0, 0);
    const priceDaily = await Price.find({
      createdAt: {
        $gte: firstday,
        $lte: lastday,
      },
    }).sort({ date: -1 });
    const priceMax= _.maxBy(priceDaily,'price')
     const priceMin = _.minBy(priceDaily, 'price');
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
  } catch (error) {
    console.log(error);
  }
};

export { getPriceCorkAll, getPriceCorkDaily, getPriceCorkNow };
