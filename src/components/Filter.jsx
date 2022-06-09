import React from 'react';

const Filter = ({onChange, value, filtered, onDelete}) => {
  return (
    <div>
      filter shown <input type='search' onChange={onChange} value={value} />
      {filtered.map((person) => {
        return (
          <p key={person.id}>
            {person.name} - {person.number}
            <button
              onClick={() => {
                onDelete(person.id);
                window.confirm(`delete ${person.name} ?`);
              }}
            >
              delete
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default Filter;