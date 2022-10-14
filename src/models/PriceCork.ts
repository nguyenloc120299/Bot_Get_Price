import mongoose from "mongoose";

const corkSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    date:{
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Price = mongoose.model("cork_token", corkSchema);

export default Price;
