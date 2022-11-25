import React, { useEffect, useState } from "react";

import AudioPlayer from "react-h5-audio-player";
import Graph from "./Graph";
import BirdDropdown from "./BirdDropdown";
import VisTypeSelect from "./VisTypeSelect";

function BirdHero({
  container,
  bird,
  fileNumber,
  handleBirdChange,
  nextFile,
  handleVisShown,
}) {
  const [file, setFile] = useState("");
  const [graph, setGraph] = useState("");
  const [visType, setVisType] = useState("");

  //Updates audio file on bird or fileNumber change
  useEffect(() => {
    function fetchAudioFile() {
      fetch("/api/bird-audio-details/" + bird + "/" + fileNumber)
        .then((response) => response.json())
        .then((data) => {
          setFile(data.call);
        });
    }

    if (bird !== "" && fileNumber !== "") {
      fetchAudioFile();
    }
  }, [bird, fileNumber]);

  //Updates Graph data on bird, fileNumber, or visType change
  useEffect(() => {
    function fetchGraphData() {
      fetch("/api/bird-" + visType + "/" + bird + "/" + fileNumber)
        .then((response) => response.json())
        .then((data) => {
          setGraph(data);
        });
    }

    if (bird !== "" && visType !== "") {
      fetchGraphData();
    }
  }, [bird, fileNumber, visType]);

  useEffect(() => {
    if (graph !== "") {
      handleVisShown();
    }
  }, [graph]);

  //Updates visType to new selection
  function handleVisChange(selection) {
    if (selection.value !== visType) {
      setVisType(selection.value);
    }
  }

  return (
    <main>
      <div className="bird-select">
        <BirdDropdown handleChange={handleBirdChange}></BirdDropdown>
        <button className="next-btn" onClick={nextFile}>
          {"Next Call"}
        </button>
      </div>

      <VisTypeSelect
        handleChange={handleVisChange}
        container={container}
      ></VisTypeSelect>

      {file !== "" && (
        <AudioPlayer
          src={file}
          autoPlay={false}
          autoPlayAfterSrcChange={false}
          showSkipControls={false}
          showJumpControls={false}
          volume={0.5}
        />
      )}

      {graph !== "" && (
        <Graph
          data={JSON.parse(graph).data}
          layout={JSON.parse(graph).layout}
        />
      )}
    </main>
  );
}

export default BirdHero;
