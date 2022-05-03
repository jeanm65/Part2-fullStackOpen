import React from 'react';

const Filter = ({onChange, value}) => {
  return (
    <div>
      find a country <input type='search' onChange={onChange} value={value} />
    </div>
  );
};

export default Filter;