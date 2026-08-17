import { useState } from "react";

function AddStudent({ onAddStudent }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
  });

  const [adding, setAdding] = useState(false);

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

      const success =
        await onAddStudent(form);

      if (success) {
        setForm({
          name: "",
          email: "",
          department: "",
          year: "",
        });

        alert(
          "Student added successfully 🎉"
        );
      } else {
        alert("Failed to add student.");
      }

    } finally {
      setAdding(false);
    }
  };

  return (
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
            : "+ Add Student"}

        </button>

      </form>

    </section>
  );
}

export default AddStudent;