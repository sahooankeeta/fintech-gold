const Item = require("./../models/item");
const User = require("./../models/user");
const axios = require("axios");

module.exports.fetchAll = async (req, res) => {
  try {
    const { item } = req.params;
    const gram = req.query.gram;
    // console.log(gram);
    let items;
    if (gram) items = await Item.find({ $and: [{ category: item }, { gram }] });
    else items = await Item.find({ category: item });
    res.status(200).json({
      items,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ type: "error", message: err.message });
  }
};
module.exports.addItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(200).json({
      item,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ type: "error", message: err.message });
  }
};
module.exports.getItem = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const item = await Item.findById(id);
    // console.log("back", item);
    res.status(200).json({
      item,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ type: "error", message: err.message });
  }
};
module.exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    res.status(200).json({
      item,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ type: "error", message: err.message });
  }
};
module.exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    await Item.findByIdAndDelete(id);
    // console.log("back", item);
    res.status(200).json({
      message: "item deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ type: "error", message: err.message });
  }
};
