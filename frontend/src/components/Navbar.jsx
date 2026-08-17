function Navbar() {
  return (
    <header className="navbar">

      <div className="brand">

        <div className="brand-icon">
          C
        </div>

        <div>
          <h1>CampusConnect</h1>
          <span>Student Management</span>
        </div>

      </div>

      <div className="api-status">
        <span></span>
        API Connected
      </div>

    </header>
  );
}

export default Navbar;