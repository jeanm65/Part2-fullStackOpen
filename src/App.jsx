import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./containers/persons/PersonForm";
import Persons from "./containers/persons/Persons";
import { createPerson } from "./services/persons";
import { editPerson } from "./services/persons";
import { removePerson } from "./services/persons";
import { getPersons } from "./services/persons";
import { BASE_URL } from "./utils/constants";

const App = () => {
  const [persons, setPersons] = useState([]);
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
          id: persons[persons.length - 1].id++,
          ...person
        }
      ];
    });
  };

  // deletion
  const handleDeletePerson = async (id) => {
    const person = await removePerson(id);
    const newPersons = persons.filter((p) => p.id !== person.id);
    setPersons(newPersons);
  };

  // deletion
  const handleUpdatePerson = async (id, values) => {
    const updatedPerson = await editPerson(id, values);
    // const newPersons = persons.filter((p) => p.id !== person.id)
    const newPersons = [...persons];
    newPersons.map((person) => {
      if (person.id === id) {
        return {
          ...person,
          ...updatedPerson
        };
      }

      return person;
    });
    setPersons(newPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter onChange={handleNewSearch} value={search} />
      </div>
      <h2>Add a new person</h2>
      <PersonForm onSave={handleCreatePerson} />
      <Persons
        persons={persons}
        onDelete={handleDeletePerson}
        onUpdate={handleUpdatePerson}
      />
    </div>
  );
};

export default App;
