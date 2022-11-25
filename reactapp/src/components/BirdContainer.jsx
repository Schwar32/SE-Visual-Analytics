import React, { useEffect, useState } from "react";

import "react-h5-audio-player/lib/styles.css";
import BirdHero from "./BirdHero";
import BirdInfo from "./BirdInfo";

function BirdContainer({ container }) {
  const [bird, setBird] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [fileCount, setFileCount] = useState("");
  const [visShown, setVisShown] = useState(false);

  useEffect(() => {
    if (bird !== "") {
      fetch("/api/bird-audio-files/" + bird)
        .then((response) => response.json())
        .then((data) => {
          setFileCount(data.length);
        });
    }
  }, [bird]);

  const handleBirdChange = (selection) => {
    setBird(selection.value);
    setFileNumber(0);
  };

  const handleVisShown = () => {
    setVisShown(true);
  };

  function nextFile() {
    if (bird !== "") {
      setFileNumber((fileNumber + 1) % fileCount);
    }
  }

  return (
    <div className="col-lg-6 p-5">
      <BirdHero
        container={container}
        bird={bird}
        fileNumber={fileNumber}
        handleBirdChange={handleBirdChange}
        nextFile={nextFile}
        handleVisShown={handleVisShown}
      />

      <BirdInfo bird={bird} fileNumber={fileNumber} visShown={visShown} />
    </div>
  );
}

export default BirdContainer;
