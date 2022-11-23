import "../styles/Landing.css";
import VisGlobe from "../components/VisGlobe";
import { SizeMe } from "react-sizeme";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div className="landing-page">
      <h1 className="py-5 landing-title">Visual Analytics of Bird Calls</h1>
      <div className="landing-globe-container">
        <SizeMe refreshRate={30}>
          {({ size: { width } }) => (
            <VisGlobe
              location={"Canada"}
              latitude={0}
              longitude={0}
              width={width}
              height={width / (4 / 4)}
            />
          )}
        </SizeMe>
      </div>
      <NavLink to="/Explore" className="landing-link">
        Explore
      </NavLink>
    </div>
  );
}

export default Landing;
