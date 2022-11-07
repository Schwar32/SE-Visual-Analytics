import React, { useState } from "react";
import CustomSelect from "./CustomSelect";

function VisualizationDropdown({ visType, handleChange }) {
  const options = [
    { label: "Oscillogram", value: "oscillogram" },
    { label: "Fourier Transform", value: "fourier-transform" },
    { label: "Spectrogram", value: "spectrogram" },
  ];

  return (
    <div>
      <CustomSelect
        value={visType}
        options={options}
        placeholder="Select Visualization Type"
        dropdownPosition="top"
        onChange={handleChange}
        isSearchable={false}
      />
    </div>
  );
}
export default VisualizationDropdown;
