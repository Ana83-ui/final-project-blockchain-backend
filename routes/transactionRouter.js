const express = require("express");
const {  postNewTransaction,  deleteTransaction,  getUserTransactionsById,  updateTransactionStatus,  getTransactionDetails, getBalance } = require("../controllers/transactionController");
const {tokenVerify} = require("../middleware/auth-token")
const router = express.Router();

router.post("/transactions", postNewTransaction); 
router.delete("/transactions/:_id", deleteTransaction); 
router.get("/transaction/", tokenVerify, getUserTransactionsById); 
router.patch("/transactions/:_id", updateTransactionStatus);
router.get("/transactions/:_id", getTransactionDetails); 
router.get("/balance/:_id", getBalance); 

module.exports = router;
