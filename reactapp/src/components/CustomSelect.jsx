import Select from "react-select";

function CustomSelect(props) {
  const BACKGROUND_COLOR = "#3b365a";
  const COLOR = "white";

  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      color: COLOR,
      backgroundColor: BACKGROUND_COLOR,
      marginBottom: "2em",
      borderRadius: ".25em",
      borderColor: "#ffffffdf",
      borderWidth: "1px",
    }),
    menu: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: BACKGROUND_COLOR,
      color: COLOR,
      marginTop: "0",
    }),
    option: (defaultStyles) => ({
      ...defaultStyles,
      color: COLOR,
      backgroundColor: BACKGROUND_COLOR,
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
      color: COLOR,
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: COLOR,
        opacity: 0.75,
      };
    },
    input: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: COLOR,
        opacity: 0.75,
      };
    },
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
