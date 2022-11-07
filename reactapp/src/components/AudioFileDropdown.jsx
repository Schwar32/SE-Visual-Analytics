import React, { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";

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
      <CustomSelect
        value={{ label: "Audio File " + file }}
        options={options}
        dropdownPosition="top"
        onChange={handleChange}
        isSearchable={false}
      />
    </div>
  );
}
export default BirdDropdown;
