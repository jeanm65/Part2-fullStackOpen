import React from 'react';

const FilteredResults = ({filteredPersons}) => {
  return (
    <div>
      {filteredPersons.map((person, index) => {
        return (
          <div key={index}>
            <span>{JSON.stringify(person.name)} - {JSON.stringify(person.number)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FilteredResults;