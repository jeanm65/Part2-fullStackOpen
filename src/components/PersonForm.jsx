import React from "react";

const PersonForm = ({
  onSave,
  addName,
  handleNameChange,
  newName,
  newNumber,
  handleNumberChange,
  person,
}) => {
  return (
    <div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /> <br />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" key={person.id} onClick={() => onSave()}>
                add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
