const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// ============================
// GET Total Outstanding Amount
// ============================
router.get("/total", async (req, res) => {
  try {
    const tx = await Transaction.find();

    let given = 0, taken = 0;

    tx.forEach(t => {
      if (t.type === "GIVEN") given += t.amount;
      else if (t.type === "TAKEN") taken += t.amount;
    });

    res.json({ total: given - taken });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ============================
// GET Recent Transactions (last 5)
// ============================
router.get("/recent", async (req, res) => {
  try {
    const data = await Transaction.find().sort({ _id: -1 }).limit(5);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================
// GET Payments Due (Today + Tomorrow)
// ============================
router.get("/due", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const tomorrowObj = new Date();
    tomorrowObj.setDate(tomorrowObj.getDate() + 1);
    const tomorrow = tomorrowObj.toISOString().split("T")[0];

    const tx = await Transaction.find();

    const todayDue = tx.filter(t => t.dueDate === today);
    const tomorrowDue = tx.filter(t => t.dueDate === tomorrow);

    res.json({
      today: todayDue,
      tomorrow: tomorrowDue,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ============================
// Add New Transaction
// ============================
router.post("/", async (req, res) => {
  try {
    const newTx = new Transaction({
      accountId: req.body.accountId,
      name: req.body.name,
      phone: req.body.phone,
      amount: req.body.amount,
      rate: req.body.rate,
      date: req.body.date,
      dueDate: req.body.dueDate,
      type: req.body.type,
      mode: req.body.mode,
    });

    await newTx.save();
    res.json({ message: "Transaction Added", newTx });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ============================
// GET all transactions for one account
// ============================
router.get("/:accountId", async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const tx = await Transaction.find({ accountId }).sort({ date: -1 });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
