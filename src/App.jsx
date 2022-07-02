import { useEffect, useState } from "react";
import FilteredResults from "./components/FilteredResults";
import Filter from "./components/FilterForm";
import PersonForm from "./containers/persons/PersonForm";
import { createPerson } from "./services/Persons";
import { removePerson } from "./services/Persons";
import { getPersons } from "./services/Persons";

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

  //Search and filter

  // deletion
  const handleDeletePerson = async (id) => {
    try {
      await removePerson(id);
      const newPersons = persons.filter((p) => p.id !== id);
      setPersons(newPersons);
    } catch (error) {
      console.log("errorMessage:", error.message);
    }
  };

  // the number update is managed by the PersonForm component

  // creation
  const handleCreatePerson = async (values) => {
    try {
      const person = await createPerson(values);
      setPersons((prev) => {
        return [
          ...prev,
          {
            id: persons.length + 1,
            ...person,
          },
        ];
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNewSearch = (e) => {
    setSearch(e.target.value);
  };
  const filteredPersons = !search ? (
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
      <div></div>
      <div>
        <Filter
          onChange={handleNewSearch}
          value={search}
          filteredPersons={filteredPersons}
          onDelete={handleDeletePerson}
        />
      </div>
      <h2>Add a new person</h2>
      <PersonForm
        onSave={handleCreatePerson}
        persons={persons}
        person={persons.map((p) => p)}
        setPersons={setPersons}
      />
      <FilteredResults
        filteredPersons={filteredPersons}
        onDelete={handleDeletePerson}
        search={search}
        persons={persons}
      />
    </div>
  );
};

export default App;
