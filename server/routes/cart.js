const express = require("express");
const router = express.Router();
const {
  addItem,
  removeItem,
  updateItem,
  emptyCart,
} = require("./../controllers/cart");
router.post("/", addItem);
router.get("/empty/:user", emptyCart);
router.delete("/:user/:id", removeItem);
router.patch("/:user/:id/:type", updateItem);
module.exports = router;
