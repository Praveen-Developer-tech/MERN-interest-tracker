const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: String,
  phone: String,
  type: String,
});

module.exports = mongoose.model("Account", accountSchema);
