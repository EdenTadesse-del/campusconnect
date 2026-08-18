const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Student Routes
app.use("/students", studentRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CampusConnect API is running "
  });
});

app.listen(PORT, () => {
  console.log(`
 CAMPUSCONNECT API IS RUNNING!

Server: http://localhost:${PORT}
Status: RUNNING 
  `);
});