const express = require("express");
const router = express.Router();
const {
  fetchAll,
  addItem,
  getItem,
  updateItem,
  deleteItem,
} = require("./../controllers/item");
router.post("/", addItem);
router.get("/:item", fetchAll);
router.delete("/:id", deleteItem);
router.patch("/", updateItem);
router.get("/view/:id", getItem);
module.exports = router;
