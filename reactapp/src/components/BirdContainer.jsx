import React, { useEffect, useState } from "react";

import AudioPlayer from "react-h5-audio-player";

import Graph from "./Graph";
import VisualizationDropdown from "./VisualizationDropdown";
import BirdDropdown from ".//BirdDropdown";
import AudioFileDropdown from "./AudioFileDropdown";

import "react-h5-audio-player/lib/styles.css";

function BirdContainer() {
  const [bird, setBird] = useState("");
  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [graph, setGraph] = useState("");
  const [visType, setVisType] = useState("");

  function fetchBirdDetails() {
    fetch("/api/bird-details/" + bird)
      .then((response) => response.json())
      .then((data) => {
        setCommonName(data.common_name);
        setScientificName(data.scientific_name);
      });
  }

  function fetchAudioDeatils() {
    fetch("/api/bird-audio-details/" + bird + "/" + fileNumber)
      .then((response) => response.json())
      .then((data) => {
        setLocation(data.location);
        setFile(data.call);
      });
  }

  function fetchGraphData() {
    fetch("/api/bird-" + visType + "/" + bird + "/" + fileNumber)
      .then((response) => response.json())
      .then((data) => {
        setGraph(data);
      });
  }

  //Information updated when bird is changed
  useEffect(() => {
    if (bird !== "") {
      fetchBirdDetails();
    }
  }, [bird]);

  //Information updated when bird or audio file is changed
  useEffect(() => {
    if (bird !== "" && fileNumber !== "") {
      fetchAudioDeatils();
    }
  }, [bird, fileNumber]);

  //Information updated when bird, audio file, or visualization type is changed
  useEffect(() => {
    if (bird !== "" && visType !== "") {
      fetchGraphData();
    }
  }, [bird, fileNumber, visType]);

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
    <div className="col-lg-6 p-5">
      <BirdDropdown handleChange={handleBirdChange}></BirdDropdown>
      {bird === "" ? (
        <div />
      ) : (
        <AudioFileDropdown
          bird={bird}
          handleChange={handleFileChange}
        ></AudioFileDropdown>
      )}

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
            src={file}
            autoPlay={false}
            autoPlayAfterSrcChange={false}
            showSkipControls={false}
            showJumpControls={false}
            volume={0.5}
          />
          <VisualizationDropdown
            handleChange={(visType, handleVisChange)}
          ></VisualizationDropdown>
        </div>
      )}

      {graph === "" ? (
        <div />
      ) : (
        <div>
          <Graph
            data={JSON.parse(graph).data}
            layout={JSON.parse(graph).layout}
          />
        </div>
      )}
    </div>
  );
}

export default BirdContainer;
