import "../styles/Landing.css";
import VisGlobe from "../components/VisGlobe";
import { SizeMe } from "react-sizeme";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Landing() {
  const [randCountry, setRandCountry] = useState("");
  const [randLat, setRandLat] = useState("");
  const [randLng, setRandLng] = useState("");

  useEffect(() => {
    fetch("/api/bird-list/")
      .then((response) => response.json())
      .then((data) => {
        var bird = data[Math.floor(Math.random() * data.length)];
        fetch("/api/bird-audio-details/" + bird + "/" + 0)
          .then((response) => response.json())
          .then((data) => {
            setRandCountry(data.location);
            setRandLat(data.latitude);
            setRandLng(data.longitude);
          });
      });
  }, []);

  return (
    <div className="landing-page">
      <h1 className="landing-title">
        Welcome to the World of Visual Analytics
      </h1>
      <div className="landing-body">
        <p>
          See results of graph output of multiple calls per bird, location
          information, and more!<br></br>
          Presented it in an intuitive and easy to understand format.<br></br>
          Explore hundreds of birds and compare data in real time.<br></br>
        </p>
      </div>
      <div className="landing-globe-container">
        <SizeMe refreshRate={30}>
          {({ size: { width } }) => (
            <VisGlobe
              location={randCountry}
              latitude={randLat}
              longitude={randLng}
              width={width}
              height={width}
              rotate={true}
            />
          )}
        </SizeMe>
      </div>
      <div className="landing-link">
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
    </div>
  );
}

export default Landing;
