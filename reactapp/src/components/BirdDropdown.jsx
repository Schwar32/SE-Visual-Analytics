import React, { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";

function BirdDropdown({ handleChange }) {
  const [bird, birdChange] = useState();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("/api/bird-list/")
      .then((response) => response.json())
      .then((data) => {
        setOptions(
          data
            .map((entry) => {
              var singleObj = {};
              singleObj["label"] = entry;
              singleObj["value"] = entry;
              return singleObj;
            })
            .sort(function (a, b) {
              var textA = a.label.toUpperCase();
              var textB = b.label.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            })
        );
      });
  }, []);

  return (
    <div className="bird-dropdown" style={{ padding: 0 }}>
      <CustomSelect
        value={bird}
        options={options}
        placeholder="Select Bird"
        dropdownPosition="top"
        onChange={handleChange}
        isSearchable
      />
    </div>
  );
}
export default BirdDropdown;
