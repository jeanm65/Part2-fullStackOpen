import { useEffect, useState } from "react";
import FilteredResuls from "./components/FilteredResuls";
import Filter from "./components/FilterForm";
import PersonForm from "./containers/persons/PersonForm";
import { createPerson } from "./services/Persons";
import { removePerson } from "./services/Persons";
import { getPersons } from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const init = async () => {
      const result = await getPersons();
      setPersons(result);
    };
    init();
  }, []);

  //Search and filter

  // deletion
  const handleDeletePerson = async (id) => {
    try {
      setLoading(true);
      await removePerson(id);
      const newPersons = persons.filter((p) => p.id !== id);
      setPersons(newPersons);
      setLoading(false);
    } catch (error) {
      console.log("errorMessage:", error.message);
    }
  };

  // the number update is managed by the PersonForm component

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
      <PersonForm
        onSave={handleCreatePerson}
        persons={persons}
        person={persons.map((p) => p)}
        setPersons={setPersons}
        setLoading={setLoading}
      />
      <FilteredResuls
        filteredPersons={filtered}
        onDelete={handleDeletePerson}
      />
    </div>
  );
};

export default App;
