import React, { useState } from "react";
import Select from "react-select";

function VisualizationDropdown({ handleChange }) {
  const [visType, visChange] = useState();
  const options = [
    { label: "Oscillogram", value: "oscillogram" },
    { label: "Fourier Transform", value: "fourier-transform" },
    { label: "Spectrogram", value: "spectrogram" },
  ];

  return (
    <div>
      <Select
        value={visType}
        options={options}
        placeholder="Select Visualization Type"
        dropdownPosition="top"
        className="select"
        color="#5c5cff"
        onChange={handleChange}
      />
    </div>
  );
}
export default VisualizationDropdown;
