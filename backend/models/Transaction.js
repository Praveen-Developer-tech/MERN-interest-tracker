const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  name: String,
  phone: String,
  amount: Number,
  rate: Number,
  date: String,          // transaction date (YYYY-MM-DD)
  dueDate: String,       // NEW FIELD (YYYY-MM-DD)
  type: String,          // GIVEN or TAKEN
  mode: String           // Cash / Bank / UPI
});

module.exports = mongoose.model("Transaction", TransactionSchema);

TransactionSchema.virtual("interestCalc").get(function () {
  if (!this.date || !this.rate || !this.amount) return 0;

  const start = new Date(this.date);
  const today = new Date();

  const diffDays = (today - start) / (1000 * 60 * 60 * 24);
  const months = diffDays / 30;

  const interest = (this.amount * this.rate * months) / 100;
  return Number(interest.toFixed(2));
});
TransactionSchema.set("toJSON", { virtuals: true });
