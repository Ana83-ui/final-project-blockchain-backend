const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transactionSchema = new schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "failed"],
    default: "confirmed",
  },
});

const transactionModel = mongoose.model(  "Transaction",  transactionSchema,  "transaction" );

module.exports = transactionModel;
