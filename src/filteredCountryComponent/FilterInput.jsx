import React from "react";

const FilterInput = ({ onChange, value }) => {
  return (
    <div>
      find a country
      <input type="text" onChange={onChange} value={value} />
    </div>
  );
};

export default FilterInput;
