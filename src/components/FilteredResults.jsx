import React from "react";

const FilteredResults = ({ onDelete, filteredPersons }) => {
  // const result1 = filteredPersons;
  // console.log('typeOf filteredPersons : ', typeof(result1));

  return (
    <div>
      {filteredPersons.map((person, index) => {

        return (
          <div key={index}>
            <span>
              {person.name} - {person.number}{" "}
            </span>
            <button
              onClick={() => {
                const isOk = window.confirm(`delete ${person.name} ?`);
                if (isOk) {
                  onDelete(person.id);
                }
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
