import React, { useEffect, useState } from "react";
import Select from "react-select";

function BirdDropdown({ handleChange }) {
  const [bird, birdChange] = useState();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("/api/bird-list/")
      .then((response) => response.json())
      .then((data) => {
        setOptions(
          data.map((entry) => {
            var singleObj = {};
            singleObj["label"] = entry;
            singleObj["value"] = entry;
            return singleObj;
          })
        );
      });
  }, []);

  return (
    <div>
      <Select
        value={bird}
        options={options}
        placeholder="Select Bird"
        dropdownPosition="top"
        className="select"
        color="#5c5cff"
        background-color="#f6e2fa"
        onChange={handleChange}
        isSearchable
      />
    </div>
  );
}
export default BirdDropdown;
