const express = require("express");
const router = express.Router();
const Account = require("../models/Account");

// GET all accounts
router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new account
router.post("/", async (req, res) => {
  try {
    const { name, phone, type } = req.body;

    const newAccount = new Account({ name, phone, type });
    await newAccount.save();

    res.json({ message: "Account added", account: newAccount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
