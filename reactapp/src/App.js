import React, { useEffect, useState } from "react";
import "./App.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Graph from "./Graph";
import VisualizationDropdown from "./VisualizationDropdown";
import BirdDropdown from "./BirdDropdown";

function App() {
  const [bird, setBird] = useState("");
  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState("");
  const [graph, setGraph] = useState("");
  const [visType, setVisType] = useState("");

  useEffect(() => {
    if (bird !== "") {
      fetch("/api/bird-details/" + bird)
        .then((response) => response.json())
        .then((data) => {
          setCommonName(data.common_name);
          setScientificName(data.scientific_name);
          setLocation(data.location);
          setFile(data.call);
        });
    }
  }, [bird, commonName, scientificName, location, file]);

  useEffect(() => {
    if (visType !== "") {
      fetch("/api/bird-" + visType + "/" + bird)
        .then((response) => response.json())
        .then((data) => setGraph(data));
    }
  }, [visType]);

  const handleBirdChange = (selection) => {
    setBird(selection.value);
  };

  const handleVisChange = (selection) => {
    setVisType(selection.value);
  };

  return (
    <div className="container">
      <BirdDropdown handleChange={handleBirdChange}></BirdDropdown>
      <h2>Common Name</h2>
      {commonName === "" ? <p>Loading...</p> : <p>{commonName}</p>}
      <h2>Scientific Name</h2>
      {scientificName === "" ? <p>Loading...</p> : <p>{scientificName}</p>}
      <h2>Location</h2>
      {location === "" ? <p>Loading...</p> : <p>{location}</p>}
      {file === "" ? (
        <div />
      ) : (
        <div>
          <AudioPlayer
            style={{ borderRadius: "1rem", margin: "2em" }}
            showSkipControls={false}
            showJumpControls={true}
            src={file}
          />
          <VisualizationDropdown
            handleChange={handleVisChange}
          ></VisualizationDropdown>
        </div>
      )}

      {graph === "" ? (
        <p>Loading...</p>
      ) : (
        <Graph
          data={JSON.parse(graph).data}
          layout={JSON.parse(graph).layout}
        />
      )}
    </div>
  );
}

export default App;
