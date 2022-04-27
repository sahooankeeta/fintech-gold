const Order = require("./../models/order");
module.exports.addOrder = async (req, res) => {
  try {
    const item = await Order.create(req.body);
    res.status(200).json({
      item,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ type: "error", message: err.message });
  }
};
module.exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    await Order.findByIdAndDelete(id);
    res.status(200).json({
      message: "order deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ type: "error", message: err.message });
  }
};
module.exports.viewOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Order.findById(id);
    res.status(200).json({
      item,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ type: "error", message: err.message });
  }
};
module.exports.fetchOrders = async (req, res) => {
  try {
    const { id } = req.params;
    let items;
    if (id !== "-1") items = await Order.find({ userId: id });
    else items = await Order.find();
    // console.log(items);
    res.status(200).json({
      items,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({ type: "error", message: err.message });
  }
};
