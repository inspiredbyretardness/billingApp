const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const server = app.listen(3200, console.log("Listening in 3200"));
connectDB();