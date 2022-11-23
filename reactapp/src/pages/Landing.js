import "../styles/Landing.css";
import VisGlobe from "../components/VisGlobe";
import { SizeMe } from "react-sizeme";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div className="landing-page">
      <h1 className="py-5 landing-title">Welcome to the World of Visual Analytics</h1>
      <div className="py-5 landing-body">
        <p> See results of graph output of multiple calls per bird, location information, and more!<br></br>
            Presented it in an intuitive and easy to understand format.<br></br>
            Explore hundreds of birds and compare data in real time.<br></br> 
            Click Below to find out more.<br></br> </p>
      </div>
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
      <div className="explore">
        <NavLink to="/Explore" className="landing-link">
          Explore
        </NavLink>
      </div>
      <div className="bird-id">
        <NavLink to="/BirdIdentifyer" className="landing-link">
          Identify
        </NavLink>
      </div>
      <div className="about">
        <NavLink to="/About" className="landing-link">
          About
        </NavLink>
      </div>
    </div>
    
  );
}

export default Landing;
