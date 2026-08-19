import {
  useEffect,
  useState
} from "react";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from "../api";

import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      department: "",
      year: ""
    });

  const loadStudents = async () => {
    try {

      const response =
        await getStudents();

      setStudents(
        response.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    if (
      localStorage.getItem("role") !==
      "admin"
    ) {
      navigate("/");
      return;
    }

    loadStudents();

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,

      [e.target.name]:
        e.target.value
    });

  };

  const resetForm = () => {

    setForm({
      name: "",
      email: "",
      password: "",
      department: "",
      year: ""
    });

    setEditingId(null);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await updateStudent(
          editingId,
          form
        );

      } else {

        await createStudent(
          form
        );

      }

      resetForm();

      loadStudents();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  const handleEdit = (student) => {

    setEditingId(
      student.id
    );

    setForm({
      name: student.name,
      email: student.email,
      password: student.password,
      department:
        student.department,
      year: student.year
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this student?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteStudent(id);

      loadStudents();

    } catch (error) {

      alert(
        "Failed to delete student"
      );

    }

  };

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <div className="admin-page">

      <header
        className="dashboard-header"
      >

        <div>

          <h1>
            CampusConnect
          </h1>

          <p>
            Admin Dashboard
          </p>

        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>

      <main
        className="dashboard-container"
      >

        <section
          className="welcome-card"
        >

          <div>

            <h2>
              Welcome, Admin
            </h2>

            <p>
              Manage all students
              from one place.
            </p>

          </div>

          <div
            className="student-count"
          >

            <strong>
              {students.length}
            </strong>

            <span>
              Students
            </span>

          </div>

        </section>

        <section
          className="form-card"
        >

          <h2>

            {editingId
              ? "Edit Student"
              : "Add New Student"}

          </h2>

          <form
            className="student-form"
            onSubmit={handleSubmit}
          >

            <div
              className="input-group"
            >

              <label>
                Full Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

            </div>

            <div
              className="input-group"
            >

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />

            </div>

            <div
              className="input-group"
            >

              <label>
                Password
              </label>

              <input
                type="text"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />

            </div>

            <div
              className="input-group"
            >

              <label>
                Department
              </label>

              <input
                name="department"
                value={
                  form.department
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>

            <div
              className="input-group"
            >

              <label>
                Year
              </label>

              <input
                type="number"
                name="year"
                value={form.year}
                onChange={
                  handleChange
                }
                required
              />

            </div>

            <div
              className="form-buttons"
            >

              <button
                className="primary-button"
                type="submit"
              >

                {editingId
                  ? "Update Student"
                  : "Add Student"}

              </button>

              {editingId && (

                <button
                  type="button"
                  className="cancel-button"
                  onClick={
                    resetForm
                  }
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </section>

        <section
          className="students-card"
        >

          <div
            className="section-title"
          >

            <div>

              <h2>
                Student List
              </h2>

              <p>
                Manage registered
                students
              </p>

            </div>

          </div>

          {loading ? (

            <div
              className="loading"
            >
              Loading students...
            </div>

          ) : (

            <div
              className="table-wrapper"
            >

              <table>

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {students.map(
                    (student) => (

                      <tr
                        key={
                          student.id
                        }
                      >

                        <td>
                          {student.id}
                        </td>

                        <td>
                          {student.name}
                        </td>

                        <td>
                          {student.email}
                        </td>

                        <td>
                          {
                            student.department
                          }
                        </td>

                        <td>
                          {student.year}
                        </td>

                        <td>

                          <div
                            className="action-buttons"
                          >

                            <button
                              className="edit-button"
                              onClick={() =>
                                handleEdit(
                                  student
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="delete-button"
                              onClick={() =>
                                handleDelete(
                                  student.id
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>

  );
}

export default AdminDashboard;