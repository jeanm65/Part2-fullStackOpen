import React from 'react';

const Persons = ({persons}) => {
  return (
    <div>
      <p>{persons.name}</p>
    </div>
  );
};

export default Persons;