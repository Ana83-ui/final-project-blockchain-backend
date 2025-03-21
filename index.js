const express = require("express");
const path = require("path"); 
const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter.js");
const transactionRouter = require("./routes/transactionRouter.js");

require("dotenv").config();
const cors = require("cors");
const dbURL = require("./database/db.js");

const app = express();
app.use(cors());
app.use(express.json()), dbURL();
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use("/api", userRouter);
app.use("/api", loginRouter);
app.use("/api", transactionRouter);

app.listen(3000, () => {
  console.log("Listening to server on port http://localhost:3000");
});
