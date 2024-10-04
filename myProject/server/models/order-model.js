const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  customerInfo: {
    name: { type: String },
    email: { type: String },
  },
  shippingInfo: {
    type: String,
    required: true,
  },
  paymentInfo: {
    type: String,
    required: true,
  },
  cart: [
    {
      name: { type: String, required: true },
      color: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number },
  orderTime: { type: String },
  memberName: { type: String },
});

module.exports = mongoose.model("Order", orderSchema);
