function StudentCard({
  student,
  onEdit,
  onDelete,
}) {

  return (
    <article className="student-card">

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

        <span>
          ▣
        </span>

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
            onEdit(student)
          }
        >
          ✏️ Edit
        </button>


        <button
          className="delete-btn"
          onClick={() =>
            onDelete(student.id)
          }
        >
          🗑️ Delete
        </button>

      </div>

    </article>
  );
}

export default StudentCard;