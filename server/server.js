const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// 🔥 MOST IMPORTANT
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});