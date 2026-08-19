const jwt = require("jsonwebtoken");
const students = require("../data/students");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  if (
    email === "admin@campusconnect.com" &&
    password === "admin123"
  ) {
    const user = {
      id: 1,
      email: "admin@campusconnect.com",
      role: "admin"
    };

    const token = jwt.sign(
      user,
      process.env.JWT_SECRET || "campusconnect_secret",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      user
    });
  }

  const student = students.find(
    (student) =>
      student.email === email &&
      student.password === password
  );

  if (!student) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  const user = {
    id: student.id,
    name: student.name,
    email: student.email,
    role: "student"
  };

  const token = jwt.sign(
    user,
    process.env.JWT_SECRET || "campusconnect_secret",
    { expiresIn: "1d" }
  );

  return res.status(200).json({
    success: true,
    message: "Student login successful",
    token,
    user
  });
};

module.exports = {
  login
};