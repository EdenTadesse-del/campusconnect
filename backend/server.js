const express = require("express");
const cors = require("cors");

const studentRoutes = require(
  "./routes/studentRoutes"
);

const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CampusConnect API is running"
  });
});

app.use(
  "/students",
  studentRoutes
);

app.listen(PORT, () => {
  console.log(
    `CampusConnect API running on http://localhost:${PORT}`
  );
});