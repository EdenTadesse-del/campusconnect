 CampusConnect

 A modern full-stack student management system built with React, Node.js, Express, and PostgreSQL.

CampusConnect is a student management platform designed to make it easier to organize, search, add, update, and delete student information through a modern web interface.


 Features
 
 Student Management

- View all students
- View individual student information
- Add new students
- Edit existing students
- Delete students
- Search students by name or department

 Dashboard

- Total student count
- Number of departments
- Active student records
- Modern student cards
- API connection status

 Modern UI

- Dark modern interface
- Responsive design
- Gradient effects
- Glass-style panels
- Smooth hover animations
- Mobile-friendly layout

Security

- Environment variables using `.env`
- `.env` excluded from Git
- `.env.example` provided for configuration
- Database credentials are not stored directly in source code

---

Technologies

 Frontend

- React
- Axios
- JavaScript
- CSS
- Vite

 Backend

- Node.js
- Express.js
- CORS
- REST API
- dotenv

 Database

- PostgreSQL 18
- PostgreSQL Node.js driver (`pg`)

---

 Project Structure

```text
CampusConnect/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── studentController.js
│   │
│   ├── routes/
│   │   └── studentRoutes.js
│   │
│   ├── data/
│   │   └── students.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentDirectory.jsx
│   │   │   └── StudentCard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
└── README.m
