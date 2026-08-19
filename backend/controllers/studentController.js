const students = require("../data/students");

const getStudents = (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
};

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

const createStudent = (req, res) => {
  const {
    name,
    email,
    password,
    department,
    year
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !department ||
    !year
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const emailExists = students.find(
    (student) => student.email === email
  );

  if (emailExists) {
    return res.status(400).json({
      success: false,
      message: "Email already exists"
    });
  }

  const newStudent = {
    id:
      students.length > 0
        ? Math.max(
            ...students.map(
              (student) => student.id
            )
          ) + 1
        : 1,

    name,
    email,
    password,
    department,
    year: Number(year)
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student added successfully",
    data: newStudent
  });
};

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

  const {
    name,
    email,
    password,
    department,
    year
  } = req.body;

  student.name = name || student.name;
  student.email = email || student.email;
  student.password =
    password || student.password;
  student.department =
    department || student.department;

  if (year) {
    student.year = Number(year);
  }

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student
  });
};

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

  students.splice(studentIndex, 1);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully"
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};