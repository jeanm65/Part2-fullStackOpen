import { useEffect, useState } from "react";
import FilteredResults from "./components/FilteredResults";
import Filter from "./components/FilterForm";
import PersonForm from "./containers/persons/PersonForm";
import { createPerson } from "./services/Persons";
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

  // creation
  const handleCreatePerson = async (values) => {
    const person = await createPerson(values);
    setPersons((prev) => {
      return [
        ...prev,
        {
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
        filteredPersons={filtered}
      />
    </div>
  );
};

export default App;