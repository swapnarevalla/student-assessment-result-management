import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    python: "",
    react: "",
    database: ""
  });
  const [error, setError] = useState("");

  // Get student records from the backend
  async function loadStudents() {
    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Could not load student records");
      }

      const data = await response.json();
      setStudents(data);
      setError("");
    } catch {
      setError("Cannot connect to the backend.");
    }
  }

  // Load records when the page opens
  useEffect(() => {
    loadStudents();
  }, []);

  // Update form values
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  // Add a student
  async function handleSubmit(event) {
    event.preventDefault();

    const python = Number(form.python);
    const react = Number(form.react);
    const database = Number(form.database);

    if (
      !form.name.trim() ||
      !form.rollNumber.trim() ||
      form.python === "" ||
      form.react === "" ||
      form.database === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (
      ![python, react, database].every(
        (mark) =>
          Number.isFinite(mark) &&
          mark >= 0 &&
          mark <= 100
      )
    ) {
      setError("Marks must be between 0 and 100.");
      return;
    }

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name.trim(),
          rollNumber: form.rollNumber.trim(),
          python,
          react,
          database
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add student");
      }

      setStudents((previous) => [...previous, data]);

      setForm({
        name: "",
        rollNumber: "",
        python: "",
        react: "",
        database: ""
      });

      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete a student
  async function deleteStudent(id) {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete student");
      }

      setStudents((previous) =>
        previous.filter((student) => student.id !== id)
      );

      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  const passed = students.filter(
    (student) => student.status === "Pass"
  ).length;

  const failed = students.length - passed;

  return (
    <div className="app">
      <header>
        <h1>Student Assessment & Result Management</h1>
        <p>Manage student marks and academic results</p>
      </header>

      <section className="summary">
        <div className="card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <div className="card">
          <h3>Passed</h3>
          <p>{passed}</p>
        </div>

        <div className="card">
          <h3>Failed</h3>
          <p>{failed}</p>
        </div>
      </section>

      <section className="form-section">
        <h2>Add Student Assessment</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Student Name"
            aria-label="Student Name"
          />

          <input
            name="rollNumber"
            value={form.rollNumber}
            onChange={handleChange}
            placeholder="Roll Number"
            aria-label="Roll Number"
          />

          <label>
            Python Marks
            <input
              type="number"
              name="python"
              min="0"
              max="100"
              value={form.python}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            React Marks
            <input
              type="number"
              name="react"
              min="0"
              max="100"
              value={form.react}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Database Marks
            <input
              type="number"
              name="database"
              min="0"
              max="100"
              value={form.database}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Add Student</button>
        </form>

        {error && <p className="error">{error}</p>}
      </section>

      <section className="results">
        <h2>Student Results</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Python</th>
                <th>React</th>
                <th>Database</th>
                <th>Total</th>
                <th>Percentage</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.python}</td>
                  <td>{student.react}</td>
                  <td>{student.database}</td>
                  <td>{student.total}/300</td>
                  <td>{student.percentage}%</td>
                  <td>
                    <span
                      className={
                        student.status === "Pass"
                          ? "pass"
                          : "fail"
                      }
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td colSpan="9">No student records available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;