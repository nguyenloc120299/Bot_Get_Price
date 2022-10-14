import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import Price from './models/PriceCork';
import { getPriceCork } from './web3';
import router from './routes';

const app = express();

// middlware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use('/api', router);
// Datatbase
const URI: any = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    autoIndex: false,
  },
  (err) => {
    if (err) throw err;
    console.log('Mongodb connection.');
  }
);
const addPrice = async () => {
  try {
    const price = await getPriceCork();
    const newPrice = new Price({
      price,
      date: new Date().getTime()
    });
    await newPrice.save();
  } catch (error) {
    console.log(error);
  }
};

setInterval(() => {
  addPrice();
}, 1000 * 60 * 60);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
