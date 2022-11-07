import Select from "react-select";

function CustomSelect(props) {
  const BACKGROUND_COLOR = "#503d5c";
  const COLOR = "white";

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: BACKGROUND_COLOR,
      color: COLOR,
    }),
    control: (provided) => ({
      ...provided,
      color: COLOR,
      backgroundColor: BACKGROUND_COLOR,
      margin: "1em",
    }),
    option: (provided) => ({
      ...provided,
      color: COLOR,
      backgroundColor: BACKGROUND_COLOR,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: COLOR,
    }),
  };

  return (
    <div>
      <Select
        value={props.value}
        options={props.options}
        placeholder={props.placeholder}
        dropdownPosition={props.dropdownPosition}
        onChange={props.onChange}
        isSearchable={props.isSearchable}
        styles={customStyles}
      />
    </div>
  );
}

export default CustomSelect;
