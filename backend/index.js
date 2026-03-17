const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/interest_app")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Server
app.listen(4000, () => console.log("Server started on port 4000"));
