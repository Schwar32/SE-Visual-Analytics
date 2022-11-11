function VisTypeSelect({ handleChange, container }) {
  const oscBtn = document.getElementById("oscillogram-button-" + container);
  const fourBtn = document.getElementById(
    "fourier-transform-button-" + container
  );
  const specBtn = document.getElementById("spectrogram-button-" + container);
  function onSelect(button) {
    oscBtn.className = "vis-select-button";
    fourBtn.className = "vis-select-button";
    specBtn.className = "vis-select-button";
    button.target.classList.add("vis-select-button-selected");
    handleChange(button.target);
  }

  return (
    <div className="vis-select">
      <button
        id={"oscillogram-button-" + container}
        value={"oscillogram"}
        onClick={onSelect}
        className="vis-select-button"
      >
        Oscillogram
      </button>
      <button
        id={"fourier-transform-button-" + container}
        value={"fourier-transform"}
        onClick={onSelect}
        className="vis-select-button"
      >
        Fourier Transform
      </button>
      <button
        id={"spectrogram-button-" + container}
        value={"spectrogram"}
        onClick={onSelect}
        className="vis-select-button"
      >
        Spectrogram
      </button>
    </div>
  );
}

export default VisTypeSelect;
