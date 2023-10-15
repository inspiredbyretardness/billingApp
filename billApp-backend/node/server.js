const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const miscRoutes = require("./routes/MiscRoutes")
const productRoutes = require("./routes/ProductRoutes")
const billingRoutes = require("./routes/BillingRoutes")

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/misc",miscRoutes)
app.use("/product",productRoutes)
app.use("/billing",billingRoutes)

const server = app.listen(3200, console.log("Listening in 3200"));
connectDB();