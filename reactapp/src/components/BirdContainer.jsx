import React, { useEffect, useState } from "react";

import AudioPlayer from "react-h5-audio-player";

import Graph from "./Graph";
import VisualizationDropdown from "./VisualizationDropdown";
import BirdDropdown from "./BirdDropdown";
import AudioFileDropdown from "./AudioFileDropdown";

import "react-h5-audio-player/lib/styles.css";
import ReactGlobe from "react-globe";

function BirdContainer() {
  const [bird, setBird] = useState("");
  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [graph, setGraph] = useState("");
  const [visType, setVisType] = useState("");
  const [image, setImage] = useState("");

  function fetchImage() {
    const searchName = commonName.replace(" ", "%20");
    fetch(
      "https://api.inaturalist.org/v1/taxa/autocomplete?q=" +
        searchName +
        "&rank=species"
    )
      .then((response) => response.json())
      .then((data) => {
        try {
          setImage(
            data.results[0].default_photo.medium_url.replace("medium", "large")
          );
        } catch {
          setImage("Image not found");
        }
      });
  }

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

  useEffect(() => {
    if (commonName !== "") {
      fetchImage();
    }
  }, [commonName]);

  //Information updated when bird or audio file is changed
  useEffect(() => {
    if (bird !== "" && fileNumber !== "") {
      fetchAudioDeatils();
      //fetch("/api/bird-oscillogram/" + bird + "/" + fileNumber);

      //fetch("/api/bird-fourier-transform/" + bird + "/" + fileNumber);

      //fetch("/api/bird-spectrogram/" + bird + "/" + fileNumber);
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
    setFileNumber(0);
  };

  const handleFileChange = (selection) => {
    setFileNumber(selection.value);
  };

  const handleVisChange = (selection) => {
    setVisType(selection.value);
  };

  const markers = [
    {
      id: "Bird1",
      city: "Singapore",
      color: "orange",
      coordinates: [35.386, -84.125],
      value: 500,
    },
  ];
  return (
    <div className="col-lg-6 p-5">
      <BirdDropdown handleChange={handleBirdChange}></BirdDropdown>

      {bird === "" ? (
        <div />
      ) : (
        <AudioFileDropdown
          bird={bird}
          file={fileNumber}
          handleChange={handleFileChange}
        ></AudioFileDropdown>
      )}

      {file === "" ? (
        <div />
      ) : (
        <div>
          <VisualizationDropdown
            handleChange={(visType, handleVisChange)}
          ></VisualizationDropdown>
        </div>
      )}

      {image === "" || commonName === "" || scientificName ==="" || location === "" ? (
        <div />
      ) : (
        <div display="">
        <img
          src={image}
          alt={"Image of a " + commonName}
          className="bird_img"
          
        />
          <h2 className="text-left" margin="left">{commonName}</h2>
          <h5 className="text-left" margin="left">{scientificName}</h5>

          <div
            style={{
              width: 250,
              height: 250,
              display: "cover",
              margin: "right",
            }}
          >
            <ReactGlobe
              height={250}
              width={250}
              backgroundColor="#f00"
              globeBackgroundTexture={null}
              markers={markers}
              options={{
                ambientLightIntensity: 0.5,
                cameraAutoRotateSpeed: 0,
                globeGlowRadiusScale: 0,
              }}
            />
            <h5 className="text-center">{location}</h5>
          </div>

        </div>
        
        

        
      )}

      

      {/* {location === "" ? (
        <div />
      ) : (
        <div>
          
          <div
            style={{
              width: 250,
              height: 250,
              display: "cover",
              margin: "right",
            }}
          >
            <ReactGlobe
              height={250}
              width={250}
              backgroundColor="#f00"
              globeBackgroundTexture={null}
              markers={markers}
              options={{
                ambientLightIntensity: 0.5,
                cameraAutoRotateSpeed: 0,
                globeGlowRadiusScale: 0,
              }}
            />
            <h5 className="text-center">{location}</h5>
          </div>
        </div>
      )} */}

      

      {graph === "" ? (
        <div />
      ) : (
        <Graph
          data={JSON.parse(graph).data}
          layout={JSON.parse(graph).layout}
        />
      )}

      {file === "" ? (
        <div />
      ) : (
        <AudioPlayer
          src={file}
          autoPlay={false}
          autoPlayAfterSrcChange={false}
          showSkipControls={false}
          showJumpControls={false}
          volume={0.5}
        />
      )}
    </div>
  );
}

export default BirdContainer;
