const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, require: true },
  schedule: { type: String, required: true },
  minimumOrder: { type: Number, required: true },
  standardDeliveryMaximumDistance: { type: Number, required: true },
  standardDeliceryPrice: { type: Number, required: true },
  extraDeliveryFee: { type: Number, required: true },
  orders: [{ type: mongoose.Types.ObjectId, require: true, ref: "Order" }],
  items: [
    {
      name: { type: String, require: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Restaurant", restaurantSchema); //returneaza un constuctor
