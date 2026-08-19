import { useState } from "react";
import { createStudent } from "../services/api";

function StudentForm({ onStudentAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    year: ""
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await createStudent(formData);

      onStudentAdded(result.data);

      setFormData({
        name: "",
        email: "",
        department: "",
        year: ""
      });
    } catch (error) {
      console.error(error);
      alert("Could not create student");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>

      <input
        type="text"
        name="name"
        placeholder="Student name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
      />

      <button type="submit">
        Add Student
      </button>
    </form>
  );
}

export default StudentForm;