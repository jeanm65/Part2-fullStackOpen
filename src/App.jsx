import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./containers/persons/PersonForm";
import Persons from "./containers/persons/Persons";
import { createPerson } from "./services/Persons";
import { editPerson } from "./services/Persons";
import { removePerson } from "./services/Persons";
import { getPersons } from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState("");

  useEffect(() => {
    const init = async () => {
      const result = await getPersons();
      setPersons(result);
    };
    init();
  }, []);

  const updateNumber = async (id) => {};

  //Search and filter

  // creation
  const handleCreatePerson = async (values) => {
    const person = await createPerson(values);
    setPersons((prev) => {
      return [
        ...prev,
        {
          newName,
          newNumber,
          id: persons[persons.length - 1].id++,
          ...person,
        },
      ];
    });
  };

  // deletion
  const handleDeletePerson = async (id) => {
    const person = await removePerson(id);
    const newPersons = persons.filter((p) => p.id !== person.id);
    setPersons(newPersons);
  };

  // update
  const handleUpdatePerson = async (id, values) => {
    const updatedPerson = await editPerson(id, values);
    // const newPersons = persons.filter((p) => p.id !== person.id)
    const newPersons = [...persons];
    newPersons.map((person) => {
      if (person.id === id) {
        return {
          ...person,
          ...updatedPerson,
        };
      }

      return person;
    });
    setPersons(newPersons);
  };
  const handleNewSearch = (e) => {
    setSearch(e.target.value);
  };
  const filtered = !search ? (
    persons
  ) : search ? (
    persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
  ) : (
    <h2>No results found!</h2>
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter
          onChange={handleNewSearch}
          value={search}
          filteredPersons={filtered}
          onDelete={handleDeletePerson}
        />
      </div>
      <h2>Add a new person</h2>
      <PersonForm onSave={handleCreatePerson} newName={newName} newNumber={newNumber} />
      <Persons
        persons={persons}
        onDelete={handleDeletePerson}
        onUpdate={handleUpdatePerson}
      />
    </div>
  );
};

export default App;
