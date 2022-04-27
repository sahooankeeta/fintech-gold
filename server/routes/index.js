const express = require("express");
const router = express.Router();
router.use("/user", require("./user"));
router.use("/cart", require("./cart"));
router.use("/item", require("./item"));
router.use("/order", require("./order"));

router.get("/", (req, res) => {
  res.send("landing page");
});
module.exports = router;
