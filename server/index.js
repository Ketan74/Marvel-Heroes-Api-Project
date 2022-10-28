const express = require("express");
const app = express();
require("dotenv").config();
var cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

app.use("/auth/", require("./routes/auth")); // Login
app.use("/review/", require("./routes/review"));

module.exports = app;
