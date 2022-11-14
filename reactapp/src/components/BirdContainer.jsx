import React, { useEffect, useState } from "react";

import AudioPlayer from "react-h5-audio-player";

import Graph from "./Graph";
import BirdDropdown from "./BirdDropdown";
import VisTypeSelect from "./VisTypeSelect";
import "react-h5-audio-player/lib/styles.css";
import ReactGlobe from "react-globe";

function BirdContainer({ container }) {
  const [bird, setBird] = useState("");
  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [fileCount, setFileCount] = useState("");
  const [graph, setGraph] = useState("");
  const [visType, setVisType] = useState("");
  const [image, setImage] = useState("");
  const [imageCred, setImageCred] = useState("");
  const [wikiLink, setWikiLink] = useState("");
  const [infoHidden, setInfoHidden] = useState(true);

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
          setImageCred(data.results[0].default_photo.attribution);
          setWikiLink(data.results[0].wikipedia_url);
        } catch {
          setImage("Image not found");
          setImageCred("");
          setWikiLink("");
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

  useEffect(() => {
    if (bird !== "") {
      fetch("/api/bird-audio-files/" + bird)
        .then((response) => response.json())
        .then((data) => {
          setFileCount(data.length);
        });
    }
  }, [bird]);

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

  const handleVisChange = (selection) => {
    if (selection.value !== visType) {
      setVisType(selection.value);
    }
  };

  function nextFile() {
    if (bird !== "") {
      setFileNumber((fileNumber + 1) % fileCount);
    }
  }

  const markers = [
    {
      id: "Bird1",
      city: "Singapore",
      color: "orange",
      coordinates: [40.73061, -73.935242],
      value: 500,
    },
  ];

  return (
    <div className="col-lg-6 p-5">
      <div className="bird-select">
        <BirdDropdown handleChange={handleBirdChange}></BirdDropdown>
        <button className="next-btn" onClick={nextFile}>
          {"Next Call"}
        </button>
      </div>

      {file === "" ? (
        <div />
      ) : (
        <div>
          <VisTypeSelect
            handleChange={handleVisChange}
            container={container}
          ></VisTypeSelect>

          <AudioPlayer
            src={file}
            autoPlay={false}
            autoPlayAfterSrcChange={false}
            showSkipControls={false}
            showJumpControls={false}
            volume={0.5}
          />
          {graph === "" ? (
            <div />
          ) : (
            <Graph
              data={JSON.parse(graph).data}
              layout={JSON.parse(graph).layout}
            />
          )}
        </div>
      )}

      {graph === "" ? (
        <div />
      ) : (
        <div className="info-section">
          <p
            onClick={() => {
              setInfoHidden(!infoHidden);
            }}
          >
            General Information ∨
          </p>
          {infoHidden ? (
            <div />
          ) : (
            <div>
              <img
                src={image}
                alt={"Image of a " + commonName}
                className="bird_img"
              />
              <p className="image-credits">{imageCred}</p>
              <h2 className="text-left" margin="left">
                Common: {commonName}
              </h2>
              <h5 className="text-left" margin="left">
                Genus: {scientificName}
              </h5>

              <div
                style={{
                  width: 250,
                  height: 250,
                  display: "cover",
                  margin: "left",
                }}
              >
                <ReactGlobe
                  height={250}
                  width={250}
                  backgroundColor="#f00"
                  globeBackgroundTexture={null}
                  markers={markers}
                  options={{
                    globeCloudsOpacity: 1,
                    ambientLightIntensity: 0.5,
                    cameraAutoRotateSpeed: 0,
                    globeGlowRadiusScale: 0,
                  }}
                />
                <a href={wikiLink}>{wikiLink}</a>
              </div>
              <h6 className="text-right">Location: {location}</h6>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BirdContainer;
