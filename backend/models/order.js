const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: { type: String, require: true },
  address: { type: String, required: true },
  distance: { type: Number, required: true },
  orderMentions: { type: String, required: true },
  restaurant: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Restaurant",
  },
  items: [{ type: mongoose.Types.ObjectId, require: true, ref: "Item" }],
  user: { type: mongoose.Types.ObjectId, require: true, ref: "User" },
});

module.exports = mongoose.model("Order", orderSchema); //returneaza un constuctor
