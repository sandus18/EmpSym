require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employees");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/employee_management";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
