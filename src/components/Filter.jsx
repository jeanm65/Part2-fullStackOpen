import React from 'react';

const Filter = ({onChange, value}) => {
  return (
    <div>
      filter shown <input type='search' onChange={onChange} value={value} />
    </div>
  );
};

export default Filter;