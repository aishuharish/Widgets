import React from "react";

const Dropdown = ({ options, selected, onSelectedChange }) => {
  const renderedDropdown = options.map((option) => {
    //to remove the color which is selected from dropdown
    if (option.value === selected.value) {
      return null;
    }
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    );
  });

  return (
    <div className="ui form">
      <div className="field">
        <label className="label">Select a color: </label>
        <select
          className="ui selection dropdown visible active"
          onChange={(e) =>
            onSelectedChange({
              label: e.target.options[e.target.selectedIndex].text,
              value: e.target.value,
            })
          }
        >
          <option value="">{selected.label}</option>
          {renderedDropdown}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
