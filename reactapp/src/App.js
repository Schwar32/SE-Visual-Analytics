import React, { useEffect, useState } from "react";
import "./App.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Graph from "./Graph";
import VisualizationDropdown from "./VisualizationDropdown";
import BirdDropdown from "./BirdDropdown";
import AudioFileDropdown from "./AudioFileDropdown";

function App() {
  const [bird, setBird] = useState("");
  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [graph, setGraph] = useState("");
  const [visType, setVisType] = useState("oscillogram");

  useEffect(() => {
    if (bird !== "") {
      fetch("/api/bird-details/" + bird)
        .then((response) => response.json())
        .then((data) => {
          setCommonName(data.common_name);
          setScientificName(data.scientific_name);
        });
    }
  }, [bird]);

  useEffect(() => {
    if (bird !== "" && fileNumber !== "") {
      fetch("/api/bird-audio-details/" + bird + "/" + fileNumber)
        .then((response) => response.json())
        .then((data) => {
          setLocation(data.location);
          setFile(data.call);
          setVisType("oscillogram");
        });
    }
  }, [bird, fileNumber]);

  useEffect(() => {
    if (bird !== "") {
      fetch("/api/bird-" + visType + "/" + bird + "/" + fileNumber)
        .then((response) => response.json())
        .then((data) => setGraph(data));
    }
  }, [fileNumber, visType]);

  const handleBirdChange = (selection) => {
    setBird(selection.value);
  };

  const handleFileChange = (selection) => {
    setFileNumber(selection.value);
  };

  const handleVisChange = (selection) => {
    setVisType(selection.value);
  };

  return (
    <div>
      <BirdDropdown handleChange={handleBirdChange}></BirdDropdown>
      <AudioFileDropdown
        bird={bird}
        handleChange={handleFileChange}
      ></AudioFileDropdown>
      {commonName === "" || scientificName === "" ? (
        <div />
      ) : (
        <div>
          <h2 className="text-center">Common Name</h2>
          <p className="text-center">{commonName}</p>
          <h2 className="text-center">Scientific Name</h2>
          <p className="text-center">{scientificName}</p>
        </div>
      )}

      {file === "" ? (
        <div />
      ) : (
        <div>
          <h2 className="text-center">Location</h2>
          {location === "" ? (
            <div />
          ) : (
            <p className="text-center">{location}</p>
          )}
          <AudioPlayer
            style={{ borderRadius: "1rem", width: "auto", margin: "1em auto" }}
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
        <div />
      ) : (
        <div>
          <Graph
            data={JSON.parse(graph).data}
            layout={{
              width: 600,
              height: 450,
              title: JSON.parse(graph).layout.title,
              xaxis: {
                title: JSON.parse(graph).layout.xaxis.title,
              },
              yaxis: {
                title: JSON.parse(graph).layout.yaxis.title,
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
