import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

function StudentDashboard() {

  const navigate =
    useNavigate();

  const [student, setStudent] =
    useState(null);

  useEffect(() => {

    const role =
      localStorage.getItem("role");

    const savedStudent =
      localStorage.getItem(
        "student"
      );

    if (
      role !== "student" ||
      !savedStudent
    ) {

      navigate("/");
      return;

    }

    setStudent(
      JSON.parse(savedStudent)
    );

  }, []);

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  if (!student) {

    return (
      <div
        className="loading-page"
      >
        Loading...
      </div>
    );

  }

  return (

    <div
      className="student-page"
    >

      <header
        className="dashboard-header"
      >

        <div>

          <h1>
            CampusConnect
          </h1>

          <p>
            Student Dashboard
          </p>

        </div>

        <button
          className="logout-button"
          onClick={
            handleLogout
          }
        >
          Logout
        </button>

      </header>

      <main
        className="student-container"
      >

        <section
          className="student-welcome"
        >

          <div
            className="student-avatar"
          >

            {
              student.name
                .charAt(0)
                .toUpperCase()
            }

          </div>

          <div>

            <h2>
              Welcome,
              {" "}
              {student.name}
            </h2>

            <p>
              Student account
              dashboard
            </p>

          </div>

        </section>

        <section
          className="profile-grid"
        >

          <div
            className="profile-card"
          >

            <span>
              Email
            </span>

            <strong>
              {student.email}
            </strong>

          </div>

          <div
            className="profile-card"
          >

            <span>
              Department
            </span>

            <strong>
              {
                student.department
              }
            </strong>

          </div>

          <div
            className="profile-card"
          >

            <span>
              Academic Year
            </span>

            <strong>
              Year
              {" "}
              {student.year}
            </strong>

          </div>

        </section>

        <section
          className="student-info-card"
        >

          <h2>
            Account Status
          </h2>

          <p>
            Your account is active.
          </p>

          <div
            className="account-status"
          >

            <span
              className="status-dot"
            />

            Active Student

          </div>

        </section>

      </main>

    </div>

  );
}

export default StudentDashboard;