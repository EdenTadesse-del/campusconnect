import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
  });

  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/students"
      );

      setStudents(response.data.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to connect to CampusConnect API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.department ||
      !form.year
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setAdding(true);

      const response = await axios.post(
        "http://127.0.0.1:3000/students"
        
      );

      setStudents([
        ...students,
        response.data.data,
      ]);

      setForm({
        name: "",
        email: "",
        department: "",
        year: "",
      });

      alert("Student added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add student.");
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (student) => {
    setEditingStudent({
      ...student,
    });
  };

  const handleEditChange = (e) => {
    setEditingStudent({
      ...editingStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !editingStudent.name ||
      !editingStudent.email ||
      !editingStudent.department ||
      !editingStudent.year
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setUpdating(true);

      const response = await axios.put(
        `http://localhost:3000/students/${editingStudent.id}`,
        {
          name: editingStudent.name,
          email: editingStudent.email,
          department: editingStudent.department,
          year: editingStudent.year,
        }
      );

      setStudents(
        students.map((student) =>
          student.id === editingStudent.id
            ? response.data.data
            : student
        )
      );

      setEditingStudent(null);

      alert("Student updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update student.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/students/${id}`
      );

      setStudents(
        students.filter(
          (student) => student.id !== id
        )
      );

      alert("Student deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete student.");
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">
            C
          </div>

          <div>
            <h1>CampusConnect</h1>
            <span>Student Management</span>
          </div>
        </div>

        <div className="api-status">
          <span></span>
          API Connected
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <span className="eyebrow">
            CAMPUS MANAGEMENT PLATFORM
          </span>

          <h2>
            Manage your
            <span> campus community.</span>
          </h2>

          <p>
            Connect, organize and manage student
            information from one powerful dashboard.
          </p>
        </div>
      </section>

      <section className="stats">
        <div className="stat-card">
          <div className="stat-icon"></div>

          <div>
            <span>Total Students</span>

            <strong>
              {students.length}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"></div>

          <div>
            <span>Departments</span>

            <strong>
              {
                new Set(
                  students.map(
                    (student) => student.department
                  )
                ).size
              }
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"></div>

          <div>
            <span>Active Records</span>

            <strong>
              {students.length}
            </strong>
          </div>
        </div>
      </section>

      <main className="dashboard">
        <section className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">
                STUDENT REGISTRATION
              </span>

              <h3>
                Add a new student
              </h3>
            </div>

            <div className="plus-icon">
              +
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-grid">
              <div className="input-group">
                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Eden Tadesse"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="student@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  placeholder="Software Engineering"
                  value={form.department}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>
                  Academic Year
                </label>

                <select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                >
                  <option value="">
                    Select year
                  </option>

                  <option value="1">
                    Year 1
                  </option>

                  <option value="2">
                    Year 2
                  </option>

                  <option value="3">
                    Year 3
                  </option>

                  <option value="4">
                    Year 4
                  </option>
                </select>
              </div>
            </div>

            <button
              className="add-btn"
              type="submit"
              disabled={adding}
            >
              {adding
                ? "Adding Student..."
                : "Add Student"}
            </button>
          </form>
        </section>

        <section className="students-section">
          <div className="students-header">
            <div>
              <span className="panel-label">
                CAMPUS DIRECTORY
              </span>

              <h3>
                Students
              </h3>
            </div>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          {loading && (
            <div className="message">
              Loading students...
            </div>
          )}

          {error && (
            <div className="message error">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            filteredStudents.length === 0 && (
              <div className="message">
                No students found.
              </div>
            )}

          <div className="students-grid">
            {filteredStudents.map(
              (student) => (
                <article
                  className="student-card"
                  key={student.id}
                >
                  <div className="student-top">
                    <div className="avatar">
                      {student.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <span className="student-year">
                      YEAR {student.year}
                    </span>
                  </div>

                  <h4>
                    {student.name}
                  </h4>

                  <p className="email">
                    {student.email}
                  </p>

                  <div className="department">
                    {student.department}
                  </div>

                  <div className="card-footer">
                    <span>
                      Student ID
                    </span>

                    <strong>
                      #
                      {String(student.id)
                        .padStart(3, "0")}
                    </strong>
                  </div>

                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        startEdit(student)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(student.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        </section>
      </main>

      {editingStudent && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <div>
                <span className="panel-label">
                  STUDENT EDITOR
                </span>

                <h3>
                  Update student
                </h3>
              </div>

              <button
                className="close-btn"
                onClick={() =>
                  setEditingStudent(null)
                }
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="input-group">
                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    editingStudent.name
                  }
                  onChange={handleEditChange}
                />
              </div>

              <div className="input-group">
                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    editingStudent.email
                  }
                  onChange={handleEditChange}
                />
              </div>

              <div className="input-group">
                <label>
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={
                    editingStudent.department
                  }
                  onChange={handleEditChange}
                />
              </div>

              <div className="input-group">
                <label>
                  Academic Year
                </label>

                <select
                  name="year"
                  value={
                    editingStudent.year
                  }
                  onChange={handleEditChange}
                >
                  <option value="1">
                    Year 1
                  </option>

                  <option value="2">
                    Year 2
                  </option>

                  <option value="3">
                    Year 3
                  </option>

                  <option value="4">
                    Year 4
                  </option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setEditingStudent(null)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                  disabled={updating}
                >
                  {updating
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer>
        <span>
          CampusConnect
        </span>

        <span>
          Built with React + Express
        </span>
      </footer>
    </div>
  );
}

export default App;