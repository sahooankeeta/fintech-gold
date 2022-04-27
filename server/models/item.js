const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    gram: { type: String, required: true },
    karat: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
