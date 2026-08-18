function Stats({ students }) {

  const departments = new Set(
    students.map(
      (student) => student.department
    )
  ).size;

  return (
    <section className="stats">

      <div className="stat-card">

    
        <div>
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>

      </div>


      <div className="stat-card">

        <div className="stat-icon">
          
        </div>

        <div>
          <span>Departments</span>
          <strong>{departments}</strong>
        </div>

      </div>


      <div className="stat-card">

        <div className="stat-icon">
          
        </div>

        <div>
          <span>Active Records</span>
          <strong>{students.length}</strong>
        </div>

      </div>

    </section>
  );
}

export default Stats;