const User = require("./../models/user");
module.exports.addItem = async (req, res) => {
  try {
    const { user, price, description, karat, gram, qty, image, id } = req.body;
    let data = await User.findById(user);
    data.cart.items.push({ id, price, gram, karat, description, qty, image });
    data.cart.total += price;
    await data.save();
    res.status(200).json(data.cart);
  } catch (error) {
    console.log(error);
  }
};
module.exports.removeItem = async (req, res) => {
  try {
    const { user, id } = req.params;
    //console.log(product);
    let data = await User.findById(user);
    let product;
    data.cart.items.forEach((item) => {
      if (item.id === id) product = item;
    });
    data.cart.items = data.cart.items.filter((item) => item.id != id);
    data.cart.total -= product.qty * product.price;
    await data.save();
    res.status(200).json(data.cart);
  } catch (error) {
    console.log(error);
  }
};
module.exports.updateItem = async (req, res) => {
  try {
    const { user, id, type } = req.params;
    //console.log(user, product);
    let data = await User.findById(user);
    let product;
    data.cart.items.forEach((item) => {
      if (item.id === id) {
        item.qty =
          +type === 1 ? item.qty + 1 : item.qty > 1 ? item.qty - 1 : item.qty;
        product = item;
      }
    });

    data.cart.total += product.price * +type;
    await User.findByIdAndUpdate(user, data);
    res.status(200).json(data.cart);
  } catch (error) {
    console.log(error);
  }
};
module.exports.emptyCart = async (req, res) => {
  try {
    const { user } = req.params;
    let data = await User.findById(user);
    data.cart.items = [];
    data.cart.total = 0;
    await data.save();
    res.status(200).json(data.cart);
  } catch (error) {
    console.log(error);
  }
};
