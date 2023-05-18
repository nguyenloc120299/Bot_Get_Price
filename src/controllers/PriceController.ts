import Price from '../models/PriceCork';
import _ from 'lodash'
import { getPriceCork } from '../web3';
const getPriceCorkAll = async (req, res) => {
  try {
     const userAgent = req.headers['user-agent'];
    const parser = new userAgentParser();
    const result = parser.setUA(userAgent).getResult();
    console.log("🚀 ~ file: test.js:10 ~ app.get ~ result:", result.os.name)

    if (result.device.type === 'mobile' && result.os.name === 'Android') {
        // Thiết bị là Android, chuyển hướng đến Google Play
        res.redirect('https://play.google.com/store/search?q=pools%20wallet&c=apps&hl=en');
    } 
    if (result.device.type === 'mobile' && result.os.name === 'iOS') {
        // Thiết bị là iPhone, chuyển hướng đến App Store
        res.redirect('https://apps.apple.com');
    }
    else {
        // Thiết bị là trang web, chuyển hướng đến trang web
        res.redirect('https://www.poolschain.org/');
    }
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
    
    const priceDaily = await Price.find({
      date: {
        $gte: today.getTime() - 86400000,
        // $lte: new Date().getTime()
      },
    })
      .sort({ date: 1 })
      .select('price date -_id');
    const priceMax = _.maxBy(priceDaily, 'price')
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
const getpriceWeekly = async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
  }
}
export { getPriceCorkAll, getPriceCorkDaily, getPriceCorkNow };
