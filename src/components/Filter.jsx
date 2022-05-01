import React from 'react';

const Filter = ({filter, name}) => {
  return (
    <div>
      filter shown <input type='search' onChange={filter} value={name} />
    </div>
  );
};

export default Filter;