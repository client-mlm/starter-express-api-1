const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const registerRoutes = require("./routes/register");
const dataRoutes = require("./routes/data");
const getRoutes = require("./routes/get");
const loginRoutes = require("./routes/login");
const verifyRoutes = require("./routes/verify");
const investment = require("./routes/invest");
const withdrawInvestment = require("./routes/withdrawal");
const updateProfile = require("./routes/updateProfile");
const getAllData = require("./routes/getAllData");
const dotenv = require("dotenv");
const deleteImage = require("./routes/deleteImage");
const getImages = require("./routes/getImages");
const uploadqr = require("./routes/uploadqr");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;
mongoose.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: ["https://autumn-river-8328.on.fleek.co", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/register", registerRoutes);
app.use("/data", dataRoutes);
app.use("/", getRoutes);
app.use("/login", loginRoutes);
app.use("/verify-token", verifyRoutes);
app.use("/invest", investment);
app.use("/withdrawal", withdrawInvestment);
app.use("/update-profile", updateProfile);
app.use("/getData", getAllData);
app.use("/getImages", getImages);
app.use("/deleteImage", deleteImage);
app.use("/upload-qr", uploadqr);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
