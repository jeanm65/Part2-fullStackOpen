import React from "react";

const FilteredResults = ({ filteredPersons, onDelete }) => {
  return (
    <div>
      {filteredPersons.map((person, index) => {
        return (
          <div key={index}>
            <span>
              {JSON.stringify(person.name)} - {JSON.stringify(person.number)}{" "}
            </span>
            <button
              onClick={() => {
                onDelete(person.id);
                window.confirm(`delete ${person.name} ?`);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FilteredResults;
