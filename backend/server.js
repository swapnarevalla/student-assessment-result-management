import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let students = [];
let nextId = 1;

// Calculate student results
function calculateResult(python, react, database) {
  const total = python + java + devops;
  const percentage = total / 3;

  const status =
    python >= 35 &&
    java >= 35 &&
    devops >= 35
      ? "Pass"
      : "Fail";

  return {
    total,
    percentage: Number(percentage.toFixed(2)),
    status
  };
}

// API 1: Get all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// API 2: Add a student
app.post("/api/students", (req, res) => {
  const { name, rollNumber, python, react, database } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof rollNumber !== "string" ||
    !rollNumber.trim()
  ) {
    return res.status(400).json({
      message: "Student name and roll number are required"
    });
  }

  const marks = [python, react, database];

  if (
    !marks.every(
      (mark) =>
        typeof mark === "number" &&
        Number.isFinite(mark) &&
        mark >= 0 &&
        mark <= 100
    )
  ) {
    return res.status(400).json({
      message: "Each subject mark must be between 0 and 100"
    });
  }

  if (
    students.some(
      (student) => student.rollNumber === rollNumber.trim()
    )
  ) {
    return res.status(409).json({
      message: "Roll number already exists"
    });
  }

  const result = calculateResult(python, react, database);

  const student = {
    id: nextId++,
    name: name.trim(),
    rollNumber: rollNumber.trim(),
    python,
    react,
    database,
    ...result
  };

  students.push(student);

  res.status(201).json(student);
});

// API 3: Delete a student
app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const exists = students.some(
    (student) => student.id === id
  );

  if (!exists) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  students = students.filter(
    (student) => student.id !== id
  );

  res.json({
    message: "Student deleted successfully"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});