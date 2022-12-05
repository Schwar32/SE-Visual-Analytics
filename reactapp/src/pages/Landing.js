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
        <NavLink to="/Explore" div className="explore">
          Explore
        </NavLink>
        <NavLink to="/BirdIdentifyer" className="bird-id">
          Identify
        </NavLink>
        <NavLink to="/About" className="about">
          About
        </NavLink>
        <div className="desc">
            <p>Compare Visualization Data</p>
            <p>for over 300 species of birds:</p>
            -Oscillograms<br></br>
            -Spectrograms<br></br>
            -Fourier Transformations<br></br>
            -Locations, Images, and more!<br></br>
        </div>
        <div className="desc">
            A.I Model Identification:<br></br>
            -Identifies uploaded audio files(.ogg,.mp3).<br></br>
            -After upload lists guesses with confidence.<br></br>
            Click Above to Test!
        </div>
        <div className="desc">
            Team information and more
        </div>
      </div>
    </div>
  );
}

export default Landing;
