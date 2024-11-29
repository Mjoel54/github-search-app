import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for dynamic route tracking
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("/");
  const location = useLocation(); // Get the current location from React Router

  useEffect(() => {
    // Update active section whenever the route changes
    setActiveSection(location.pathname);
  }, [location]); // Runs whenever the `location` changes

  return (
    <nav className="custom-link mt-3 mb-3 px-4">
      <ButtonGroup aria-label="Basic example">
        <Button
          variant="secondary"
          className={`btn-light ${activeSection === "/" ? "active" : ""}`}
        >
          <Link to="/" className="nav-link">Search</Link>
        </Button>
        <Button
          variant="secondary"
          className={`btn-light ${activeSection === "/SavedCandidates" ? "active" : ""}`}
        >
          <Link to="/SavedCandidates" className="nav-link">Potential Candidates</Link>
        </Button>
      </ButtonGroup>
    </nav>
  );
}
