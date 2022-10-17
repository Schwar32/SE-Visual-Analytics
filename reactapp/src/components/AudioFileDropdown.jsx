import React, { useEffect, useState } from "react";
import Select from "react-select";

function BirdDropdown({ bird, handleChange }) {
  const [file, fileChange] = useState();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (bird !== "") {
      fetch("/api/bird-audio-files/" + bird)
        .then((response) => response.json())
        .then((data) => {
          setOptions(
            data.map((entry) => {
              var singleObj = {};
              singleObj["label"] = "Audio File " + entry;
              singleObj["value"] = entry;
              return singleObj;
            })
          );
        });
    }
  }, [bird]);

  return (
    <div>
      <Select
        value={file}
        options={options}
        placeholder="Select Audio File"
        dropdownPosition="top"
        className="select"
        color="#5c5cff"
        onChange={handleChange}
        isSearchable
      />
    </div>
  );
}
export default BirdDropdown;
