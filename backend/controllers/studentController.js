const students = require("../data/students");

// ========================================
// GET ALL STUDENTS
// ========================================

const getStudents = (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
};

// ========================================
// GET STUDENT BY ID
// ========================================

const getStudentById = (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(
    (student) => student.id === id
  );

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
};

// ========================================
// CREATE STUDENT
// ========================================

const createStudent = (req, res) => {
  const { name, email, department, year } = req.body;

  if (!name || !email || !department || !year) {
    return res.status(400).json({
      success: false,
      message: "Name, email, department and year are required"
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    email,
    department,
    year: Number(year)
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student added successfully 🎉",
    data: newStudent
  });
};

// ========================================
// UPDATE STUDENT
// ========================================

const updateStudent = (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(
    (student) => student.id === id
  );

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const { name, email, department, year } = req.body;

  if (name) student.name = name;
  if (email) student.email = email;
  if (department) student.department = department;
  if (year) student.year = Number(year);

  res.status(200).json({
    success: true,
    message: "Student updated successfully ",
    data: student
  });
};

// ========================================
// DELETE STUDENT
// ========================================

const deleteStudent = (req, res) => {
  const id = Number(req.params.id);

  const studentIndex = students.findIndex(
    (student) => student.id === id
  );

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully ",
    data: deletedStudent[0]
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};