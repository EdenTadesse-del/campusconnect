import StudentCard from "./StudentCard";

function StudentDirectory({
  students,
  search,
  setSearch,
  loading,
  error,
  onEdit,
  onDelete,
}) {

  return (
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

          <span>
            ⌕
          </span>

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
        students.length === 0 && (
          <div className="message">
            No students found.
          </div>
        )}


      <div className="students-grid">

        {students.map((student) => (

          <StudentCard
            key={student.id}
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
          />

        ))}

      </div>

    </section>
  );
}

export default StudentDirectory;