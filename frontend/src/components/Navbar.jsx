function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        CampusConnect
      </div>

      <div className="navbar-links">
        <a href="/">Dashboard</a>
        <a href="/students">Students</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </nav>
  );
}

export default Navbar;