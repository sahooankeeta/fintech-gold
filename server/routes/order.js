const express = require("express");
const router = express.Router();
const {
  addOrder,
  viewOrder,
  fetchOrders,
  deleteOrder,
} = require("./../controllers/order");
router.get("/all/:id", fetchOrders);
router.post("/", addOrder);
router.get("/:id", viewOrder);
router.delete("/:id", deleteOrder);
module.exports = router;
