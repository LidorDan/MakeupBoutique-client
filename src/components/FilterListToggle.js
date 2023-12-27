import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from "react";
import "../styles/FilterListToggle.css";


function FilterListToggle({ naturals, value, selectToggle }) {
  return (
    <ToggleButtonGroup
      className="natural-filter"
      size="medium"
      value={value}
      onChange={selectToggle}
      exclusive
    >
      {naturals.map(({ label, id, value }) => (
        <ToggleButton className="toggle" key={id} value={value} >
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default FilterListToggle;
