import React from 'react';

const Filter = ({filter, newName}) => {
  return (
    <div>
      filter shown <input type='search' onChange={filter} value={newName} />
    </div>
  );
};

export default Filter;