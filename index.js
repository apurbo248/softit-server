require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Wellcome to server");
});

app.use("/api", require("./router/User"));
app.use("/api", require("./router/Category"));
app.use("/api", require("./router/Product"));

const DB = process.env.DB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`Server is running at port on ${PORT}`);
});
