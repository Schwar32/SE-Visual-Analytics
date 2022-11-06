import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <NavLink to="/" className="navbar-brand">
          Visual Analytics <span className="sr-only">(current)</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Explore
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/BirdIdentifyer" className="nav-link">
                Bird Indetifyer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/About" className="nav-link">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
