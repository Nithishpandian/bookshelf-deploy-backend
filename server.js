const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/book", require("./routes/bookRoutes"));
app.use("/api/post", require("./routes/postRoutes"));

app.listen(port, () => console.log(`Server is running in port ${port}`));
