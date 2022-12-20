import React, { useEffect, useState } from "react";
import VisGlobe from "./VisGlobe";
import { SizeMe } from "react-sizeme";

function BirdHero({ bird, fileNumber, visShown }) {
  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState("");
  const [imageCred, setImageCred] = useState("");
  const [wikiInfo, setWikiInfo] = useState("");
  const [wikiLink, setWikiLink] = useState("");
  const [infoHidden, setInfoHidden] = useState(true);

  //Information updated when bird is changed
  useEffect(() => {
    function fetchNameDetails() {
      fetch("/api/bird-details/" + bird)
        .then((response) => response.json())
        .then((data) => {
          setCommonName(data.common_name);
          setScientificName(data.scientific_name);
        });
    }

    if (bird !== "") {
      fetchNameDetails();
    }
  }, [bird]);

  useEffect(() => {
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
              data.results[0].default_photo.medium_url.replace(
                "medium",
                "large"
              )
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

    if (commonName !== "") {
      fetchImage();
    }
  }, [commonName]);

  useEffect(() => {
    if (wikiLink !== "" && wikiLink !== null) {
      const pathSplit = wikiLink.split("/");
      const path =
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
        pathSplit[pathSplit.length - 1];
      fetch(path)
        .then((response) => response.json())
        .then((data) => {
          setWikiInfo(data.extract);
        });
    }
  }, [wikiLink]);

  //Information updated when bird or audio file is changed
  useEffect(() => {
    function fetchLocationInfo() {
      fetch("/api/bird-audio-details/" + bird + "/" + fileNumber)
        .then((response) => response.json())
        .then((data) => {
          setLocation(data.location);
          setLatitude(data.latitude);
          setLongitude(data.longitude);
        });
    }
    if (bird !== "" && fileNumber !== "") {
      fetchLocationInfo();
    }
  }, [bird, fileNumber]);

  function updateInfoSection(e) {
    setInfoHidden(!infoHidden);
    e.target.className = "info-btn";
    if (infoHidden) {
      e.target.className += " info-btn-selected";
    }
  }

  return (
    <section>
      {visShown && (
        <p className="info-btn" onClick={updateInfoSection}>
          General Information ∨
        </p>
      )}

      {!infoHidden && (
        <div className="info-section">
          <div className="info-visuals">
            <img
              src={image}
              alt={"Image of a " + commonName}
              className="bird_img"
            />
            <p className="image-credits">{imageCred}</p>
            <div className="explore-globe-container">
              <SizeMe>
                {({ size: { width } }) => (
                  <VisGlobe
                    location={location}
                    latitude={latitude}
                    longitude={longitude}
                    width={width}
                    height={width}
                    rotate={false}
                  />
                )}
              </SizeMe>
            </div>
          </div>
          <div className="info-text">
            <h2 className="info">Common Name: {commonName}</h2>
            <h2 className="info">Scientific Name: {scientificName}</h2>
            <h2 className="info">Location: {location}</h2>
            <h2 className="info">{wikiInfo}</h2>
            <div className="link-block">
              <p className="info">Learn More:</p>
              <a className="wiki-link" href={wikiLink}>
                {wikiLink}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default BirdHero;
