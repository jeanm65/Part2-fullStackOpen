import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const data = response.data;
      setPersons(data);
    });
  }, []);
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const addName = (e) => {
    e.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return false;
    }
    const nameObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
  };

  //Search and filter

  const handleNewSearch = (e) => {
    setSearch(e.target.value);
  };
  const filtered = !search ? (
    persons
  ) : search ? (
    persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
  ) : (<h2>No results found!</h2>
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter onChange={handleNewSearch} value={search} />
      </div>
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {filtered.map((person) => {
        return (
          <p key={person.id}>
            {person.name} - {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default App;
