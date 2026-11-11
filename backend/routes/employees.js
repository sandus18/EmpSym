const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// Turn Mongoose / Mongo errors into clean HTTP responses
function handleError(res, err) {
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message).join(", ");
    return res.status(400).json({ message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: "An employee with this email already exists" });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid employee id" });
  }
  console.error(err);
  return res.status(500).json({ message: "Something went wrong on the server" });
}

// CREATE
router.post("/", async (req, res) => {
  try {
    const { name, email, salary, joinDate, department } = req.body;
    const employee = await Employee.create({ name, email, salary, joinDate, department });
    res.status(201).json(employee);
  } catch (err) {
    handleError(res, err);
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    handleError(res, err);
  }
});

// READ one
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    handleError(res, err);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { name, email, salary, joinDate, department } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, salary, joinDate, department },
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    handleError(res, err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted", id: employee._id });
  } catch (err) {
    handleError(res, err);
  }
});

module.exports = router;
