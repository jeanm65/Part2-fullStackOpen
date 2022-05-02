import React from 'react';

const Persons = ({persons}) => {
  return (
    <div>
      <p>{persons.name} - {persons.number}</p>
    </div>
  );
};

export default Persons;