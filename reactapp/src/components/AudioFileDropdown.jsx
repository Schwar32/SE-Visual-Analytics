import React, { useEffect, useState } from "react";
import Select from "react-select";

function BirdDropdown({ bird, file, handleChange }) {
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
        value={{ label: "Audio File " + file }}
        options={options}
        dropdownPosition="top"
        className="select"
        color="#5c5cff"
        onChange={handleChange}
        isSearchable={false}
      />
    </div>
  );
}
export default BirdDropdown;