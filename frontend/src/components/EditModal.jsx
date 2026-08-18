function EditModal({
  student,
  setStudent,
  onUpdate,
  updating,
}) {
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !student.name ||
      !student.email ||
      !student.department ||
      !student.year
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const success = await onUpdate(student);

    if (!success) {
      alert("Failed to update student.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <div className="modal-header">
          <div>
            <span className="panel-label">
              STUDENT EDITOR
            </span>

            <h3>Update Student</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Department</label>

            <input
              type="text"
              name="department"
              value={student.department}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Academic Year</label>

            <select
              name="year"
              value={student.year}
              onChange={handleChange}
            >
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setStudent(null)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={updating}
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;