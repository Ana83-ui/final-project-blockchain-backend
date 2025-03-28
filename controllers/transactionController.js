const mongoose = require("mongoose");
const TransactionModel = require("../models/transactionModel");
const UserModel = require("../models/userModel");
const { doneTransactionEmail } = require("../services/emailService");
const { receivedTransactionEmail } = require("../services/emailService");

const postNewTransaction = async (req, res) => {
  try {
    const { sender, receiver, amount } = req.body;
    const senderUser = await UserModel.findOne({ email: sender });
    const receiverUser = await UserModel.findOne({ email: receiver });

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ status: "Failed", message: "User not found" });
    }
    if (senderUser.balance < amount) {
      return res.status(400).json({ status: "Failed", message: "Insufficient balance" });
    }

    senderUser.balance -= amount;
    receiverUser.balance += amount;

   await senderUser.save();
    await receiverUser.save();

    const newTransaction = new TransactionModel({
      sender: senderUser._id,
      receiver: receiverUser._id,
      amount,
      status: "confirmed",
    });
    await newTransaction.save();

    await doneTransactionEmail(senderUser.email);
    await receivedTransactionEmail(receiverUser.email);

    res.status(201).json({ status: "Success", message: "Transaction created successfully", transaction: newTransaction, senderBalance:senderUser.balance, receiverBalance: receiverUser.balance, amount, sender: senderUser._id, receiver: receiverUser._id });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "There was an error creating the transaction", error: error.message });
  }
};


const deleteTransaction = async (req, res) => {
  const { _id } = req.params;
  try {
    const transaction = await TransactionModel.findByIdAndDelete(_id);
    if (!transaction) {
      return res.status(404).json({ status: "Failed", message: "Transaction not found" });
    }
    const senderUser = await UserModel.findById(transaction.sender);
    const receiverUser = await UserModel.findById(transaction.receiver);

    if (senderUser) {
      senderUser.balance += transaction.amount;
      await senderUser.save();
    }

    if (receiverUser) {
      receiverUser.balance -= transaction.amount;
      await receiverUser.save();
    }
    res.status(200).json({ status: "Success", message: "Transaction delete successfully" });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "There was an error deleting the transaction", error: error.message });
  }
};

// all transactions by user
const getUserTransactionsById = async (req, res) => {
  try {
    const userId = req.user?._id; 
    if (!userId) {
      return res.status(400).json({ status: "Failed", message: "User ID is missing from the token" });
    }

    const transactions = await TransactionModel.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).populate("sender", "email").populate("receiver", "email")

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ status: "Failed", message: "No transactions found for this user" });
    }

    res.status(200).json({ status: "Success", transactions });
  } catch (error) {
    console.error(error);  
    res.status(500).json({ status: "Failed", message: "There was an error fetching the user's transactions", error: error.message });
  }
};


const updateTransactionStatus = async (req, res) => {
  try {
    const { _id } = req.params;
    const { status } = req.body;

    if (!["confirmed", "failed"].includes(status)) {
      return res.status(400).json({ status: "Failed", message: "Invalid status" });}
    const transaction = await TransactionModel.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ status: "Failed", message: "Transaction not found" });
    }

    res.status(200).json({ status: "Success", message: "Transaction status updated", transaction });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "There was an error updating the transaction status", error: error.message });
  }
};

// one transaction 
const getTransactionDetails = async (req, res) => {
  try {
    const { _id } = req.params;
    const transaction = await TransactionModel.findById(_id).populate("sender", "email").populate("receiver", "email");

    if (!transaction) {
      return res.status(404).json({ status: "Failed", message: "Transaction not found" });
    }

    res.status(200).json({ status: "Success", transaction });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "There was an error fetching the transaction", error: error.message });
  }
};

const getBalance = async (req, res) => {
  try {
    const userId = req.params._id;  
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "Failed", message: "User not found" });
    }
    res.status(200).json({ status: "Success", balance: user.balance });
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "There was an error retrieving the balance", error: error.message });
  }
};

module.exports = {  postNewTransaction,  deleteTransaction,  getUserTransactionsById,  updateTransactionStatus,  getTransactionDetails, getBalance };
