

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      <h4>List of persons</h4>
      <div>
        {persons.map((person) => (
          <div key={person.id}>
            {/* header */}
            <div>
              <div className="flexRow">
                <span>{JSON.stringify(person.name)}</span>
                <span>{JSON.stringify(person.number)}</span>
              </div>
              <div className="flexRow">
                <button type="button" onClick={() => onDelete(person.id)}>
                  Delete
                </button>
              </div>
            </div>
            {/* form */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Persons;
