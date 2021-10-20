const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/cus_list", async (req, res) => {
  const customer = await User.find();
  res.json(customer);
});

router.delete("/cus_list/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({
    message: "ok",
  });
});

module.exports = router;
