import React, { useEffect, useState } from "react";
import Select from "react-select";

function BirdDropdown({ handleChange }) {
  const [bird, birdChange] = useState();
  const options = [
    { label: "Acadian Flycatcher", value: "Acadian Flycatcher" },
    { label: "Acorn Woodpecker", value: "Acorn Woodpecker" },
  ];

  useEffect(() => {}, []);

  return (
    <div>
      <Select
        value={bird}
        options={options}
        placeholder="Select Bird"
        dropdownPosition="top"
        className="select"
        color="#5c5cff"
        onChange={handleChange}
      />
    </div>
  );
}
export default BirdDropdown;
